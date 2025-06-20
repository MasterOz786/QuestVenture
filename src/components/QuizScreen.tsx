import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Clock, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import QuestHeader from './QuestHeader';

interface QuizScreenProps {
  onBack: () => void;
  onComplete: () => void;
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

export default function QuizScreen({ onBack, onComplete }: QuizScreenProps) {
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
      // Quiz completed - navigate to leaderboard
      onComplete();
    } else {
      updateState({ currentQuestionIndex: state.currentQuestionIndex + 1 });
      setSelectedAnswer('');
      setTextAnswer('');
    }
  };

  const isAnswerSelected = currentQuestion.type === 'multiple-choice' ? selectedAnswer !== '' : textAnswer.trim() !== '';

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center max-w-md mx-auto">
      <QuestHeader />

      {/* Timer */}
      <div className="flex items-center justify-center gap-2 mt-6 mb-8">
        <Clock className="w-6 h-6 text-white" />
        <span className="text-3xl font-bold text-white">
          {formatTime(state.timeRemaining)}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <div key={currentQuestion.id} className="flex-1">
          {/* Question Image */}
          <div className="relative rounded-2xl overflow-hidden mb-6 h-48">
            <img
              src={currentQuestion.image}
              alt="Question"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Question */}
          <h1 className="text-2xl font-bold text-black text-center mb-8">
            Q{currentQuestion.id}. {currentQuestion.question}
          </h1>

          {/* Answer Options */}
          {currentQuestion.type === 'multiple-choice' ? (
            <div className="grid grid-cols-2 gap-3 mb-8">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
                    selectedAnswer === option
                      ? 'bg-gradient-to-r from-red-400 to-blue-400 text-white border-transparent shadow-lg'
                      : 'bg-white/20 backdrop-blur-sm text-gray-800 border-red-300 hover:border-red-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="mb-8">
              <input
                type="text"
                placeholder="Type your answer here..."
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-red-300 bg-white/30 backdrop-blur-sm placeholder-gray-600 text-gray-800 focus:border-blue-400 focus:outline-none transition-colors duration-300"
              />
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!isAnswerSelected}
            className={`w-full py-4 rounded-xl font-bold text-xl transition-all duration-300 ${
              isAnswerSelected
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </AnimatePresence>
    </div>
  );
}