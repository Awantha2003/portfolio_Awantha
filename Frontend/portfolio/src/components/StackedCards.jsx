import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code, Zap, Sparkles, Palette, MousePointer, Puzzle, ArrowRight, Gift, Check, Eye, ArrowDown } from 'lucide-react';
import Lenis from '@studio-freight/lenis';

// Card data with unique images
const cards = [
  {
    number: '01',
    title: 'RUN THE CODE',
    description: 'Start your journey with smooth scrolling',
    icon: <Code className="w-8 h-8 text-pink-500" strokeWidth={1.5} />,
    color: 'from-pink-500/30 to-purple-600/30',
    textColor: 'text-pink-400',
    accentColor: '#ec4899',
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
  },
  {
    number: '02',
    title: 'LIGHT WEIGHT',
    description: 'Optimized for performance',
    icon: <Zap className="w-8 h-8 text-yellow-500" strokeWidth={1.5} />,
    color: 'from-yellow-500/30 to-amber-600/30',
    textColor: 'text-yellow-400',
    accentColor: '#facc15',
    imageUrl: "https://images.unsplash.com/photo-1507238691740-9038a40d22db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
  },
  {
    number: '03',
    title: 'MADE WITH LOVE',
    description: 'Crafted with attention to detail',
    icon: <Sparkles className="w-8 h-8 text-blue-500" strokeWidth={1.5} />,
    color: 'from-blue-500/30 to-indigo-600/30',
    textColor: 'text-blue-400',
    accentColor: '#3b82f6',
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
  },
  {
    number: '04',
    title: 'BRING YOUR OWN',
    description: 'Customizable and extensible',
    icon: <Palette className="w-8 h-8 text-green-500" strokeWidth={1.5} />,
    color: 'from-green-500/30 to-emerald-600/30',
    textColor: 'text-green-400',
    accentColor: '#22c55e',
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
  },
  {
    number: '05',
    title: 'CONTROL SCROLL',
    description: 'Full control over scrolling behavior',
    icon: <MousePointer className="w-8 h-8 text-red-500" strokeWidth={1.5} />,
    color: 'from-red-500/30 to-rose-600/30',
    textColor: 'text-red-400',
    accentColor: '#ef4444',
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
  },
  {
    number: '06',
    title: 'USE AS YOU WANT',
    description: 'Flexible implementation',
    icon: <Puzzle className="w-8 h-8 text-purple-500" strokeWidth={1.5} />,
    color: 'from-purple-500/30 to-fuchsia-600/30',
    textColor: 'text-purple-400',
    accentColor: '#a855f7',
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
  },
  {
    number: '07',
    title: 'ENJOY HORIZONTAL',
    description: 'Support for horizontal scrolling',
    icon: <ArrowRight className="w-8 h-8 text-cyan-500" strokeWidth={1.5} />,
    color: 'from-cyan-500/30 to-sky-600/30',
    textColor: 'text-cyan-400',
    accentColor: '#06b6d4',
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
  },
  {
    number: '08',
    title: 'FEEL FREE TO USE',
    description: 'Open source and free to use',
    icon: <Gift className="w-8 h-8 text-orange-500" strokeWidth={1.5} />,
    color: 'from-orange-500/30 to-amber-600/30',
    textColor: 'text-orange-400',
    accentColor: '#f97316',
    imageUrl: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
  }
];

// Feature highlights for Section 2
const features = [
  {
    title: "Immersive Experience",
    description: "Guides users through your content like a well-directed film.",
    icon: <Sparkles className="w-10 h-10 text-blue-400" strokeWidth={1.5} />,
    color: 'from-blue-500/30 to-indigo-600/30',
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
  },
  {
    title: "Controlled Pacing",
    description: "Craft moments and control the scroll speed effortlessly.",
    icon: <MousePointer className="w-10 h-10 text-red-400" strokeWidth={1.5} />,
    color: 'from-red-500/30 to-rose-600/30',
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
  },
  {
    title: "Performance Optimized",
    description: "Smooth scrolling without sacrificing performance.",
    icon: <Zap className="w-10 h-10 text-yellow-400" strokeWidth={1.5} />,
    color: 'from-yellow-500/30 to-amber-600/30',
    imageUrl: "https://images.unsplash.com/photo-1507238691740-9038a40d22db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
  }
];

