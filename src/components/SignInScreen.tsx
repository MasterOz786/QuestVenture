import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import QuestHeader from './QuestHeader';

interface SignInScreenProps {
  onNext: () => void;
}

export default function SignInScreen({ onNext }: SignInScreenProps) {
  const { state, updateState } = useAppContext();

  const handleEmailChange = (email: string) => {
    updateState({ email });
    // Show code input after email is entered
    if (email.includes('@') && email.includes('.')) {
      updateState({ showCodeInput: true });
    } else {
      updateState({ showCodeInput: false });
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...state.code];
      newCode[index] = value;
      updateState({ code: newCode });

      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.querySelector(`[data-code-index="${index + 1}"]`) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const isFormValid = state.email && 
                     state.showCodeInput && 
                     state.code.every(digit => digit !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          // backgroundImage: `url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1200')`
          backgroundImage: `url('/images/bg2.png')`
        }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-br from-pink-400/60 via-purple-400/50 to-blue-400/60"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col justify-center max-w-md mx-auto min-h-screen">
        <QuestHeader />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8"
        >
          <h1 className="text-4xl font-bold text-white text-center mb-4 drop-shadow-lg">Sign In</h1>
          <p className="text-white/90 text-center mb-8 drop-shadow-md">
            Enter your email to get started.
          </p>

          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <input
              type="email"
              placeholder="Enter your Email Here"
              value={state.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-md placeholder-white/70 text-white focus:border-white/60 focus:outline-none transition-all duration-300 focus:bg-white/30"
            />
          </motion.div>

          {/* Enter Code Section - Only show after email is entered */}
          {state.showCodeInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Enter Code</h2>
              <p className="text-white/90 mb-6 drop-shadow-md">
                Please enter the one-time password sent to your registered email.
              </p>

              <div className="flex justify-center gap-3 mb-8">
                {state.code.map((digit, index) => (
                  <motion.input
                    key={index}
                    data-code-index={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && index > 0) {
                        const prevInput = document.querySelector(`[data-code-index="${index - 1}"]`) as HTMLInputElement;
                        prevInput?.focus();
                      }
                    }}
                    className="w-16 h-16 text-center text-2xl font-bold rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all duration-300"
                    maxLength={1}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          <motion.button
            onClick={onNext}
            disabled={!isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`w-full py-4 rounded-xl font-bold text-xl transition-all duration-300 ${
              isFormValid
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl backdrop-blur-sm'
                : 'bg-white/20 text-white/50 cursor-not-allowed backdrop-blur-sm'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Continue
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}