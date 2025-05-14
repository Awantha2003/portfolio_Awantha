import React, { useRef, useState, useEffect } from 'react';
import { Star, Sparkles, MousePointer, ChevronLeft, ChevronRight } from 'lucide-react';

// Enhanced HighlightText with Light Flare
const HighlightText = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 bg-no-repeat cursor-pointer relative overflow-hidden"
      style={{
        backgroundSize: '200% 100%',
        backgroundPosition: isHovered ? '100% 0' : '0 0',
        transition: 'background-position 0.5s ease, transform 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className="absolute inset-0 bg-white/20 rounded-lg"
        style={{
          animation: isHovered ? 'lightFlare 1.5s ease-in-out' : 'none',
          transformOrigin: 'center',
        }}
      />
      <span
        style={{
          color: isHovered ? '#f472b6' : '#ffffff',
          transition: 'color 0.3s',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {children}
      </span>
      {isHovered && (
        <span className="ml-2 inline-block animate-pulse">
          <Sparkles size={16} className="text-pink-400" />
        </span>
      )}
    </span>
  );
};

// Enhanced PortfolioImage with Oval Portrait View
const PortfolioImage = () => {
  const imageRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const images = [
    { src: '/my1.jpg', caption: 'Project 2: Nebula UI', alt: 'Nebula UI Interface' },
    { src: '/my3.jpg', caption: 'Project 3: Stellar App', alt: 'Stellar Mobile App' },
  ];

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Touch gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const touchEnd = e.targetTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center bg-black">
      <div
        className="relative w-64 h-80 sm:w-72 sm:h-90 md:w-80 md:h-100 lg:w-96 lg:h-120"
        style={{
          clipPath: 'ellipse(50% 60% at 50% 50%)',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}
        ref={imageRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading ? (
          <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
            <span className="text-white/50">Loading...</span>
          </div>
        ) : (
          images.map((image, index) => (
            <div key={index} className="absolute top-0 left-0 w-full h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                style={{
                  opacity: index === currentImage ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
                onError={(e) => (e.target.src = '/placeholder.jpg')}
              />
              <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm"
                style={{
                  opacity: index === currentImage ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
              >
                {image.caption}
              </div>
            </div>
          ))
        )}
        {/* Navigation Buttons */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          onClick={prevImage}
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          onClick={nextImage}
        >
          <ChevronRight size={24} className="text-white" />
        </button>
        {/* Navigation Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-pink-400' : 'bg-white/50'} transition-colors`}
              onClick={() => setCurrentImage(index)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced ParallaxStarfield with More Dynamic Particles
const ParallaxStarfield = () => {
  const starLayers = [
    { count: 80, size: 'w-1 h-1', color: 'bg-white/80', speed: 0.02, depth: 0.3 },
    { count: 50, size: 'w-1.5 h-1.5', color: 'bg-blue-200/70', speed: 0.05, depth: 0.5 },
    { count: 30, size: 'w-2 h-2', color: 'bg-purple-200/60', speed: 0.08, depth: 0.7 },
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    const handleScroll = () => {
      setScrollOffset(window.scrollY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {starLayers.map((layer, layerIndex) => (
        <div key={layerIndex} className="absolute inset-0">
          {[...Array(layer.count)].map((_, i) => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            const offset = scrollOffset * layer.depth * 60;

            return (
              <div
                key={i}
                className={`absolute ${layer.size} ${layer.color} rounded-full blur-sm`}
                style={{
                  left: `${randomX}%`,
                  top: `${randomY}%`,
                  transform: `translate(${mousePosition.x * -40 * layer.speed}px, ${
                    mousePosition.y * -40 * layer.speed + offset
                  }px)`,
                  transition: 'transform 0.1s linear',
                  animation: `enhancedTwinkle ${2 + Math.random() * 3}s ease-in-out infinite ${
                    Math.random() * 1.5
                  }s`,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ScrollGuide with Scroll-Triggered Animation
const ScrollGuide = ({ visible }) => {
  if (!visible) return null;

  return (
    <div
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 animate-slideInLeft"
      style={{ animation: 'fadeUpDown 2.5s ease-in-out infinite, slideInLeft 1s ease-out' }}
    >
      <div className="flex flex-col items-center">
        <MousePointer className="text-white mb-3" size={28} />
        <div className="text-white text-base font-light tracking-wide">Scroll to Explore</div>
      </div>
    </div>
  );
};

// TypewriterTitle with Enhanced Glow
const TypewriterTitle = ({ words }) => {
  const [displayedText, setDisplayedText] = useState(['', '']);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentWord = 0;
    let currentChar = 0;
    const newText = ['', ''];

    const type = () => {
      if (currentWord < words.length) {
        if (currentChar < words[currentWord].length) {
          newText[currentWord] = words[currentWord].slice(0, currentChar + 1);
          setDisplayedText([...newText]);
          currentChar++;
          setTimeout(type, 100);
        } else {
          currentWord++;
          currentChar = 0;
          setTimeout(type, 300);
        }
      } else {
        setIsComplete(true);
      }
    };

    type();
  }, [words]);

  return (
    <div className="mb-8 relative">
      {isComplete && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl"
          style={{ animation: 'pulse 5s ease-in-out infinite' }}
        />
      )}
      <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter relative z-10">
        {words.map((word, index) => (
          <span
            key={index}
            className="block"
            style={{
              animation: isComplete ? `titleGlow${index + 1} 5s ease-in-out infinite ${index * 0.5}s` : 'none',
              opacity: displayedText[index] ? 1 : 0.3,
            }}
          >
            {displayedText[index] || word}
          </span>
        ))}
      </h2>
    </div>
  );
};

// Main Component with Motion Blur on Scroll
const WhySmooth = () => {
  const containerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const totalScrollable = docHeight - windowHeight;
      const progress = scrollTop / totalScrollable;

      setScrollProgress(progress);

      if (scrollTop > windowHeight * 0.05 && !scrolled) {
        setScrolled(true);
        containerRef.current.style.animation = 'motionBlur 0.3s ease-in-out';
        setTimeout(() => {
          containerRef.current.style.animation = '';
        }, 300);
      } else if (scrollTop <= windowHeight * 0.05 && scrolled) {
        setScrolled(false);
        containerRef.current.style.animation = 'motionBlur 0.3s ease-in-out';
        setTimeout(() => {
          containerRef.current.style.animation = '';
        }, 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const opacity = Math.max(0, Math.min(1, scrollProgress < 0.2 ? scrollProgress * 5 : scrollProgress > 0.8 ? (1 - scrollProgress) * 5 : 1));
  const scale = 0.85 + 0.15 * Math.max(0, Math.min(1, scrollProgress < 0.2 ? scrollProgress * 5 : scrollProgress > 0.8 ? (1 - scrollProgress) * 5 : 1));
  const rightContentY = 120 - 240 * scrollProgress;
  const contentParallax = scrollProgress * -50;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(20px) rotate(4deg); }
        75% { transform: translateY(10px) rotate(-4deg); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.25); opacity: 0.8; }
      }
      @keyframes breathe {
        0%, 100% { transform: scale(1.15); opacity: 0.4; }
        50% { transform: scale(0.95); opacity: 0.7; }
      }
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes titleGlow1 {
        0%, 100% { color: #ffffff; text-shadow: 0 0 5px rgba(236, 72, 153, 0); }
        50% { color: #e879f9; text-shadow: 0 0 30px rgba(236, 72, 153, 0.7); }
      }
      @keyframes titleGlow2 {
        0%, 100% { color: #ffffff; text-shadow: 0 0 5px rgba(192, 132, 252, 0); }
        50% { color: #c084fc; text-shadow: 0 0 30px rgba(192, 132, 252, 0.7); }
      }
      @keyframes fadeUpDown {
        0%, 100% { opacity: 0; transform: translate(-50%, 25px); }
        50% { opacity: 1; transform: translate(-50%, 0); }
      }
      @keyframes motionBlur {
        0%, 100% { filter: blur(0px); }
        50% { filter: blur(4px); }
      }
      @keyframes lightFlare {
        0% { transform: translateX(-100%) scale(0.5); opacity: 0; }
        50% { transform: translateX(0) scale(1); opacity: 0.8; }
        100% { transform: translateX(100%) scale(0.5); opacity: 0; }
      }
      @keyframes swirlParticle {
        0% { transform: translate(-50%, -50%) rotate(0deg) translateX(100px); opacity: 0.8; }
        50% { opacity: 0.4; }
        100% { transform: translate(-50%, -50%) rotate(360deg) translateX(100px); opacity: 0.8; }
      }
      @keyframes burstParticle {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0); opacity: 0; }
      }
      @keyframes portalSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes enhancedTwinkle {
        0%, 100% { opacity: 0.3; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.8); }
      }
      @keyframes slideInLeft {
        0% { transform: translateX(-100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideInRight {
        0% { transform: translateX(100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      <div
        className="fixed inset-0 bg-gradient-to-br from-purple-900/15 via-pink-900/15 to-blue-900/15 pointer-events-none"
        style={{ animation: 'gradientShift 15s ease-in-out infinite', opacity: 0.3 + scrollProgress * 0.2 }}
      />
      <ParallaxStarfield />
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>
      <ScrollGuide visible={!scrolled} />
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
        <div
          className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ opacity, transform: `scale(${scale})`, transition: 'opacity 0.4s, transform 0.4s' }}
        >
          <div className="text-center lg:text-left animate-slideInLeft">
            <TypewriterTitle words={['Awantha', 'Imesh']} />
            <PortfolioImage />
          </div>
          <div
            className="space-y-8 text-lg lg:text-xl text-gray-200 backdrop-blur-md bg-black/25 p-8 rounded-xl border border-white/10 shadow-xl animate-slideInRight"
            style={{ transform: `translateY(${rightContentY}px) translateX(${contentParallax}px)`, transition: 'transform 0.4s' }}
          >
            <p>
              We've heard all the reasons to not use smooth scroll.{' '}
              <HighlightText>It feels hacky.</HighlightText>{' '}
              <HighlightText>It's inaccessible.</HighlightText>{' '}
              <HighlightText>It's not performant.</HighlightText>
            </p>
            <p>
              And historically, those were all true. But we like to imagine things as they could be, then build them. So,  should you use smooth scroll?
            </p>
            <p>
              Because when done right, it creates an <HighlightText>immersive experience</HighlightText> that guides users through your content like a well-directed film.
            </p>
            <p>
              It's not just about smooth motion - it's about <HighlightText>crafting moments</HighlightText> and <HighlightText>controlling pace</HighlightText> in your digital story.
            </p>
            <div className="pt-6">
              <button
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-10 rounded-full font-medium flex items-center gap-3 hover:scale-110 active:scale-95 hover:bg-pink-600 transition-all duration-300"
                onClick={() => {
                  // Optional: Add click effect
                }}
              >
                <span>Experience It</span>
                <Sparkles size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySmooth;