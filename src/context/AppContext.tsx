import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  selectedLanguage: string;
  email: string;
  country: string;
  code: string[];
  currentQuestionIndex: number;
  answers: (string | null)[];
  timeRemaining: number;
}

interface AppContextType {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  resetQuiz: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  selectedLanguage: 'english',
  email: '',
  country: '',
  code: ['', '', '', '', ''],
  currentQuestionIndex: 0,
  answers: [],
  timeRemaining: 600, // 10 minutes in seconds
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetQuiz = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      answers: [],
      timeRemaining: 600,
    }));
  };

  return (
    <AppContext.Provider value={{ state, updateState, resetQuiz }}>
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