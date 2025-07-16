import React, { useEffect, useState, useCallback } from 'react';
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
import SmoothScroll from './components/SmoothScroll';
import { LoadingProvider } from './components/LoadingManager';
import { useTheme } from './hooks/useTheme';

interface Section {
  id: string;
  name: string;
}

const SECTIONS: Section[] = [
  { id: 'hero', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'research', name: 'Research' },
  { id: 'contact', name: 'Contact' }
];

// Only register GSAP plugins in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AppContent = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);

  const setupAnimations = useCallback(() => {
    const animateElements = gsap.utils.toArray<HTMLElement>('[data-animate]');
    
    animateElements.forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(element, 
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              ease: 'power2.out'
            }
          );
        }
      });
    });
  }, []);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 100;

    for (const section of SECTIONS) {
      const element = document.getElementById(section.id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    setupAnimations();

    const scrollListener = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollListener);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [setupAnimations, handleScroll]);

  return (
    <SmoothScroll>
      <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900 text-gray-100' 
          : 'bg-blue-50 text-gray-900'
      }`}>
        <DynamicBackground theme={theme} />
        
        <Navigation 
          activeSection={activeSection} 
          sections={SECTIONS}
        />
        
        <main className="relative z-10">
          <Hero id="hero" />
          <About id="about" />
          <Skills id="skills" />
          <Projects id="projects" />
          <Research id="research" />
          <Contact id="contact" />
        </main>
      </div>
    </SmoothScroll>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default App;