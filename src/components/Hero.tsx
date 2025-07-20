import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import InteractiveCard from './InteractiveCard';
import { ChevronDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Hero = () => {
  const { theme } = useTheme();
  const heroRef = useScrollAnimation();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Computer Science & Biosciences Student";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/Shreyan1590", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/shreyan-s2596/", label: "LinkedIn" },
    { icon: Mail, href: "#contact", label: "Email" },
  ];

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Profile Image */}
          <InteractiveCard intensity={0.5}>
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`mx-auto w-32 h-32 rounded-full p-1 mb-8 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                  : 'bg-gradient-to-r from-orange-400 to-pink-400'
              }`}
            >
              <div className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <span className={`text-4xl font-bold transition-all duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>S</span>
              </div>
            </motion.div>
          </InteractiveCard>

          {/* Name and Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className={`bg-clip-text text-transparent transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                : 'bg-gradient-to-r from-orange-500 to-pink-500'
            }`}>
              Shreyan
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-6 h-8"
          >
            {displayText}
            <span className="animate-pulse">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`text-lg max-w-2xl mx-auto mb-8 transition-all duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            2nd Year B.Tech Student at SIMATS Engineering, passionate about bridging technology and biology 
            through innovative solutions. Exploring the intersection of computer science and biosciences.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <InteractiveCard>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 flex items-center space-x-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600'
                    : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
                }`}
              >
                <Download size={20} />
                <span>Download Resume</span>
              </motion.button>
            </InteractiveCard>

            <InteractiveCard>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window as any).scrollTo('#contact')}
                className={`px-8 py-3 border-2 rounded-lg font-medium transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900'
                    : 'border-orange-400 text-orange-500 hover:bg-orange-400 hover:text-white'
                }`}
              >
                Let's Connect
              </motion.button>
            </InteractiveCard>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center space-x-6 mb-12"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500'
                    : 'bg-white shadow-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white'
                }`}
                aria-label={link.label}
              >
                <link.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`flex flex-col items-center space-y-2 transition-all duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <span className="text-sm">Scroll Down</span>
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;