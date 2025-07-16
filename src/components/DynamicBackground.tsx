import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const DynamicBackground: React.FC = () => {
  const { theme, isTransitioning } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for different layers
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const planetsY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const cloudsY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const sunY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // Generate random stars for space theme
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleDelay: Math.random() * 3,
    }));
  };

  const [stars] = useState(() => generateStars(200));
  const [shootingStars] = useState(() => generateStars(5));

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Theme Transition Overlay */}
      <motion.div
        className="absolute inset-0 z-50"
        initial={false}
        animate={{
          opacity: isTransitioning ? 1 : 0,
          scale: isTransitioning ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
            : 'radial-gradient(circle, #87ceeb 0%, #98d8e8 50%, #b0e0e6 100%)',
        }}
      />

      {/* Dark Mode - Space Theme */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: theme === 'dark' ? 1 : 0,
          scale: theme === 'dark' ? 1 : 0.9,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Space Gradient Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 25%, #0f0f23 50%),
              radial-gradient(ellipse at bottom, #16213e 0%, #0f0f23 25%, #000000 50%)
            `,
          }}
        />

        {/* Nebula Effects */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y: starsY }}
        >
          <div 
            className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, rgba(75, 0, 130, 0.2) 50%, transparent 70%)',
            }}
          />
          <div 
            className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, rgba(30, 144, 255, 0.2) 50%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* Stars Layer 1 - Background */}
        <motion.div
          className="absolute inset-0"
          style={{ y: starsY }}
        >
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + star.twinkleDelay,
                repeat: Infinity,
                delay: star.twinkleDelay,
              }}
            />
          ))}
        </motion.div>

        {/* Planets */}
        <motion.div
          className="absolute inset-0"
          style={{ y: planetsY }}
        >
          {/* Large Planet */}
          <div 
            className="absolute top-1/4 right-20 w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #ff6b6b, #ee5a24, #d63031)',
              boxShadow: '0 0 50px rgba(255, 107, 107, 0.3)',
            }}
          />
          
          {/* Small Moon */}
          <div 
            className="absolute top-1/3 right-32 w-8 h-8 rounded-full bg-gray-300"
            style={{
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          />

          {/* Distant Planet */}
          <div 
            className="absolute bottom-1/4 left-16 w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle at 40% 40%, #74b9ff, #0984e3, #2d3436)',
              boxShadow: '0 0 30px rgba(116, 185, 255, 0.2)',
            }}
          />
        </motion.div>

        {/* Shooting Stars */}
        {shootingStars.map((star) => (
          <motion.div
            key={`shooting-${star.id}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            animate={{
              x: [0, 200],
              y: [0, 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: star.id * 3,
              repeatDelay: 10,
            }}
          >
            <div 
              className="absolute w-20 h-0.5 bg-gradient-to-r from-white to-transparent"
              style={{ transform: 'rotate(45deg)', transformOrigin: 'left' }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Light Mode - Bright Day Theme */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: theme === 'light' ? 1 : 0,
          scale: theme === 'light' ? 1 : 0.9,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Sky Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, 
                #87ceeb 0%, 
                #98d8e8 25%, 
                #b0e0e6 50%, 
                #e0f6ff 75%, 
                #f0f8ff 100%
              )
            `,
          }}
        />

        {/* Sun */}
        <motion.div
          className="absolute top-20 right-20"
          style={{ y: sunY }}
        >
          <div 
            className="w-24 h-24 rounded-full"
            style={{
              background: 'radial-gradient(circle, #ffd700 0%, #ffed4e 50%, #f39c12 100%)',
              boxShadow: '0 0 100px rgba(255, 215, 0, 0.6), 0 0 200px rgba(255, 215, 0, 0.3)',
            }}
          />
          {/* Sun Rays */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 bg-yellow-300 origin-bottom"
              style={{
                height: '40px',
                transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
              }}
              animate={{
                scaleY: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Clouds Layer 1 */}
        <motion.div
          className="absolute inset-0"
          style={{ y: cloudsY }}
        >
          {/* Cloud 1 */}
          <div className="absolute top-32 left-20">
            <div 
              className="w-20 h-12 bg-white rounded-full opacity-80"
              style={{ filter: 'blur(1px)' }}
            />
            <div 
              className="absolute -top-2 left-4 w-16 h-10 bg-white rounded-full opacity-80"
              style={{ filter: 'blur(1px)' }}
            />
            <div 
              className="absolute -top-1 left-8 w-12 h-8 bg-white rounded-full opacity-80"
              style={{ filter: 'blur(1px)' }}
            />
          </div>

          {/* Cloud 2 */}
          <div className="absolute top-48 right-32">
            <div 
              className="w-24 h-14 bg-white rounded-full opacity-70"
              style={{ filter: 'blur(1px)' }}
            />
            <div 
              className="absolute -top-3 left-6 w-18 h-12 bg-white rounded-full opacity-70"
              style={{ filter: 'blur(1px)' }}
            />
          </div>

          {/* Cloud 3 */}
          <div className="absolute bottom-1/3 left-1/3">
            <div 
              className="w-28 h-16 bg-white rounded-full opacity-60"
              style={{ filter: 'blur(2px)' }}
            />
            <div 
              className="absolute -top-4 left-8 w-20 h-14 bg-white rounded-full opacity-60"
              style={{ filter: 'blur(2px)' }}
            />
          </div>
        </motion.div>

        {/* Birds */}
        <motion.div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${30 + i * 15}%`,
                left: '-10%',
              }}
              animate={{
                x: ['0vw', '110vw'],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                delay: i * 8,
                ease: 'linear',
              }}
            >
              <svg width="20" height="12" viewBox="0 0 20 12" className="text-gray-600">
                <path
                  d="M2 6 C2 6, 6 2, 10 6 C14 2, 18 6, 18 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Particles (Light Mode) */}
        <motion.div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DynamicBackground;