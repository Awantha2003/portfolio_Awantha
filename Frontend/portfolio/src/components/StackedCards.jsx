import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cards = [
  { number: '01', title: 'RUN THE CODE', description: 'Start your journey with smooth scrolling' },
  { number: '02', title: 'LIGHT WEIGHT', description: 'Optimized for performance' },
  { number: '03', title: 'MADE WITH LOVE', description: 'Crafted with attention to detail' },
  { number: '04', title: 'BRING YOUR OWN', description: 'Customizable and extensible' },
  { number: '05', title: 'CONTROL SCROLL', description: 'Full control over scrolling behavior' },
  { number: '06', title: 'USE AS YOU WANT', description: 'Flexible implementation' },
  { number: '07', title: 'ENJOY HORIZONTAL', description: 'Support for horizontal scrolling' },
  { number: '08', title: 'FEEL FREE TO USE', description: 'Open source and free to use' },
];

const Card = ({ card, progress }) => {
  const scale = useTransform(progress, [0, 1], [0.8, 1]);
  const opacity = useTransform(progress, [0, 1], [0.5, 1]);
  const z = useTransform(progress, [0, 1], [-100, 0]);

  const leftTextX = useTransform(progress, [0, 1], [-50, 0]);
  const leftTextOpacity = useTransform(progress, [0, 1], [0, 1]);

  const rightTextX = useTransform(progress, [0, 1], [50, 0]);
  const rightTextOpacity = useTransform(progress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{ scale, opacity, zIndex: z }}
      className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8"
    >
      <div className="flex items-start justify-between">
        <motion.span
          style={{ x: leftTextX, opacity: leftTextOpacity }}
          className="text-8xl font-bold text-pink-500/20"
        >
          {card.number}
        </motion.span>
        <motion.div
          style={{ x: rightTextX, opacity: rightTextOpacity }}
          className="text-right"
        >
          <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
          <p className="text-gray-400">{card.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StackedCards = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="relative min-h-screen bg-black py-20">
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              y: [0, `${Math.random() * 100}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="container mx-auto px-4 min-h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-[60vh]">
            {cards.map((card, i) => {
              const progress = useTransform(
                scrollYProgress,
                [i / cards.length, (i + 1) / cards.length],
                [0, 1]
              );
              return <Card key={i} card={card} progress={progress} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackedCards;
