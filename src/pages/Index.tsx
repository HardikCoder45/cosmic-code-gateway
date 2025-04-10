
import React, { useEffect, useState, lazy, Suspense } from 'react';
import ShaderBackground from '@/components/ShaderBackground';
import CustomCursor from '@/components/CustomCursor';
import QuantumNavigation from '@/components/QuantumNavigation';
import EnhancedHero from '@/components/EnhancedHero';
import QuantumFeatures from '@/components/QuantumFeatures';
import EnhancedRegister from '@/components/EnhancedRegister';
import EnhancedSponsors from '@/components/EnhancedSponsors';
import EnhancedFooter from '@/components/EnhancedFooter';
import ScrollManager from '@/components/ScrollManager';
import { motion } from 'framer-motion';

// Lazy load components that aren't immediately visible
const EnhancedSchedule = lazy(() => import('@/components/EnhancedSchedule'));
const EnhancedFAQ = lazy(() => import('@/components/EnhancedFAQ'));
const EnhancedTestimonials = lazy(() => import('@/components/EnhancedTestimonials'));
const EnhancedContact = lazy(() => import('@/components/EnhancedContact'));
const ImagesGallery = lazy(() => import('@/components/ImagesGallery'));
const ParticleCanvas = lazy(() => import('@/components/ParticleSystem/ParticleCanvas'));
const SocialProof = lazy(() => import('@/components/SocialProof'));
const PrizesShowcase = lazy(() => import('@/components/PrizesShowcase'));
const JudgingCriteria = lazy(() => import('@/components/JudgingCriteria'));
const TeamFormation = lazy(() => import('@/components/TeamFormation'));
const DeveloperResources = lazy(() => import('@/components/DeveloperResources'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="w-8 h-8 border-2 border-cosmic-purple border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  
  useEffect(() => {
    // Optimize the loading animation
    const startLoading = () => {
      let progress = 0;
      const totalDuration = 1500; // Reduced from 2000ms
      const interval = 50; // Update every 50ms instead of 100ms
      const steps = totalDuration / interval;
      const increment = 100 / steps;
      
      const loadingInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
          progress = 100;
          clearInterval(loadingInterval);
          
          // Complete loading after a shorter delay
          setTimeout(() => {
            setIsLoading(false);
            document.body.classList.add('page-loaded');
          }, 100); // Reduced from 200ms
        }
        
        setLoadProgress(Math.min(progress, 100));
      }, interval);
    };
    
    // Start the loading animation
    startLoading();
    
    // Ensure smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Change document title
    document.title = 'Quantum Hackathon Portal';
    
    // Use a more efficient way to add global styles
    if (!document.getElementById('quantum-animations-style')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'quantum-animations-style';
      
      // Optimized animations with reduced complexity
      styleSheet.textContent = `
        @keyframes animate-scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes animate-fade-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes animate-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes animate-slide-in {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes animate-glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(1px, -1px); }
          60% { transform: translate(-1px, 1px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes animate-reveal {
          from { 
            transform: translateY(5px);
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%);
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%);
          }
          to {
            transform: translateY(0);
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 100%, rgba(0,0,0,0) 100%);
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 100%, rgba(0,0,0,0) 100%);
          }
        }
        
        .animate-scale-in { animation: animate-scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-up { animation: animate-fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: animate-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-in { animation: animate-slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-glitch { animation: animate-glitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        .animate-reveal { animation: animate-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        .perspective { perspective: 1000px; }
        
        body { cursor: none; }
        @media (max-width: 768px) { body { cursor: auto; } }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); text-shadow: 0 0 0 #00fffc; }
          10% { transform: translate(-2px, 2px); text-shadow: -1px 0 0 #ff00fc, 1px 0 0 #00fffc; }
          20% { transform: translate(2px, -2px); text-shadow: 1px 0 0 #ff00fc, -1px 0 0 #00fffc; }
        }
        
        .text-glitch:hover { animation: glitch 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        
        .page-loaded .wormhole-container { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .loader-bar {
          height: 4px;
          background: linear-gradient(to right, #9b87f5, #d946ef);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 999;
          transition: width 0.3s ease;
        }
        
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 998;
          transition: opacity 0.4s ease, visibility 0.4s;
        }
        
        .loading-screen.hidden { opacity: 0; visibility: hidden; }
        .loading-text { font-family: monospace; font-size: 1.2rem; color: #9b87f5; margin-top: 1rem; }
        .loading-progress { color: #d946ef; font-family: monospace; font-size: 1rem; margin-top: 0.5rem; }
        .binary-code { position: absolute; font-family: monospace; color: rgba(155, 135, 245, 0.2); pointer-events: none; font-size: 0.7rem; }
        
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `;
      
      document.head.appendChild(styleSheet);
    }
    
    // Create binary code background for loading screen with fewer elements
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      // Clear any existing particles
      const existingParticles = loadingScreen.querySelectorAll('.binary-code');
      existingParticles.forEach(particle => particle.remove());
      
      // Create fewer particles
      const particleCount = 20; // Reduced from 50
      for (let i = 0; i < particleCount; i++) {
        const binary = document.createElement('div');
        binary.classList.add('binary-code');
        binary.style.left = `${Math.random() * 100}%`;
        binary.style.top = `${Math.random() * 100}%`;
        binary.style.opacity = `${Math.random() * 0.5 + 0.1}`;
        
        // Generate random binary/hex code
        let text = '';
        for (let j = 0; j < 8; j++) {
          text += Math.random() > 0.5 ? '1' : '0';
        }
        binary.textContent = text;
        
        loadingScreen.appendChild(binary);
      }
    }
    
    // Performance optimization for event listeners
    const passiveSupported = () => {
      let passive = false;
      try {
        const options = Object.defineProperty({}, 'passive', {
          get: function() {
            passive = true;
            return true;
          }
        });
        window.addEventListener("touchstart", null as any, options);
        window.removeEventListener("touchstart", null as any, options);
      } catch (err) {
        passive = false;
      }
      return passive;
    };
    
    const passive = passiveSupported() ? { passive: true } : false;
    
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      const newOptions = 
        (type === 'touchstart' || type === 'touchmove' || type === 'wheel' || type === 'mousewheel') 
          ? passive 
          : options;
      
      return originalAddEventListener.call(this, type, listener, newOptions);
    };
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      const styleSheet = document.getElementById('quantum-animations-style');
      if (styleSheet) {
        document.head.removeChild(styleSheet);
      }
      EventTarget.prototype.addEventListener = originalAddEventListener;
    };
  }, []);
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Loading screen - optimized */}
      <div className={`loading-screen ${isLoading ? '' : 'hidden'}`}>
        <div className="loader-logo">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#9b87f5" strokeWidth="2" strokeDasharray="283" strokeDashoffset={283 - (283 * loadProgress / 100)} fill="none" />
            <circle cx="50" cy="50" r="30" stroke="#d946ef" strokeWidth="2" strokeDasharray="188.5" strokeDashoffset={188.5 - (188.5 * loadProgress / 100)} fill="none" />
            <circle cx="50" cy="50" r="15" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="94.2" strokeDashoffset={94.2 - (94.2 * loadProgress / 100)} fill="none" />
          </svg>
        </div>
        <div className="loading-text">QUANTUM PORTAL INITIALIZING</div>
        <div className="loading-progress">{Math.round(loadProgress)}%</div>
      </div>
      <div className="loader-bar" style={{ width: `${loadProgress}%` }} />
      
      {/* GLSL shader background */}
      <ShaderBackground />
      
      {/* Custom cursor with interactions */}
      <CustomCursor />
      
      {/* Add scroll animation manager */}
      <ScrollManager />
      
      {/* Interactive particle background - lazy loaded */}
      <div className="fixed inset-0 pointer-events-none">
        <Suspense fallback={null}>
          {!isLoading && <ParticleCanvas />}
        </Suspense>
      </div>
      
      {/* Quantum navigation */}
      <QuantumNavigation />
      
      {/* Main content container */}
      <main id="main-content" className={`wormhole-container ${isLoading ? 'opacity-0' : ''}`}>
        <motion.div 
          className="wormhole-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Enhanced hero section with 3D effects */}
          <EnhancedHero />
          
          {/* Quantum features section with interactive cards */}
          <QuantumFeatures />
          
          {/* Prizes showcase section - lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <PrizesShowcase />
          </Suspense>
          
          {/* Enhanced schedule section with constellation timeline - lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <EnhancedSchedule />
          </Suspense>
          
          {/* Judging criteria section - lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <JudgingCriteria />
          </Suspense>
          
          {/* Team formation section - lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <TeamFormation />
          </Suspense>
          
          {/* Developer resources section - lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <DeveloperResources />
          </Suspense>
          
          {/* Enhanced image gallery - lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <ImagesGallery />
          </Suspense>
          
          {/* Social proof section with testimonials - lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <SocialProof />
          </Suspense>
          
          {/* Enhanced testimonials section - lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <EnhancedTestimonials />
          </Suspense>
          
          {/* Enhanced FAQ section - lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <EnhancedFAQ />
          </Suspense>
          
          {/* Enhanced registration with black hole effect */}
          <EnhancedRegister />
          
          {/* Enhanced sponsors section with interactive cards */}
          <EnhancedSponsors />
          
          {/* Enhanced contact section - lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <EnhancedContact />
          </Suspense>
        </motion.div>
      </main>
      
      {/* Enhanced footer with floating asteroids */}
      <EnhancedFooter />
    </div>
  );
};

export default Index;
