import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import QuestHeader from './QuestHeader';

interface QuizScreenProps {
  onBack: () => void;
}

const questions = [
  {
    id: 1,
    type: 'multiple-choice' as const,
    question: 'What is the capital of France?',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris'
  },
  {
    id: 2,
    type: 'text-input' as const,
    question: 'What is the old name of New York City?',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600',
    correctAnswer: 'New Amsterdam'
  },
  {
    id: 3,
    type: 'multiple-choice' as const,
    question: 'Which planet is known as the Red Planet?',
    image: 'https://images.pexels.com/photos/73871/rocket-launch-rocket-take-off-nasa-73871.jpeg?auto=compress&cs=tinysrgb&w=600',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars'
  }
];

export default function QuizScreen({ onBack }: QuizScreenProps) {
  const { state, updateState } = useAppContext();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [textAnswer, setTextAnswer] = useState<string>('');

  const currentQuestion = questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === questions.length - 1;

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

  const handleNext = () => {
    const answer = currentQuestion.type === 'multiple-choice' ? selectedAnswer : textAnswer;
    const newAnswers = [...state.answers];
    newAnswers[state.currentQuestionIndex] = answer;
    updateState({ answers: newAnswers });

    if (isLastQuestion) {
      // Quiz completed
      console.log('Quiz completed!', newAnswers);
    } else {
      updateState({ currentQuestionIndex: state.currentQuestionIndex + 1 });
      setSelectedAnswer('');
      setTextAnswer('');
    }
  };

  const isAnswerSelected = currentQuestion.type === 'multiple-choice' ? selectedAnswer !== '' : textAnswer.trim() !== '';

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 flex flex-col justify-center max-w-md mx-auto"
    >
      <QuestHeader />

      {/* Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center justify-center gap-2 mt-6 mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Clock className="w-6 h-6 text-white" />
        </motion.div>
        <span className="text-3xl font-bold text-white">
          {formatTime(state.timeRemaining)}
        </span>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          {/* Question Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden mb-6 h-48"
          >
            <img
              src={currentQuestion.image}
              alt="Question"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>

          {/* Question */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-2xl font-bold text-black text-center mb-8"
          >
            Q{currentQuestion.id}. {currentQuestion.question}
          </motion.h1>

          {/* Answer Options */}
          {currentQuestion.type === 'multiple-choice' ? (
            <div className="grid grid-cols-2 gap-3 mb-8">
              {currentQuestion.options?.map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAnswer(option)}
                  className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
                    selectedAnswer === option
                      ? 'bg-gradient-to-r from-red-400 to-blue-400 text-white border-transparent shadow-lg'
                      : 'bg-white/20 backdrop-blur-sm text-gray-800 border-red-300 hover:border-red-400'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8"
            >
              <input
                type="text"
                placeholder="Type your answer here..."
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-red-300 bg-white/30 backdrop-blur-sm placeholder-gray-600 text-gray-800 focus:border-blue-400 focus:outline-none transition-colors duration-300"
              />
            </motion.div>
          )}

          {/* Next Button */}
          <motion.button
            onClick={handleNext}
            disabled={!isAnswerSelected}
            whileHover={isAnswerSelected ? { scale: 1.02 } : {}}
            whileTap={isAnswerSelected ? { scale: 0.98 } : {}}
            className={`w-full py-4 rounded-xl font-bold text-xl transition-all duration-300 ${
              isAnswerSelected
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next'}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}