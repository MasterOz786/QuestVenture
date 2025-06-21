import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini AI client
let genAI: GoogleGenAI | null = null;

if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
  try {
    genAI = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.warn('Failed to initialize Gemini API:', error);
  }
}

export interface Translation {
  english: string;
  spanish: string;
  papiamentu: string;
  dutch: string;
}

export const translateText = async (text: string): Promise<Translation> => {
  if (!genAI || !text.trim()) {
    return {
      english: text,
      spanish: text,
      papiamentu: text,
      dutch: text
    };
  }

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Translate the following text into Spanish, Papiamentu, and Dutch.
Return ONLY a valid JSON object with this exact structure:
{
  "english": "${text}",
  "spanish": "translation in Spanish",
  "papiamentu": "translation in Papiamentu",
  "dutch": "translation in Dutch"
}

Text to translate: "${text}"

Important:
- Return only the JSON object, no additional text
- Ensure accurate translations, especially for Papiamentu (spoken in Curaçao, Aruba, and Bonaire)
- Keep the original English text as provided`,
      config: {
        temperature: 0.3,
        systemInstruction: 'You are a helpful multilingual translator AI.',
      }
    });

    const translatedText = response.text?.trim();

    if (!translatedText) {
      throw new Error('Empty translation received');
    }

    const cleanedResponse = translatedText
      .replace(/```json\n?|\n?```/g, '')
      .replace(/```\n?|\n?```/g, '')
      .trim();

    const translations = JSON.parse(cleanedResponse);

    if (!translations.english || !translations.spanish || !translations.papiamentu || !translations.dutch) {
      throw new Error('Invalid translation response structure');
    }

    return translations;
  } catch (error) {
    console.error('Translation error:', error);
    return {
      english: text,
      spanish: text,
      papiamentu: text,
      dutch: text
    };
  }
};

export const getAvailableLanguages = () => [
  { code: 'english', name: 'English', flag: '🇺🇸' },
  { code: 'spanish', name: 'Español', flag: '🇪🇸' },
  { code: 'papiamentu', name: 'Papiamentu', flag: '🇨🇼' },
  { code: 'dutch', name: 'Nederlands', flag: '🇳🇱' }
];

export const isTranslationAvailable = (): boolean => {
  return genAI !== null;
};

export const translateMultipleTexts = async (texts: string[]): Promise<Translation[]> => {
  if (!genAI || texts.length === 0) {
    return texts.map(text => ({
      english: text,
      spanish: text,
      papiamentu: text,
      dutch: text
    }));
  }

  try {
    const promises = texts.map(text => translateText(text));
    return await Promise.all(promises);
  } catch (error) {
    console.error('Batch translation error:', error);
    return texts.map(text => ({
      english: text,
      spanish: text,
      papiamentu: text,
      dutch: text
    }));
  }
};
