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

  // Ensure currentQuestionIndex is within bounds
  const safeQuestionIndex = Math.min(state.currentQuestionIndex, questions.length - 1);
  const currentQuestion = questions[safeQuestionIndex];
  const isLastQuestion = safeQuestionIndex === questions.length - 1;
  const languages = getAvailableLanguages();

  console.log('Current question:', currentQuestion);
  console.log('Current question index:', safeQuestionIndex);
  console.log('Questions array length:', questions.length);

  // Check for advertisements before current question
  const currentAd = advertisements.find(ad => 
    ad.questionNumber === safeQuestionIndex + 1 && 
    ad.placement === 'before-question' && 
    ad.isActive
  );

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
    newAnswers[safeQuestionIndex] = answer;
    updateState({ answers: newAnswers });

    if (isLastQuestion) {
      onComplete();
    } else {
      updateState({ currentQuestionIndex: safeQuestionIndex + 1 });
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 flex flex-col max-w-md mx-auto"
    >
      <QuestHeader />

      {/* Timer and Progress */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mt-6 mb-4"
      >
        <div className="flex items-center gap-2 text-white">
          <Clock className="w-5 h-5" />
          <span className="font-mono text-lg">{formatTime(state.timeRemaining)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLanguageSelector(!showLanguageSelector)}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button
            onClick={onBack}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Language Selector */}
      <AnimatePresence>
        {showLanguageSelector && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLanguage(lang.code as any);
                    setShowLanguageSelector(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full bg-white/20 rounded-full h-2 mb-6"
      >
        <div
          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((safeQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </motion.div>

      {/* Advertisement */}
      {currentAd && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 mb-6 text-black"
        >
          <h3 className="font-bold text-lg mb-2">{currentAd.statement}</h3>
          <p>{currentAd.content}</p>
        </motion.div>
      )}

      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 mb-6 flex-1"
      >
        {/* Question Number */}
        <div className="text-center mb-4">
          <span className="text-red-500 font-bold text-lg">
            Question {safeQuestionIndex + 1} of {questions.length}
          </span>
        </div>

        {/* Question Image */}
        {currentQuestion.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl overflow-hidden mb-6"
          >
            <img
              src={currentQuestion.image}
              alt="Question"
              className="w-full h-48 object-cover"
            />
          </motion.div>
        )}

        {/* Question Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl font-bold text-gray-900 mb-6 text-center"
        >
          {getQuestionText(currentQuestion.question)}
        </motion.h2>

        {/* Answer Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(getQuestionText(option))}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedAnswer === getQuestionText(option)
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {getQuestionText(option)}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'text-input' && (
            <div>
              <textarea
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none resize-none"
                rows={4}
              />
            </div>
          )}

          {currentQuestion.type === 'canvas' && (
            <div>
              <CanvasDrawing
                onDrawingChange={setCanvasDrawing}
                initialDrawing={canvasDrawing}
              />
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Next Button */}
      <motion.button
        onClick={handleNext}
        disabled={!isAnswerSelected()}
        whileHover={{ scale: isAnswerSelected() ? 1.02 : 1 }}
        whileTap={{ scale: isAnswerSelected() ? 0.98 : 1 }}
        className={`w-full py-4 rounded-xl font-bold text-xl transition-all duration-300 ${
          isAnswerSelected()
            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
      </motion.button>
    </motion.div>
  );
}