import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import QuestHeader from './QuestHeader';

interface ResultsScreenProps {
  onRestart: () => void;
}

export default function ResultsScreen({ onRestart }: ResultsScreenProps) {
  const { calculateScore } = useAppContext();
  const score = calculateScore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 flex flex-col justify-center max-w-md mx-auto"
    >
      {/* Velitt Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-bold text-white">Velitt</h1>
      </motion.div>

      <QuestHeader />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8"
      >
        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-black mb-2">Score: {score}</h1>
        </motion.div>

        {/* Additional Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-black mb-6">Additional Information:</h2>
          
          {/* Information Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden mb-6 h-48"
          >
            <img
              src="https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="City skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </motion.div>

          {/* Information Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8"
          >
            <p className="text-gray-800 leading-relaxed">
              The Knowledge Game is constantly updated with new questions to keep the 
              experience fresh and engaging. Players can choose from a variety of categories, 
              including history, science, literature, and pop culture. The game also features 
              leaderboards, so you can see how you stack up against other players. Whether 
              you're playing solo or challenging friends, the Knowledge Game is a great way 
              to test your trivia skills and learn something new.
            </p>
          </motion.div>
        </motion.div>

        {/* Next Button */}
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl font-bold text-xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Next
        </motion.button>
      </motion.div>
    </motion.div>
  );
}