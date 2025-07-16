import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Stars } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`
        relative p-3 rounded-full transition-all duration-300 
        ${theme === 'dark' 
          ? 'bg-gray-800/80 hover:bg-gray-700/80 text-cyan-400' 
          : 'bg-white/80 hover:bg-gray-100/80 text-orange-500'
        }
        backdrop-blur-md border-2 
        ${theme === 'dark' ? 'border-cyan-400/30' : 'border-orange-300/30'}
        shadow-lg hover:shadow-xl
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="relative w-6 h-6 flex items-center justify-center"
        animate={{ rotate: isTransitioning ? 360 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute"
          animate={{
            opacity: theme === 'dark' ? 1 : 0,
            scale: theme === 'dark' ? 1 : 0.5,
            rotate: theme === 'dark' ? 0 : 180,
          }}
          transition={{ duration: 0.4 }}
        >
          <Moon size={24} />
        </motion.div>
        
        <motion.div
          className="absolute"
          animate={{
            opacity: theme === 'light' ? 1 : 0,
            scale: theme === 'light' ? 1 : 0.5,
            rotate: theme === 'light' ? 0 : -180,
          }}
          transition={{ duration: 0.4 }}
        >
          <Sun size={24} />
        </motion.div>
      </motion.div>

      {/* Animated Background Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, transparent 70%)',
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Stars Effect for Dark Mode */}
      {theme === 'dark' && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                top: `${20 + i * 20}%`,
                left: `${30 + i * 15}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.button>
  );
};

export default ThemeToggle;