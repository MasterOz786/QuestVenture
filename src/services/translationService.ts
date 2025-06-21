import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key-here';
const genAI = new GoogleGenAI(API_KEY);

export interface Translation {
  english: string;
  spanish: string;
  papiamentu: string;
  dutch: string;
}

export const translateText = async (text: string): Promise<Translation> => {
  try {
    const prompt = `
      Translate the following text into Spanish, Papiamentu, and Dutch. 
      Return the result as a JSON object with the following structure:
      {
        "english": "${text}",
        "spanish": "translation in Spanish",
        "papiamentu": "translation in Papiamentu",
        "dutch": "translation in Dutch"
      }
      
      Text to translate: "${text}"
      
      Please ensure accurate translations, especially for Papiamentu which is spoken in Curaçao, Aruba, and Bonaire.
    `;

    const result = await genAI.models.generateContent({
      model: 'gemini-pro',
      contents: [{ parts: [{ text: prompt }] }]
    });
    
    if (!result.candidates || !result.candidates[0] || !result.candidates[0].content || !result.candidates[0].content.parts || !result.candidates[0].content.parts[0]) {
      throw new Error('Invalid response structure from Gemini API');
    }
    
    const translatedText = result.candidates[0].content.parts[0].text;
    
    if (!translatedText) {
      throw new Error('No text received from Gemini API');
    }
    
    // Parse the JSON response
    const cleanedResponse = translatedText.replace(/```json\n?|\n?```/g, '').trim();
    const translations = JSON.parse(cleanedResponse);
    
    return translations;
  } catch (error) {
    console.error('Translation error:', error);
    // Return fallback translations
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
