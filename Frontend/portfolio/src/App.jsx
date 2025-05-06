import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Experience from './components/Experience';
import Contact from './components/Contact';
import StackedCards from './components/StackedCards';
import WhySmooth from './components/WhySmooth';

const App = () => {
  useEffect(() => {
    const initSmoothScroll = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => {
          lenis.destroy();
        };
      } catch (error) {
        console.warn('Smooth scroll not initialized:', error);
      }
    };

    initSmoothScroll();
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <WhySmooth />
        <StackedCards />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <Contact />
      </motion.div>
    </div>
  );
};

export default App;
