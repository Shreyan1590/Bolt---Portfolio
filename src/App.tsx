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
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { useScrollDirection } from './hooks/useScrollDirection';

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

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AppContent = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const scrollDirection = useScrollDirection();

  const setupAnimations = useCallback(() => {
    gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.fromTo(element, 
            { opacity: 0, y: 40 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              ease: 'power3.out'
            }
          );
        }
      });
    });

    gsap.to('#main-header', {
      opacity: 1,
      duration: 1,
      delay: 0.5
    });
  }, []);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
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

    const debouncedScroll = () => {
      let timeout: NodeJS.Timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(handleScroll, 50);
      };
    };

    window.addEventListener('scroll', debouncedScroll(), { passive: true });

    return () => {
      window.removeEventListener('scroll', debouncedScroll());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf('*');
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
          scrollDirection={scrollDirection}
        />
        
        <main className="relative z-10">
          <Hero id="hero" />
          <About id="about" />
          <Skills id="skills" />
          <Projects id="projects" />
          <Research id="research" />
          <Contact id="contact" />
        </main>

        <Footer />
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