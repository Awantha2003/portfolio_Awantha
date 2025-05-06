import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const HighlightText = ({ children }) => {
  return (
    <motion.span
      initial={{ backgroundSize: '0% 100%' }}
      whileInView={{ backgroundSize: '100% 100%' }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="inline-block px-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 bg-no-repeat"
      style={{ backgroundPosition: '0 0' }}
    >
      {children}
    </motion.span>
  );
};

const FloatingHand = () => {
  return (
    <motion.div
      animate={{
        y: [0, 15, 0],
        rotateZ: [0, 5, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="relative w-[300px] h-[300px]"
    >
      {/* Glowing ring effect */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-2xl"
      />
      {/* 3D Hand Image */}
      <motion.div
        animate={{ rotateY: [0, 10, -10, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 w-full h-full"
        style={{ perspective: '1000px' }}
      >
        <img
          src="https://assets.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15d1_Project-p-500.png"
          alt="3D Hand"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

const WhySmooth = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-black overflow-hidden">
      {/* Cinematic vignette */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30" />
      </div>

      {/* Particle system */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, `${Math.random() * 100}vh`],
              x: [0, `${Math.random() * 100}vw`],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
        <motion.div
          style={{ opacity, scale }}
          className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Title */}
          <div className="text-center lg:text-left">
            <motion.h2
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-6xl lg:text-8xl font-bold tracking-tighter mb-8"
            >
              WHY
              <br />
              SMOOTH
              <br />
              SCROLL?
            </motion.h2>
            <FloatingHand />
          </div>

          {/* Right side - Text */}
          <motion.div style={{ y }} className="space-y-8 text-lg lg:text-xl text-gray-300">
            <p>
              We've heard all the reasons to not use smooth scroll.{' '}
              <HighlightText>It feels hacky.</HighlightText>{' '}
              <HighlightText>It's inaccessible.</HighlightText>{' '}
              <HighlightText>It's not performant.</HighlightText>
            </p>
            <p>
              And historically, those were all true. But we like to imagine
              things as they could be, then build them. So, why should you use
              smooth scroll?
            </p>
            <p>
              Because when done right, it creates an{' '}
              <HighlightText>immersive experience</HighlightText> that guides
              users through your content like a well-directed film.
            </p>
            <p>
              It's not just about smooth motion - it's about{' '}
              <HighlightText>crafting moments</HighlightText> and{' '}
              <HighlightText>controlling pace</HighlightText> in your digital
              story.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySmooth;
