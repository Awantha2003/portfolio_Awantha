import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import StackedCards from './components/StackedCards';
import WhySmooth from './components/WhySmooth';
import AdminPanel from './pages/AdminPanel';

import VideoRoom from './components/VideoChat';

const Home = () => (
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
    <Testimonials />
    <Contact />

    {/* ✅ Call Button for Testing */}
    <div className="text-center my-10">
      <Link to="/video-customer">
        <button className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition">
          Start Video Call (Customer)
        </button>
      </Link>
    </div>
  </motion.div>
);

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
    <Router>
      <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />

          {/* ✅ Video Call Routes */}
          <Route path="/video-customer" element={<VideoRoom role="customer" />} />
          <Route path="/video-admin" element={<VideoRoom role="admin" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