// GeometricSVG, Particle, Card, and FeatureCard components remain unchanged
const GeometricSVG = ({ color, isActive }) => {
  const svgRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const rotateX = ((clientY / windowHeight) - 0.5) * 30;
      const rotateY = ((clientX / windowWidth) - 0.5) * -30;

      setRotation({ x: rotateX, y: rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  return (
    <motion.div
      className="absolute top-0 right-0 w-48 h-48 opacity-70 pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isActive ? 0.7 : 0,
        scale: isActive ? 1 : 0.8,
        rotateX: rotation.x,
        rotateY: rotation.y
      }}
      transition={{ duration: 0.3 }}
    >
      <svg ref={svgRef} viewBox="0 0 100 100" className="w-full h-full">
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="3 2" />
          <motion.polygon
            points="50,20 20,70 80,70"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.rect
            x="30"
            y="30"
            width="40"
            height="40"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeDasharray="1 1"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="50" cy="20" r="1" fill={color} />
          <circle cx="20" cy="70" r="1" fill={color} />
          <circle cx="80" cy="70" r="1" fill={color} />
          <circle cx="30" cy="30" r="1" fill={color} />
          <circle cx="70" cy="30" r="1" fill={color} />
          <circle cx="30" cy="70" r="1" fill={color} />
          <circle cx="70" cy="70" r="1" fill={color} />
        </motion.g>
      </svg>
    </motion.div>
  );
};

const Particle = ({ delay = 0, type = 'circle' }) => {
  const size = Math.random() * 3 + 1;
  const duration = Math.random() * 10 + 10;
  const initialX = `${Math.random() * 100}%`;
  const initialY = `${Math.random() * 100}%`;

  let particleElement;

  switch (type) {
    case 'square':
      particleElement = <div className="w-full h-full bg-white rotate-45" />;
      break;
    case 'triangle':
      particleElement = (
        <div
          className="w-0 h-0 border-solid"
          style={{
            borderWidth: `0 ${size / 2}px ${size}px ${size / 2}px`,
            borderColor: 'transparent transparent white transparent'
          }}
        />
      );
      break;
    case 'star':
      particleElement = (
        <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
          <path d="M12 1l3.09 6.26L22 8.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 13.14 2 8.27l6.91-1.01L12 1z" />
        </svg>
      );
      break;
    default:
      particleElement = <div className="w-full h-full bg-white rounded-full" />;
  }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        opacity: Math.random() * 0.5 + 0.2
      }}
      animate={{
        y: [`0%`, `${Math.random() * 100}%`],
        x: [`0%`, `${(Math.random() - 0.5) * 20}%`],
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0.5],
        rotate: [0, Math.random() * 360]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear'
      }}
    >
      {particleElement}
    </motion.div>
  );
};

