import React from 'react';
import { motion } from 'framer-motion';
import { Code, Dna } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="mx-auto w-16 h-16 mb-4 relative"
        >
          <Code className="w-8 h-8 text-cyan-400 absolute top-0 left-0" />
          <Dna className="w-8 h-8 text-purple-400 absolute bottom-0 right-0" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          Loading Portfolio
        </motion.h1>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="w-48 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mt-4 mx-auto rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;