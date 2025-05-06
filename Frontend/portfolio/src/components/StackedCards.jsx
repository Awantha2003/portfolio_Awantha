import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Code, Zap, Palette, MousePointer, Puzzle, ArrowRight, Gift } from 'lucide-react';

const cards = [
  { 
    number: '01', 
    title: 'RUN THE CODE', 
    description: 'Start your journey with smooth scrolling',
    icon: <Code className="w-8 h-8 text-pink-500" strokeWidth={1.5} />,
    color: 'from-pink-500/30 to-purple-600/30',
    highlightColor: 'text-pink-400'
  },
  { 
    number: '02', 
    title: 'LIGHT WEIGHT', 
    description: 'Optimized for performance',
    icon: <Zap className="w-8 h-8 text-yellow-500" strokeWidth={1.5} />,
    color: 'from-yellow-500/30 to-amber-600/30',
    highlightColor: 'text-yellow-400'
  },
  { 
    number: '03', 
    title: 'MADE WITH LOVE', 
    description: 'Crafted with attention to detail',
    icon: <Sparkles className="w-8 h-8 text-blue-500" strokeWidth={1.5} />,
    color: 'from-blue-500/30 to-indigo-600/30',
    highlightColor: 'text-blue-400'
  },
  { 
    number: '04', 
    title: 'BRING YOUR OWN', 
    description: 'Customizable and extensible',
    icon: <Palette className="w-8 h-8 text-green-500" strokeWidth={1.5} />,
    color: 'from-green-500/30 to-emerald-600/30',
    highlightColor: 'text-green-400'
  },
  { 
    number: '05', 
    title: 'CONTROL SCROLL', 
    description: 'Full control over scrolling behavior',
    icon: <MousePointer className="w-8 h-8 text-red-500" strokeWidth={1.5} />,
    color: 'from-red-500/30 to-rose-600/30',
    highlightColor: 'text-red-400'
  },
  { 
    number: '06', 
    title: 'USE AS YOU WANT', 
    description: 'Flexible implementation',
    icon: <Puzzle className="w-8 h-8 text-purple-500" strokeWidth={1.5} />,
    color: 'from-purple-500/30 to-fuchsia-600/30',
    highlightColor: 'text-purple-400'
  },
  { 
    number: '07', 
    title: 'ENJOY HORIZONTAL', 
    description: 'Support for horizontal scrolling',
    icon: <ArrowRight className="w-8 h-8 text-cyan-500" strokeWidth={1.5} />,
    color: 'from-cyan-500/30 to-sky-600/30',
    highlightColor: 'text-cyan-400'
  },
  { 
    number: '08', 
    title: 'FEEL FREE TO USE', 
    description: 'Open source and free to use',
    icon: <Gift className="w-8 h-8 text-orange-500" strokeWidth={1.5} />,
    color: 'from-orange-500/30 to-amber-600/30',
    highlightColor: 'text-orange-400'
  },
];

