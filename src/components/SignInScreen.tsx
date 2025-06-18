import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import QuestHeader from './QuestHeader';

interface SignInScreenProps {
  onNext: () => void;
}

const countries = [
  'United States', 'Netherlands', 'Spain', 'Aruba', 'Curacao', 'Sint Maarten',
  'United Kingdom', 'Germany', 'France', 'Italy', 'Canada', 'Australia'
];

export default function SignInScreen({ onNext }: SignInScreenProps) {
  const { state, updateState } = useAppContext();
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);

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

  const handleCountrySearch = (value: string) => {
    updateState({ country: value });
    const filtered = countries.filter(country =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const isFormValid = state.email && 
                     state.country && 
                     state.showCodeInput && 
                     state.code.every(digit => digit !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 flex flex-col justify-center max-w-md mx-auto"
    >
      <QuestHeader />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8"
      >
        <h1 className="text-4xl font-bold text-black text-center mb-4">Sign In</h1>
        <p className="text-gray-700 text-center mb-8">
          Enter your email and country to get started.
        </p>

        {/* Email Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6"
        >
          <input
            type="email"
            placeholder="Enter your Email Here"
            value={state.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className="w-full p-4 rounded-xl border-2 border-red-300 bg-white/30 backdrop-blur-sm placeholder-gray-600 text-gray-800 focus:border-blue-400 focus:outline-none transition-colors duration-300"
          />
        </motion.div>

        {/* Country Selection */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8 relative"
        >
          <div
            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            className="w-full p-4 rounded-xl border-2 border-red-300 bg-white/30 backdrop-blur-sm text-gray-800 cursor-pointer flex items-center justify-between transition-colors duration-300 hover:border-blue-400"
          >
            <span className={state.country ? 'text-gray-800' : 'text-gray-600'}>
              {state.country || 'Search & Select Country'}
            </span>
            <ChevronDown className={`transition-transform duration-300 ${showCountryDropdown ? 'rotate-180' : ''}`} />
          </div>

          {showCountryDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-xl border-2 border-red-300 max-h-48 overflow-y-auto z-10"
            >
              <input
                type="text"
                placeholder="Search countries..."
                value={state.country}
                onChange={(e) => handleCountrySearch(e.target.value)}
                className="w-full p-3 border-b border-gray-200 bg-transparent outline-none"
                autoFocus
              />
              {filteredCountries.map((country) => (
                <div
                  key={country}
                  onClick={() => {
                    updateState({ country });
                    setShowCountryDropdown(false);
                  }}
                  className="p-3 hover:bg-red-100 cursor-pointer transition-colors duration-200"
                >
                  {country}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Enter Code Section - Only show after email is entered */}
        {state.showCodeInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-black mb-4">Enter Code</h2>
            <p className="text-gray-700 mb-6">
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
                  className="w-16 h-16 text-center text-2xl font-bold rounded-xl border-0 bg-white/40 backdrop-blur-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
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
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Continue
        </motion.button>
      </motion.div>
    </motion.div>
  );
}