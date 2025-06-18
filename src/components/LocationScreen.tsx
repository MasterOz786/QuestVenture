import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import QuestHeader from './QuestHeader';

interface LocationScreenProps {
  onNext: () => void;
}

export default function LocationScreen({ onNext }: LocationScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
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
        <h1 className="text-4xl font-bold text-black text-center mb-8">Location</h1>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden mb-8 h-64 bg-gradient-to-br from-green-200 to-blue-200"
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: `url('https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg?auto=compress&cs=tinysrgb&w=600')`
          }}>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          {/* Map Pin */}
          <motion.div
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full"
          >
            <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="currentColor" />
          </motion.div>

          {/* See Location Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-black/70"
          >
            See Location in Google Maps
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl font-bold text-xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Continue to Question
        </motion.button>
      </motion.div>
    </motion.div>
  );
}