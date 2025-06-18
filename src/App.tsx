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
      <div className="min-h-screen relative overflow-hidden">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
    style={{
      backgroundImage: `url('/images/bg2.png')`
    }}
  />

  {/* App Content */}
  <div className="relative z-10 min-h-screen">
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
</div>
    </AppProvider>
  );
}

export default App;