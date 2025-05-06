import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon, FileTextIcon, BriefcaseIcon } from 'lucide-react';

const StaggeredText = ({ text }) => {
  return (
    <div className="overflow-hidden">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: i * 0.05,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

const AnimatedText = ({ text, delay = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="inline-block"
    >
      {text}
    </motion.span>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, -10]);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
      {/* Enhanced gradient background with animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      />

      <motion.div
        style={{ y, opacity, scale, rotateZ: rotate }}
        className="container mx-auto px-4 z-10 text-center"
      >
        <div className="mb-6">
          <h1 className="text-6xl md:text-[120px] font-bold tracking-tighter leading-none">
            <StaggeredText text="CREATIVE" />
            <StaggeredText text="DEVELOPER" />
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-pink-500 font-light mb-12"
        >
          FULL STACK DEVELOPMENT & UI/UX DESIGN
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-pink-500 text-white font-medium rounded-full hover:bg-pink-600 transition-all"
          >
            VIEW PROJECTS
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all"
          >
            CONTACT ME
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating particles effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-500/20 rounded-full"
            animate={{
              x: ['0%', `${Math.random() * 100}%`],
              y: ['0%', `${Math.random() * 100}%`],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-pink-500"
        >
          <ArrowDownIcon size={32} />
        </motion.div>
      </motion.div>

      {/* Number indicator */}
      <div className="absolute top-8 left-8 text-8xl font-bold text-white/10">
        01
      </div>
    </section>
  );
};

export default Hero;
