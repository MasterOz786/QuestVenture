import React, { createContext, useContext, useState, ReactNode } from 'react';

export type QuestionType = 'text-input' | 'code-based' | 'multiple-choice' | 'canvas' | 'video-multiple-choice';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  image?: string;
  video?: string;
  options?: string[];
  correctAnswer: string;
  points: number;
}

interface AppState {
  email: string;
  code: string[];
  showCodeInput: boolean;
  currentQuestionIndex: number;
  answers: (string | null)[];
  timeRemaining: number;
  score: number;
  canvasDrawings: { [key: number]: string };
  currentLanguage: 'english' | 'spanish' | 'papiamentu' | 'dutch';
}

interface AppContextType {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  resetQuiz: () => void;
  calculateScore: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  email: '',
  code: ['', '', '', '', ''],
  showCodeInput: false,
  currentQuestionIndex: 0,
  answers: [],
  timeRemaining: 600, // 10 minutes in seconds
  score: 0,
  canvasDrawings: {},
  currentLanguage: 'english',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  console.log('AppProvider initialized with state:', state);

  const updateState = (updates: Partial<AppState>) => {
    console.log('Updating state with:', updates);
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetQuiz = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: 600,
      score: 0,
      canvasDrawings: {},
    }));
  };

  const calculateScore = () => {
    // This would normally calculate based on correct answers
    // For demo purposes, returning a sample score
    return 28;
  };

  return (
    <AppContext.Provider value={{ state, updateState, resetQuiz, calculateScore }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
