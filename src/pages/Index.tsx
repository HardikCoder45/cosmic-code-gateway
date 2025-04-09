
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import ShaderBackground from '@/components/ShaderBackground';
import CustomCursor from '@/components/CustomCursor';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import EnhancedHero from '@/components/EnhancedHero';
import EnhancedFeatures from '@/components/EnhancedFeatures';
import EnhancedSchedule from '@/components/EnhancedSchedule';
import EnhancedRegister from '@/components/EnhancedRegister';
import EnhancedSponsors from '@/components/EnhancedSponsors';
import EnhancedFooter from '@/components/EnhancedFooter';
import ScrollManager from '@/components/ScrollManager';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  
  useEffect(() => {
    // Create loading animation
    const startLoading = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) {
          progress = 100;
          clearInterval(interval);
          
          // Complete loading after a short delay
          setTimeout(() => {
            setIsLoading(false);
            
            // Add entry animation class to body
            document.body.classList.add('page-loaded');
          }, 500);
        }
        setLoadProgress(Math.min(progress, 100));
      }, 150);
    };
    
    // Start the loading animation
    startLoading();
    
    // Ensure smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Change document title
    document.title = 'Cosmic Hackathon Portal';
    
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
      
      html {
        scroll-behavior: smooth;
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
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.head.removeChild(styleSheet);
    };
  }, []);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full overflow-x-hidden">
        {/* Loading screen */}
        <div className={`loading-screen ${isLoading ? '' : 'hidden'}`}>
          <div className="loader-logo">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#9b87f5" strokeWidth="2" fill="none" />
              <circle cx="50" cy="50" r="30" stroke="#d946ef" strokeWidth="2" fill="none" />
              <circle cx="50" cy="50" r="15" stroke="#0ea5e9" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="loading-text">COSMIC PORTAL INITIALIZING</div>
          <div className="loading-progress">{Math.round(loadProgress)}%</div>
        </div>
        <div className="loader-bar" style={{ width: `${loadProgress}%` }} />
        
        {/* GLSL shader background */}
        <ShaderBackground />
        
        {/* Custom cursor with interactions */}
        <CustomCursor />
        
        {/* Add scroll animation manager */}
        <ScrollManager />
        
        {/* Enhanced navigation with theme toggle */}
        <EnhancedNavigation />
        
        {/* Main content container */}
        <main id="main-content" className={`wormhole-container ${isLoading ? 'opacity-0' : ''}`}>
          <div className="wormhole-content">
            {/* Enhanced hero section with 3D effects */}
            <EnhancedHero />
            
            {/* Enhanced features section with interactive cards */}
            <EnhancedFeatures />
            
            {/* Enhanced schedule section with constellation timeline */}
            <EnhancedSchedule />
            
            {/* Enhanced registration with black hole effect */}
            <EnhancedRegister />
            
            {/* Enhanced sponsors section with interactive cards */}
            <EnhancedSponsors />
          </div>
        </main>
        
        {/* Enhanced footer with floating asteroids */}
        <EnhancedFooter />
      </div>
    </ThemeProvider>
  );
};

export default Index;
