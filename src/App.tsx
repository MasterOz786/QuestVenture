import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SignInScreen from './components/SignInScreen';
import LocationScreen from './components/LocationScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import { AppProvider } from './context/AppContext';

export type Screen = 'signin' | 'location' | 'quiz' | 'results';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('signin');

  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-blue-300 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === 'signin' && (
            <SignInScreen key="signin" onNext={() => setCurrentScreen('location')} />
          )}
          {currentScreen === 'location' && (
            <LocationScreen key="location" onNext={() => setCurrentScreen('quiz')} />
          )}
          {currentScreen === 'quiz' && (
            <QuizScreen 
              key="quiz" 
              onBack={() => setCurrentScreen('location')}
              onComplete={() => setCurrentScreen('results')}
            />
          )}
          {currentScreen === 'results' && (
            <ResultsScreen 
              key="results" 
              onRestart={() => setCurrentScreen('signin')}
            />
          )}
        </AnimatePresence>
      </div>
    </AppProvider>
  );
}

export default App;