
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import ShaderBackground from '@/components/ShaderBackground';
import CustomCursor from '@/components/CustomCursor';
import QuantumNavigation from '@/components/QuantumNavigation';
import EnhancedHero from '@/components/EnhancedHero';
import QuantumFeatures from '@/components/QuantumFeatures';
import EnhancedSchedule from '@/components/EnhancedSchedule';
import EnhancedRegister from '@/components/EnhancedRegister';
import EnhancedSponsors from '@/components/EnhancedSponsors';
import EnhancedFooter from '@/components/EnhancedFooter';
import ScrollManager from '@/components/ScrollManager';
import EnhancedFAQ from '@/components/EnhancedFAQ';
import EnhancedTestimonials from '@/components/EnhancedTestimonials';
import EnhancedContact from '@/components/EnhancedContact';
import ImagesGallery from '@/components/ImagesGallery';
import ParticleCanvas from '@/components/ParticleSystem/ParticleCanvas';
import SocialProof from '@/components/SocialProof';
import PrizesShowcase from '@/components/PrizesShowcase';
import JudgingCriteria from '@/components/JudgingCriteria';
import TeamFormation from '@/components/TeamFormation';
import DeveloperResources from '@/components/DeveloperResources';
import { motion } from 'framer-motion';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  
  useEffect(() => {
    // Optimize the loading animation
    const startLoading = () => {
      let progress = 0;
      const totalDuration = 2000; // 2 seconds total loading time
      const interval = 100; // Update every 100ms
      const steps = totalDuration / interval;
      const increment = 100 / steps;
      
      const loadingInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
          progress = 100;
          clearInterval(loadingInterval);
          
          // Complete loading after a short delay
          setTimeout(() => {
            setIsLoading(false);
            
            // Add entry animation class to body
            document.body.classList.add('page-loaded');
          }, 200);
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
    
    // Add custom CSS for global animations
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes animate-scale-in {
        0% { transform: scale(0.95); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      
      @keyframes animate-fade-up {
        0% { transform: translateY(20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes animate-fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      
      @keyframes animate-slide-in {
        0% { transform: translateX(-50px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes animate-glitch {
        0% {
          clip-path: inset(40% 0 61% 0);
          transform: translate(-2px, 2px);
        }
        20% {
          clip-path: inset(92% 0 1% 0);
          transform: translate(1px, 3px);
        }
        40% {
          clip-path: inset(43% 0 1% 0);
          transform: translate(-1px, -3px);
        }
        60% {
          clip-path: inset(25% 0 58% 0);
          transform: translate(3px, 1px);
        }
        80% {
          clip-path: inset(54% 0 7% 0);
          transform: translate(-3px, -2px);
        }
        100% {
          clip-path: inset(58% 0 43% 0);
          transform: translate(2px, -1px);
        }
      }
      
      @keyframes animate-reveal {
        0% {
          transform: translateY(0) skewY(0);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%);
        }
        30% {
          transform: translateY(5px) skewY(2deg);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 90%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 90%);
        }
        100% {
          transform: translateY(0) skewY(0);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 100%, rgba(0,0,0,0) 100%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 100%, rgba(0,0,0,0) 100%);
        }
      }
      
      .animate-scale-in {
        animation: animate-scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      
      .animate-fade-up {
        animation: animate-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      
      .animate-fade-in {
        animation: animate-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      
      .animate-slide-in {
        animation: animate-slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      
      .animate-glitch {
        animation: animate-glitch 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }
      
      .animate-reveal {
        animation: animate-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      
      .perspective {
        perspective: 1000px;
      }
      
      /* Remove default cursor when custom cursor is active */
      body {
        cursor: none;
      }
      
      /* But keep cursor on mobile devices */
      @media (max-width: 768px) {
        body {
          cursor: auto;
        }
      }
      
      /* Keyframes for text glitching effect */
      @keyframes glitch {
        0% {
          transform: translate(0);
          text-shadow: 0 0 0 #00fffc;
        }
        2% {
          transform: translate(-2px, 2px);
          text-shadow: -1px 0 0 #ff00fc, 1px 0 0 #00fffc;
        }
        4% {
          transform: translate(-2px, -2px);
          text-shadow: 1px 0 0 #ff00fc, -1px 0 0 #00fffc;
        }
        6% {
          transform: translate(2px, 2px);
          text-shadow: -1px 0 0 #ff00fc, 1px 0 0 #00fffc;
        }
        8% {
          transform: translate(2px, -2px);
          text-shadow: 1px 0 0 #ff00fc, -1px 0 0 #00fffc;
        }
        9% {
          transform: translate(0);
          text-shadow: 0 0 0 #00fffc;
        }
        100% {
          transform: translate(0);
          text-shadow: 0 0 0 #00fffc;
        }
      }
      
      .text-glitch:hover {
        animation: glitch 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }
      
      /* Entry animation for the body */
      .page-loaded .wormhole-container {
        animation: fadeIn 1s ease-out forwards;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      /* Loading animation */
      .loader-bar {
        height: 4px;
        background: linear-gradient(to right, #9b87f5, #d946ef);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        transition: width 0.4s ease;
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
        transition: opacity 0.5s ease, visibility 0.5s;
      }
      
      .loading-screen.hidden {
        opacity: 0;
        visibility: hidden;
      }
      
      .loading-text {
        font-family: monospace;
        font-size: 1.2rem;
        color: #9b87f5;
        margin-top: 1rem;
      }
      
      .loading-progress {
        color: #d946ef;
        font-family: monospace;
        font-size: 1rem;
        margin-top: 0.5rem;
      }
      
      /* Binary code background */
      .binary-code {
        position: absolute;
        font-family: monospace;
        color: rgba(155, 135, 245, 0.2);
        pointer-events: none;
        font-size: 0.7rem;
      }
      
      /* Optimize animations */
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
    
    // Create binary code background for loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      for (let i = 0; i < 50; i++) {
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
    
    // Performance optimization: add passive event listeners
    const passiveSupported = () => {
      let passive = false;
      try {
        const options = Object.defineProperty({}, 'passive', {
          get: function() {
            passive = true;
            return true;
          }
        });
        // Use a standard event name instead of "test"
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
      document.head.removeChild(styleSheet);
      EventTarget.prototype.addEventListener = originalAddEventListener;
    };
  }, []);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full overflow-x-hidden">
        {/* Loading screen - optimized */}
        <div className={`loading-screen ${isLoading ? '' : 'hidden'}`}>
          <div className="loader-logo">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#9b87f5" strokeWidth="2" strokeDasharray="283" strokeDashoffset={283 - (283 * loadProgress / 100)} fill="none">
                <animate attributeName="stroke-dashoffset" from="283" to="0" dur="2s" fill="freeze" />
              </circle>
              <circle cx="50" cy="50" r="30" stroke="#d946ef" strokeWidth="2" strokeDasharray="188.5" strokeDashoffset={188.5 - (188.5 * loadProgress / 100)} fill="none">
                <animate attributeName="stroke-dashoffset" from="188.5" to="0" dur="2s" fill="freeze" />
              </circle>
              <circle cx="50" cy="50" r="15" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="94.2" strokeDashoffset={94.2 - (94.2 * loadProgress / 100)} fill="none">
                <animate attributeName="stroke-dashoffset" from="94.2" to="0" dur="2s" fill="freeze" />
              </circle>
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
        
        {/* Interactive particle background */}
        <div className="fixed inset-0 pointer-events-none">
          <ParticleCanvas />
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
            
            {/* Prizes showcase section */}
            <PrizesShowcase />
            
            {/* Enhanced schedule section with constellation timeline */}
            <EnhancedSchedule />
            
            {/* Judging criteria section */}
            <JudgingCriteria />
            
            {/* Team formation section */}
            <TeamFormation />
            
            {/* Developer resources section */}
            <DeveloperResources />
            
            {/* Enhanced image gallery */}
            <ImagesGallery />
            
            {/* Social proof section with testimonials */}
            <SocialProof />
            
            {/* Enhanced testimonials section */}
            <EnhancedTestimonials />
            
            {/* Enhanced FAQ section */}
            <EnhancedFAQ />
            
            {/* Enhanced registration with black hole effect */}
            <EnhancedRegister />
            
            {/* Enhanced sponsors section with interactive cards */}
            <EnhancedSponsors />
            
            {/* Enhanced contact section */}
            <EnhancedContact />
          </motion.div>
        </main>
        
        {/* Enhanced footer with floating asteroids */}
        <EnhancedFooter />
      </div>
    </ThemeProvider>
  );
};

export default Index;
