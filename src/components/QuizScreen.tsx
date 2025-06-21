import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, ArrowLeft, Globe, Upload, Image } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import QuestHeader from './QuestHeader';
import CanvasDrawing from './CanvasDrawing';
import { getAvailableLanguages } from '../services/translationService';

interface QuizScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

const questions = [
  {
    id: 1,
    type: 'multiple-choice' as const,
    question: {
      english: 'What is the capital of France?',
      spanish: '¿Cuál es la capital de Francia?',
      papiamentu: 'Kua ta kapital di Fransia?',
      dutch: 'Wat is de hoofdstad van Frankrijk?'
    },
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600',
    options: [
      {
        english: 'Paris',
        spanish: 'París',
        papiamentu: 'Paris',
        dutch: 'Parijs'
      },
      {
        english: 'London',
        spanish: 'Londres',
        papiamentu: 'London',
        dutch: 'Londen'
      },
      {
        english: 'Berlin',
        spanish: 'Berlín',
        papiamentu: 'Berlin',
        dutch: 'Berlijn'
      },
      {
        english: 'Madrid',
        spanish: 'Madrid',
        papiamentu: 'Madrid',
        dutch: 'Madrid'
      }
    ],
    correctAnswer: {
      english: 'Paris',
      spanish: 'París',
      papiamentu: 'Paris',
      dutch: 'Parijs'
    }
  },
  {
    id: 2,
    type: 'text-input' as const,
    question: {
      english: 'What is the old name of New York City?',
      spanish: '¿Cuál es el nombre antiguo de la ciudad de Nueva York?',
      papiamentu: 'Kua tabata e nòmber bieu di New York City?',
      dutch: 'Wat is de oude naam van New York City?'
    },
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600',
    correctAnswer: {
      english: 'New Amsterdam',
      spanish: 'Nueva Ámsterdam',
      papiamentu: 'New Amsterdam',
      dutch: 'Nieuw Amsterdam'
    }
  },
  {
    id: 3,
    type: 'canvas' as const,
    question: {
      english: 'Draw a simple house',
      spanish: 'Dibuja una casa simple',
      papiamentu: 'Teka un kas simpel',
      dutch: 'Teken een eenvoudig huis'
    },
    image: 'https://images.pexels.com/photos/73871/rocket-launch-rocket-take-off-nasa-73871.jpeg?auto=compress&cs=tinysrgb&w=600',
    correctAnswer: {
      english: 'Drawing completed',
      spanish: 'Dibujo completado',
      papiamentu: 'Teka kaba',
      dutch: 'Tekening voltooid'
    }
  }
];

// Mock advertisements
const advertisements = [
  {
    id: '1',
    statement: 'Special Offer!',
    content: 'Get 50% off on your next adventure booking!',
    adType: 'banner' as const,
    placement: 'before-question' as const,
    questionNumber: 2,
    isActive: true
  }
];

export default function QuizScreen({ onBack, onComplete }: QuizScreenProps) {
  console.log('QuizScreen rendered');
  
  const { state, updateState } = useAppContext();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [textAnswer, setTextAnswer] = useState<string>('');
  const [canvasDrawing, setCanvasDrawing] = useState<string>('');
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'spanish' | 'papiamentu' | 'dutch'>('english');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string>('');

  const currentQuestion = questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === questions.length - 1;
  const languages = getAvailableLanguages();

  console.log('Current question:', currentQuestion);
  console.log('Current question index:', state.currentQuestionIndex);
  console.log('Questions array length:', questions.length);

  // Check for advertisements before current question
  const currentAd = advertisements.find(ad => 
    ad.questionNumber === state.currentQuestionIndex + 1 && 
    ad.placement === 'before-question' && 
    ad.isActive
  );

  // Add fallback for when currentQuestion is undefined
  if (!currentQuestion) {
    console.error('Current question is undefined!');
    return (
      <div className="min-h-screen p-6 flex flex-col justify-center max-w-md mx-auto">
        <QuestHeader />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">Question not found. Please try again.</p>
          <button
            onClick={onBack}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      updateState({ timeRemaining: Math.max(0, state.timeRemaining - 1) });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.timeRemaining, updateState]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    let answer = '';
    
    switch (currentQuestion.type) {
      case 'multiple-choice':
        answer = selectedAnswer;
        break;
      case 'text-input':
        answer = textAnswer;
        break;
      case 'canvas':
        answer = canvasDrawing;
        break;
    }

    const newAnswers = [...state.answers];
    newAnswers[state.currentQuestionIndex] = answer;
    updateState({ answers: newAnswers });

    if (isLastQuestion) {
      onComplete();
    } else {
      updateState({ currentQuestionIndex: state.currentQuestionIndex + 1 });
      setSelectedAnswer('');
      setTextAnswer('');
      setCanvasDrawing('');
      setUploadedImage('');
    }
  };

  const isAnswerSelected = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return selectedAnswer !== '';
      case 'text-input':
        return textAnswer.trim() !== '';
      case 'canvas':
        return canvasDrawing !== '';
      default:
        return false;
    }
  };

  const getQuestionText = (textObj: any) => {
    return textObj[currentLanguage] || textObj.english;
  };

  // Simplified test version
  return (
    <div className="min-h-screen p-6 flex flex-col justify-center max-w-md mx-auto">
      <QuestHeader />
      
      <div className="text-center mt-8">
        <h1 className="text-2xl font-bold text-black mb-4">
          Quiz Screen Test
        </h1>
        <p className="text-gray-600 mb-4">
          Current Question: {currentQuestion.id}
        </p>
        <p className="text-gray-600 mb-4">
          Question Type: {currentQuestion.type}
        </p>
        <p className="text-gray-600 mb-8">
          Question: {getQuestionText(currentQuestion.question)}
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={onBack}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            {isLastQuestion ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
