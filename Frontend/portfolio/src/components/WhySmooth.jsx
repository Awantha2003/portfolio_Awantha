import React, { useRef, useState, useEffect } from 'react';
import { Star, Sparkles, MousePointer, Zap } from 'lucide-react';

// Enhanced text highlight with animated gradient background
const HighlightText = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <span
      className="inline-block px-2 py-1 rounded-md bg-gradient-to-r from-purple-500/20 to-pink-500/20 bg-no-repeat cursor-pointer"
      style={{ 
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0',
        transition: 'transform 0.3s ease-out'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          color: isHovered ? '#ec4899' : '#ffffff',
          transition: 'color 0.3s'
        }}
      >
        {children}
      </span>
      {isHovered && (
        <span className="ml-1 inline-block">
          <Sparkles size={14} className="text-pink-400" />
        </span>
      )}
    </span>
  );
};

// Floating Hand Component
const FloatingHand = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="relative w-64 h-64 md:w-80 md:h-80"
        style={{
          animation: 'float 6s ease-in-out infinite'
        }}
      >
        {/* Shadow Effect */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-2xl"
          style={{
            animation: 'pulse 8s ease-in-out infinite'
          }}
        />
        
        {/* Secondary glow */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-xl"
          style={{
            animation: 'breathe 4s ease-in-out infinite 0.5s'
          }}
        />
        
        {/* 3D Hand */}
        <div
          className="relative z-10 w-full h-full"
          style={{ 
            perspective: '1500px',
            animation: 'rotate3D 8s ease-in-out infinite'
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white">
              <Zap size={80} />
            </div>
          </div>
        </div>
        
        {/* Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2"
            style={{
              animation: `particle${i % 3} ${3 + i % 2}s ease-in-out infinite ${i * 0.2}s`
            }}
          >
            <Star size={i % 3 === 0 ? 16 : 12} className="text-pink-400" fill="currentColor" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Parallax Starfield Background
const ParallaxStarfield = () => {
  const starLayers = [
    { count: 50, size: 'w-1 h-1', color: 'bg-white', speed: 0.02 },
    { count: 30, size: 'w-1.5 h-1.5', color: 'bg-blue-200', speed: 0.05 },
    { count: 20, size: 'w-2 h-2', color: 'bg-purple-200', speed: 0.08 },
  ];
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {starLayers.map((layer, layerIndex) => (
        <div key={layerIndex} className="absolute inset-0">
          {[...Array(layer.count)].map((_, i) => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            
            return (
              <div
                key={i}
                className={`absolute ${layer.size} ${layer.color} rounded-full blur-sm`}
                style={{
                  left: `${randomX}%`,
                  top: `${randomY}%`,
                  transform: `translate(${mousePosition.x * -20 * layer.speed}px, ${mousePosition.y * -20 * layer.speed}px)`,
                  transition: 'transform 0.1s linear',
                  animation: `twinkle ${3 + Math.random() * 5}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Scroll Guide Animation
const ScrollGuide = ({ visible }) => {
  if (!visible) return null;
  
  return (
    <div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      style={{
        animation: 'fadeUpDown 2s ease-in-out infinite'
      }}
    >
      <div className="flex flex-col items-center">
        <MousePointer className="text-white mb-2" size={24} />
        <div className="text-white text-sm font-light">Scroll to explore</div>
      </div>
    </div>
  );
};

// Main Component
const EnhancedSmoothScroll = () => {
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
      } else if (scrollTop <= windowHeight * 0.05 && scrolled) {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Calculate transforms based on scroll
  const opacity = Math.max(0, Math.min(1, 
    scrollProgress < 0.2 ? scrollProgress * 5 : 
    scrollProgress > 0.8 ? (1 - scrollProgress) * 5 : 1
  ));
  
  const scale = 0.9 + (0.1 * Math.max(0, Math.min(1, 
    scrollProgress < 0.2 ? scrollProgress * 5 : 
    scrollProgress > 0.8 ? (1 - scrollProgress) * 5 : 1
  )));
  
  const titleRotate = -5 + (10 * scrollProgress);
  const rightContentY = 100 - (200 * scrollProgress);

  // Add keyframe animations to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(15px) rotate(5deg); }
        75% { transform: translateY(5px) rotate(-5deg); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.4; }
        50% { transform: scale(1.2); opacity: 0.7; }
      }
      @keyframes breathe {
        0%, 100% { transform: scale(1.1); opacity: 0.3; }
        50% { transform: scale(0.9); opacity: 0.6; }
      }
      @keyframes rotate3D {
        0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
        25% { transform: rotateY(15deg) rotateX(5deg); }
        50% { transform: rotateY(0deg) rotateX(0deg); }
        75% { transform: rotateY(-15deg) rotateX(-5deg); }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
      }
      @keyframes particle0 {
        0%, 100% { transform: translate(0, 0); opacity: 0.7; }
        50% { transform: translate(80px, 0); opacity: 1; }
      }
      @keyframes particle1 {
        0%, 100% { transform: translate(0, 0); opacity: 0.7; }
        50% { transform: translate(-40px, 70px); opacity: 1; }
      }
      @keyframes particle2 {
        0%, 100% { transform: translate(0, 0); opacity: 0.7; }
        50% { transform: translate(60px, -60px); opacity: 1; }
      }
      @keyframes fadeUpDown {
        0%, 100% { opacity: 0; transform: translate(-50%, 20px); }
        50% { opacity: 1; transform: translate(-50%, 0); }
        100% { opacity: 0; transform: translate(-50%, -20px); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background effects */}
      <ParallaxStarfield />
      
      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40" />
      </div>

      {/* Dynamic color accent */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10 pointer-events-none"
        style={{
          opacity: Math.max(0, 0.2 - Math.abs(scrollProgress - 0.5) * 0.4)
        }}
      />

      {/* Scroll guide */}
      <ScrollGuide visible={!scrolled} />

      {/* Main content */}
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
        <div
          className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{
            opacity,
            transform: `scale(${scale})`,
            transition: 'opacity 0.3s, transform 0.3s'
          }}
        >
          {/* Left side - Title */}
          <div className="text-center lg:text-left">
            <div
              className="mb-6"
              style={{
                transform: `rotateZ(${titleRotate}deg)`,
                transition: 'transform 0.3s'
              }}
            >
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-2">
                <span 
                  className="block"
                  style={{
                    animation: 'titleGlow1 5s ease-in-out infinite',
                  }}
                >
                  WHY
                </span>
                <span 
                  className="block"
                  style={{
                    animation: 'titleGlow2 5s ease-in-out infinite 0.5s',
                  }}
                >
                  SMOOTH
                </span>
                <span 
                  className="block"
                  style={{
                    animation: 'titleGlow3 5s ease-in-out infinite 1s',
                  }}
                >
                  SCROLL?
                </span>
              </h2>
            </div>
            
            {/* Floating hand */}
            <FloatingHand />
          </div>

          {/* Right side - Text content */}
          <div 
            className="space-y-8 text-lg lg:text-xl text-gray-200 backdrop-blur-sm bg-black/20 p-6 rounded-lg border border-white/10"
            style={{
              transform: `translateY(${rightContentY}px)`,
              transition: 'transform 0.3s'
            }}
          >
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
            
            <div className="pt-4">
              <button
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-8 rounded-full font-medium flex items-center gap-2 hover:scale-105 active:scale-95 hover:bg-pink-600 transition-all duration-200"
              >
                <span>Experience It</span>
                <Sparkles size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes titleGlow1 {
          0%, 100% { color: #ffffff; text-shadow: 0 0 5px rgba(236, 72, 153, 0); }
          50% { color: #e879f9; text-shadow: 0 0 20px rgba(236, 72, 153, 0.5); }
        }
        @keyframes titleGlow2 {
          0%, 100% { color: #ffffff; text-shadow: 0 0 5px rgba(192, 132, 252, 0); }
          50% { color: #c084fc; text-shadow: 0 0 20px rgba(192, 132, 252, 0.5); }
        }
        @keyframes titleGlow3 {
          0%, 100% { color: #ffffff; text-shadow: 0 0 5px rgba(244, 114, 182, 0); }
          50% { color: #f472b6; text-shadow: 0 0 20px rgba(244, 114, 182, 0.5); }
        }
      `}</style>
    </section>
  );
};

export default EnhancedSmoothScroll;