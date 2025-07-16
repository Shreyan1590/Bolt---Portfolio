import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis>();

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
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