const Card = React.memo(({ card, progress, isActive, index, totalCards, isHorizontal }) => {
  const scale = useTransform(progress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(progress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const blur = useTransform(progress, [0, 0.5, 1], [2, 0, 2]);
  const y = useTransform(progress, [0, 0.5, 1], [50, 0, -50]);
  const x = isHorizontal ? useTransform(progress, [0, 0.5, 1], [50, 0, -50]) : 0;
  const rotateX = useTransform(progress, [0, 0.5, 1], [5, 0, -5]);
  const zIndex = useTransform(progress, [0, 0.5, 1], [totalCards - index, totalCards + index, totalCards - index]);

  const leftTextX = useTransform(progress, [0, 0.5, 1], [-70, 0, 70]);
  const leftTextOpacity = useTransform(progress, [0, 0.5, 1], [0, 1, 0]);
  const leftTextScale = useTransform(progress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const rightTextX = useTransform(progress, [0, 0.5, 1], [70, 0, -70]);
  const rightTextOpacity = useTransform(progress, [0, 0.5, 1], [0, 1, 0]);

  const iconOpacity = useTransform(progress, [0, 0.5, 1], [0, 1, 0]);
  const iconScale = useTransform(progress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const iconRotate = useTransform(progress, [0, 0.5, 1], [-20, 0, 20]);

  const imageY = useTransform(progress, [0, 0.5, 1], [30, 0, -30]);
  const imageOpacity = useTransform(progress, [0, 0.5, 1], [0, 1, 0]);
  const imageScale = useTransform(progress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });

    if (cardRef.current) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 5;
      const rotateX = ((centerY - y) / centerY) * 5;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  }, [isActive]);

  const resetTilt = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.5s ease';
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transition = '';
      }, 500);
    }
    setHovered(false);
  }, []);

  return (
    <motion.div
      role="region"
      aria-label={`Card ${index + 1}: ${card.title}`}
      tabIndex={isActive ? 0 : -1}
      style={{
        scale,
        opacity,
        y,
        x,
        rotateX,
        filter: `blur(${blur.get()}px)`,
        zIndex
      }}
      className="absolute inset-0 bg-gray-900/80 backdrop-blur-md rounded-xl overflow-hidden shadow-xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
      onFocus={handleMouseMove}
      onBlur={resetTilt}
      ref={cardRef}
    >
      <motion.div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.color}`}
        style={{ opacity: useTransform(progress, [0, 0.5, 1], [0.1, 0.7, 0.1]) }}
      />
      <GeometricSVG color={card.accentColor} isActive={isActive} />
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
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)]" style={{ backgroundSize: '24px 24px' }} />
      </div>
      <div className="relative flex flex-col h-full p-8">
        <div className="flex items-start justify-between">
          <motion.div
            style={{ x: leftTextX, opacity: leftTextOpacity, scale: leftTextScale }}
            className="relative"
          >
            <span className={`text-8xl font-bold opacity-20 ${card.textColor}`}>
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
            <h3 className={`text-2xl font-bold mb-2 ${card.textColor}`}>{card.title}</h3>
            <p className="text-gray-400">{card.description}</p>
          </motion.div>
        </div>
        <motion.div
          className="mt-6 w-full h-40 rounded-lg overflow-hidden"
          style={{ y: imageY, opacity: imageOpacity, scale: imageScale }}
        >
          <img
            src={card.imageUrl}
            alt={`Illustration for ${card.title}`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {isActive && (
          <motion.div
            className="mt-auto flex justify-between items-end pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-r ${card.color}`}
                whileHover={{ scale: 1.2 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
              <span className="text-sm text-gray-400">Available now</span>
            </motion.div>
            <motion.button
              className={`px-4 py-2 rounded-lg bg-gradient-to-r ${card.color} text-white flex items-center gap-2 text-sm font-medium`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore {card.title.toLowerCase()}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
      {isActive && (
        <AnimatePresence>
          <motion.div
            className="absolute top-6 right-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <Eye className={`w-3 h-3 ${card.textColor}`} />
              <span className="text-xs text-gray-300">Preview</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.5 }}
          style={{ boxShadow: `0 0 30px ${card.accentColor}` }}
        />
      )}
    </motion.div>
  );
});

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      role="region"
      aria-label={`Feature ${index + 1}: ${feature.title}`}
      tabIndex={0}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2, type: 'spring', stiffness: 100 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-gray-900/80 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center shadow-lg"
    >
      <motion.div
        className={`p-4 rounded-full bg-gradient-to-br ${feature.color} mb-4`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 150 }}
      >
        {feature.icon}
      </motion.div>
      <motion.div
        className="w-full h-40 rounded-lg overflow-hidden mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <img
          src={feature.imageUrl}
          alt={`Illustration for ${feature.title}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
      <p className="text-gray-400">{feature.description}</p>
    </motion.div>
  );
};

const StackedCards = () => {
  const containerRef = useRef(null);
  const [activeIndexVertical, setActiveIndexVertical] = useState(0);
  const [activeIndexHorizontal, setActiveIndexHorizontal] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const verticalProgress = useTransform(scrollYProgress, [0, 1], [0, cards.length / 2]);
  const horizontalProgress = useTransform(scrollYProgress, [0, 1], [0, cards.length / 2]);

  useEffect(() => {
    const unsubscribeVertical = verticalProgress.onChange(value => {
      const newIndex = Math.floor(value);
      setActiveIndexVertical(Math.min(newIndex, Math.floor(cards.length / 2) - 1));
    });
    const unsubscribeHorizontal = horizontalProgress.onChange(value => {
      const newIndex = Math.floor(value);
      setActiveIndexHorizontal(Math.min(newIndex + Math.floor(cards.length / 2), cards.length - 1));
    });
    return () => {
      unsubscribeVertical();
      unsubscribeHorizontal();
    };
  }, [verticalProgress, horizontalProgress]);

  const titleX = useTransform(scrollYProgress, [0, 0.1], [-100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.1], [20, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0.5, 1]);

  const particleTypes = ['circle', 'square', 'triangle', 'star'];
  const particles = [...Array(40)].map((_, i) => ({
    key: i,
    delay: i * 0.05,
    type: particleTypes[i % particleTypes.length]
  }));

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical', // Vertical for the main scroll
    });

    const lenisHorizontal = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'horizontal', // Horizontal for the right section
    });

    function raf(time) {
      lenis.raf(time);
      lenisHorizontal.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisHorizontal.destroy();
    };
  }, []);

  return (
    <div className="relative text-white overflow-hidden">
      <style>
        {`
          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
            50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
            100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
          }
          .neon-glow {
            animation: glow 2s infinite ease-in-out;
          }
          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }
          @keyframes blink {
            50% { border-color: transparent; }
          }
          .typewriter {
            overflow: hidden;
            white-space: nowrap;
            animation: typewriter 3s steps(40) 1s 1 normal both,
                      blink 0.75s step-end infinite;
            border-right: 2x solid white;
          }
          @keyframes trail {
            0% { opacity: 0.5; transform: scale(0.5); }
            100% { opacity: 0; transform: scale(1.5); }
          }
          .trail {
            animation: trail 0.5s ease-out forwards;
          }
        `}
      </style>

      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <Particle key={particle.key} delay={particle.delay} type={particle.type} />
        ))}
      </div>

      <section className="relative min-h-screen bg-black py-20">
        <motion.div className="container mx-auto px-4 mb-12">
          <div className="max-w-xl">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent typewriter"
              style={{ x: titleX, opacity: titleOpacity }}
            >
              LENIS BRINGS THE HEAT
            </motion.h1>
            <motion.p
              className="text-gray-400 text-lg"
              style={{ y: subtitleY, opacity: subtitleOpacity }}
            >
              Explore our collection of innovative scroll animations
            </motion.p>
          </div>
        </motion.div>

        <div ref={containerRef} className="container mx-auto px-4 min-h-[300vh] flex">
          <div className="w-1/2 h-screen sticky top-0 flex items-center">
            <div className="relative w-full h-[60vh]">
              {cards.slice(0, Math.floor(cards.length / 2)).map((card, i) => {
                const cardProgress = useTransform(
                  scrollYProgress,
                  [i / (cards.length / 2), (i + 1) / (cards.length / 2)],
                  [0, 1]
                );
                return (
                  <Card
                    key={i}
                    card={card}
                    progress={cardProgress}
                    isActive={i === activeIndexVertical}
                    index={i}
                    totalCards={Math.floor(cards.length / 2)}
                    isHorizontal={false}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-1/2 h-screen sticky top-0 flex items-center">
            <div className="relative w-full h-[60vh] flex items-center">
              {cards.slice(Math.floor(cards.length / 2)).map((card, i) => {
                const cardProgress = useTransform(
                  scrollYProgress,
                  [i / (cards.length / 2), (i + 1) / (cards.length / 2)],
                  [0, 1]
                );
                return (
                  <Card
                    key={i}
                    card={card}
                    progress={cardProgress}
                    isActive={i === activeIndexHorizontal - Math.floor(cards.length / 2)}
                    index={i}
                    totalCards={Math.floor(cards.length / 2)}
                    isHorizontal={true}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2 items-center px-4 py-2 bg-black/50 backdrop-blur-md rounded-full">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                className="relative w-3 h-3"
                animate={{
                  scale: i === activeIndexVertical || i === activeIndexHorizontal ? 1.5 : 1,
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: (i === activeIndexVertical || i === activeIndexHorizontal) ? card.accentColor : '#ffffff' }}
                  animate={{
                    opacity: (i === activeIndexVertical || i === activeIndexHorizontal) ? 1 : 0.3,
                  }}
                />
                {(i === activeIndexVertical || i === activeIndexHorizontal) && (
                  <motion.div
                    className="absolute inset-0 rounded-full trail"
                    style={{ backgroundColor: card.accentColor }}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </section>

      <section className="relative min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Why Use Smooth Scroll?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center py-20 bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Ready to Experience Lenis?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Transform your website with smooth, cinematic scrolling. Lenis is free, open-source, and easy to integrate.
          </p>
          <motion.button
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-medium flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started with Lenis
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      <footer className="py-4 text-center text-gray-500 text-sm bg-black">
        <p>
          Images by{' '}
          <a href="https://unsplash.com" className="underline">
            Unsplash
          </a>
        </p>
      </footer>
    </div>
  );
};

export default StackedCards;