const Card = ({ card, progress, isActive }) => {
  const scale = useTransform(progress, [0, 0.5, 1], [0.8, 0.9, 1]);
  const opacity = useTransform(progress, [0, 0.7, 1], [0.3, 0.7, 1]);
  const blur = useTransform(progress, [0, 1], [3, 0]);
  const y = useTransform(progress, [0, 1], [40, 0]);
  const rotateX = useTransform(progress, [0, 1], [5, 0]);
  const z = useTransform(progress, [0, 1], [-100, 0]);

  const leftTextX = useTransform(progress, [0, 1], [-70, 0]);
  const leftTextOpacity = useTransform(progress, [0, 0.8, 1], [0, 0.5, 1]);
  const leftTextScale = useTransform(progress, [0, 1], [0.9, 1]);

  const rightTextX = useTransform(progress, [0, 1], [70, 0]);
  const rightTextOpacity = useTransform(progress, [0, 0.8, 1], [0, 0.5, 1]);
  
  const iconOpacity = useTransform(progress, [0, 0.9, 1], [0, 0.7, 1]);
  const iconScale = useTransform(progress, [0, 1], [0.5, 1]);
  const iconRotate = useTransform(progress, [0, 1], [-20, 0]);

  const borderOpacity = useTransform(progress, [0, 1], [0.1, 0.7]);
  const glowOpacity = useTransform(progress, [0, 1], [0, 0.15]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      style={{ 
        scale, 
        opacity, 
        y,
        rotateX,
        filter: `blur(${blur.get()}px)`,
        zIndex: z
      }}
      className={`absolute inset-0 bg-gray-900/80 backdrop-blur-md rounded-xl overflow-hidden shadow-xl
                 transition-colors duration-300`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient border */}
      <motion.div 
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.color}`}
        style={{ opacity: borderOpacity }}
      />

      {/* Moving glow effect on hover */}
      {isActive && hovered && (
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-white/20 blur-xl pointer-events-none"
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          transition={{ type: "spring", damping: 10 }}
        />
      )}

      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)]" style={{ backgroundSize: '24px 24px' }} />
      </div>

      {/* Card content */}
      <div className="relative flex flex-col h-full p-8">
        <div className="flex items-start justify-between">
          <motion.div
            style={{ x: leftTextX, opacity: leftTextOpacity, scale: leftTextScale }}
            className="relative"
          >
            <span className={`text-8xl font-bold opacity-20 ${card.highlightColor}`}>
              {card.number}
            </span>
            <motion.div 
              className="absolute -top-2 -left-2"
              style={{ opacity: iconOpacity, scale: iconScale, rotate: iconRotate }}
            >
              {card.icon}
            </motion.div>
          </motion.div>
          
          <motion.div
            style={{ x: rightTextX, opacity: rightTextOpacity }}
            className="text-right"
          >
            <h3 className={`text-2xl font-bold mb-2 ${card.highlightColor}`}>{card.title}</h3>
            <p className="text-gray-400">{card.description}</p>
          </motion.div>
        </div>

        {isActive && (
          <motion.div 
            className="mt-auto" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button 
              className={`px-4 py-2 rounded-lg bg-gradient-to-r ${card.color} text-white
                        flex items-center gap-2 text-sm font-medium hover:scale-105 transition-transform`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore {card.title.toLowerCase()}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Particle = ({ delay = 0 }) => {
  const size = Math.random() * 3 + 1;
  const duration = Math.random() * 10 + 10;
  const initialX = `${Math.random() * 100}%`;
  const initialY = `${Math.random() * 100}%`;
  
  return (
    <motion.div
      className="absolute bg-white rounded-full pointer-events-none"
      style={{ 
        width: size, 
        height: size,
        left: initialX,
        top: initialY,
        opacity: Math.random() * 0.5 + 0.2
      }}
      animate={{
        y: [`0%`, `${Math.random() * 100}%`],
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0.5]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear'
      }}
    />
  );
};

const StackedCards = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const progress = useTransform(scrollYProgress, [0, 1], [0, cards.length - 1]);
  
  useEffect(() => {
    const unsubscribe = progress.onChange(value => {
      setActiveIndex(Math.round(value));
    });
    
    return () => unsubscribe();
  }, [progress]);

  const titleX = useTransform(scrollYProgress, [0, 0.1], [-100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section className="relative min-h-screen bg-black text-white py-20 overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <Particle key={i} delay={i * 0.05} />
        ))}
      </div>
      
      {/* Header */}
      <motion.div 
        className="container mx-auto px-4 mb-12"
        style={{ x: titleX, opacity: titleOpacity }}
      >
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Scroll-Driven Experiences
          </h1>
          <p className="text-gray-400 text-lg">
            Explore our collection of innovative scroll animations and interactions
          </p>
        </div>
      </motion.div>

      <div ref={containerRef} className="container mx-auto px-4 min-h-[300vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-[60vh]">
            {cards.map((card, i) => {
              const cardProgress = useTransform(
                scrollYProgress,
                [i / cards.length, (i + 1) / cards.length],
                [0, 1]
              );
              return (
                <Card 
                  key={i} 
                  card={card} 
                  progress={cardProgress} 
                  isActive={i === activeIndex}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {cards.map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-white"
              animate={{
                scale: i === activeIndex ? 1.5 : 1,
                opacity: i === activeIndex ? 1 : 0.3,
                backgroundColor: i === activeIndex ? cards[i].highlightColor.split('-')[1] : '#ffffff'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackedCards;