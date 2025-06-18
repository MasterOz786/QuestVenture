import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Circle, Users } from 'lucide-react';

export default function QuestHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="bg-gradient-to-r from-red-400 via-red-500 to-blue-500 p-1 rounded-2xl shadow-lg">
        <div className="bg-black rounded-xl px-6 py-4 flex items-center justify-center relative overflow-hidden">
          {/* Animated Background Icons */}
          <motion.div
            animate={{ 
              x: [0, 10, 0],
              y: [0, -5, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
          >
            <MapPin className="w-5 h-5 text-white opacity-60" />
          </motion.div>

          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-12 top-3"
          >
            <Circle className="w-4 h-4 text-white opacity-40" strokeWidth={1} />
          </motion.div>

          <motion.div
            animate={{ 
              x: [0, -8, 0],
              y: [0, 8, 0]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <MapPin className="w-5 h-5 text-white opacity-60" />
          </motion.div>

          <motion.div
            animate={{ 
              scale: [1, 0.8, 1],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-12 top-6"
          >
            <Users className="w-4 h-4 text-white opacity-40" />
          </motion.div>

          {/* Connecting Lines */}
          <motion.div
            animate={{ 
              strokeDashoffset: [0, -20, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg className="w-full h-full" viewBox="0 0 100 20">
              <path
                d="M 20 10 Q 35 5 50 10 T 80 10"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
                opacity="0.3"
                strokeDasharray="2 2"
              />
            </svg>
          </motion.div>

          {/* Main Logo Text */}
          <div className="text-center relative z-10">
            <motion.h1 
              className="text-white font-bold text-xl tracking-wider"
              initial={{ letterSpacing: '0.05em' }}
              animate={{ letterSpacing: ['0.05em', '0.1em', '0.05em'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              QU≡ST V≡NTUR≡
            </motion.h1>
            <motion.p 
              className="text-white/70 text-xs tracking-widest mt-1"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              POWERED BY VELITT
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}