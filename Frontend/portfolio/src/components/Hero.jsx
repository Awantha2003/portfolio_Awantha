import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Briefcase, Code, Sparkles } from 'lucide-react';

// Kinetic Typography Component with enhanced centering
const KineticText = ({ text, className = "" }) => {
  return (
    <div className={`overflow-hidden flex flex-wrap justify-center ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 100, opacity: 0, rotateY: 80 }}
          animate={{ y: 0, opacity: 1, rotateY: 0 }}
          transition={{
            duration: 1.2,
            delay: i * 0.05,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

// Background Effects
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <div className="absolute inset-0 grid grid-cols-12 gap-2">
      {Array.from({ length: 120 }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full w-full bg-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: 4,
            delay: i * 0.02,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  </div>
);

const NoiseEffect = () => {
  const [noiseElements, setNoiseElements] = useState([]);
  
  useEffect(() => {
    const elements = [];
    for (let i = 0; i < 120; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 1 + 0.5
      });
    }
    setNoiseElements(elements);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {noiseElements.map(el => (
        <motion.div
          key={el.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: `${el.size}px`,
            height: `${el.size}px`
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Main Hero Component
const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, -10]);
  
  const [isRevealed, setIsRevealed] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-black to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      <GridBackground />
      <NoiseEffect />
      
      {/* Enhanced Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>
      
      {/* Digital Grid Lines */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
        <motion.div 
          className="w-full h-full border border-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        />
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ top: `${(i + 1) * 20}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.2 * i }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 0.2 * i }}
          />
        ))}
      </div>
      
      {/* Main Content with Centered Text */}
      <motion.div
        style={{ y, opacity, scale, rotateZ: rotate }}
        className="container mx-auto px-4 z-10 text-center relative"
      >
        <AnimatePresence>
          {isRevealed && (
            <>
              {/* Reveal Animation */}
              <motion.div
                initial={{ height: '100%' }}
                animate={{ height: '0%' }}
                transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-0 bg-black z-20"
              />
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-2 flex justify-center"
              >
                <motion.div 
                  className="text-sm sm:text-lg text-pink-500 font-light tracking-widest"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Sparkles className="inline mr-2" size={16} />
                  WELCOME TO MY PORTFOLIO
                </motion.div>
              </motion.div>
              
              {/* Centered and enhanced name display */}
              <div className="mb-6 flex flex-col items-center justify-center">
                <h1 className="font-bold tracking-tighter leading-none">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2">
                    <KineticText text="Awantha Imesh" />
                  </div>
                  
                  {/* Creative separator with animation */}
                  <motion.div 
                    className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-pink-500 to-transparent my-3"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 96, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-pink-500"
                  >
                    <KineticText text="DEVELOPER" />
                  </motion.div>
                </h1>
              </div>
              
              {/* Creative floating elements around the centered text */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-gradient-to-r from-pink-500/5 to-indigo-500/5 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${Math.random() * 60 + 20}px`,
                      height: `${Math.random() * 60 + 20}px`,
                    }}
                    animate={{
                      x: [0, Math.random() * 40 - 20, 0],
                      y: [0, Math.random() * 40 - 20, 0],
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-sm sm:text-lg md:text-xl text-pink-500 font-light mb-12 relative flex justify-center"
              >
                <motion.span
                  animate={{ 
                    textShadow: ["0 0 8px rgba(236, 72, 153, 0)", "0 0 16px rgba(236, 72, 153, 0.6)", "0 0 8px rgba(236, 72, 153, 0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  FULL STACK DEVELOPMENT & UI/UX DESIGN
                </motion.span>
                
                {/* Animated Underline */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
                  animate={{ 
                    backgroundPosition: ['200% 0', '-200% 0'],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-600 to-pink-500 text-white text-sm sm:text-base font-medium rounded-full hover:from-pink-700 hover:to-pink-600 transition-all group overflow-hidden relative"
                >
                  <motion.span 
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative flex items-center justify-center">
                    VIEW PROJECTS
                    <Briefcase className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white text-sm sm:text-base font-medium rounded-full hover:bg-white/5 transition-all group"
                >
                  <span className="relative flex items-center justify-center">
                    CONTACT ME
                    <Code className="ml-2" size={16} />
                  </span>
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ 
            y: [0, 10, 0], 
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-pink-500 p-2 rounded-full border border-pink-500/20"
        >
          <ArrowDown size={20} />
        </motion.div>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-2 text-xs tracking-widest text-white/50"
        >
          SCROLL DOWN
        </motion.div>
      </motion.div>

      {/* Number indicator with responsive size */}
      <div className="absolute top-8 left-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white"
        >
          01
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 2 }}
          className="h-px bg-gradient-to-r from-white/20 to-transparent"
        />
      </div>
    </section>
  );
};

export default Hero;