import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SignInScreen from './components/SignInScreen';
import LocationScreen from './components/LocationScreen';
import QuizScreen from './components/QuizScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import AdminApp from './components/admin/AdminApp';
import { AppProvider } from './context/AppContext';

export type Screen = 'signin' | 'location' | 'quiz' | 'leaderboard' | 'admin';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('quiz');

  // Check if we should show admin panel
  const showAdmin = window.location.pathname === '/admin' || currentScreen === 'admin';

  // Debug logging
  console.log('Current screen:', currentScreen);
  console.log('Show admin:', showAdmin);

  if (showAdmin) {
    return <AdminApp />;
  }

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
              <SignInScreen key="signin" onNext={() => {
                console.log('Moving from signin to location');
                setCurrentScreen('location');
              }} />
            )}
            {currentScreen === 'location' && (
              <LocationScreen key="location" onNext={() => {
                console.log('Moving from location to quiz');
                setCurrentScreen('quiz');
              }} />
            )}
            {currentScreen === 'quiz' && (
              <QuizScreen 
                key="quiz" 
                onBack={() => {
                  console.log('Moving from quiz to location');
                  setCurrentScreen('location');
                }}
                onComplete={() => {
                  console.log('Moving from quiz to leaderboard');
                  setCurrentScreen('leaderboard');
                }}
              />
            )}
            {currentScreen === 'leaderboard' && (
              <LeaderboardScreen 
                key="leaderboard" 
                onRestart={() => {
                  console.log('Moving from leaderboard to signin');
                  setCurrentScreen('signin');
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;