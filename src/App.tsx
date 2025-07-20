import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThemeProvider from './components/ThemeProvider';
import DynamicBackground from './components/DynamicBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Research from './components/Research';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import { LoadingProvider } from './components/LoadingManager';
import { useTheme } from './hooks/useTheme';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Optimized scroll detection with throttling
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const updateActiveSection = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'research', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SmoothScroll>
      <div className={`min-h-screen overflow-x-hidden transition-all duration-800 ${
        theme === 'dark' 
          ? 'bg-gray-900 text-white' 
          : 'bg-blue-50 text-gray-900'
      }`}>
        <DynamicBackground />
        <Navigation activeSection={activeSection} />
        
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Research />
          <Contact />
          <Footer />
        </main>
      </div>
    </SmoothScroll>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;