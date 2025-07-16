import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis>();

  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true, // Enable on touch devices
      touchMultiplier: 2, // Adjust as needed
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // Expose scroll methods globally
  useEffect(() => {
    if (lenisRef.current) {
      (window as any).scrollTo = (target: string | number) => {
        if (typeof target === "string") {
          const element = document.querySelector(target);
          if (element) {
            lenisRef.current?.scrollTo(element, { offset: -80 });
          }
        } else {
          lenisRef.current?.scrollTo(target);
        }
      };
    }
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
