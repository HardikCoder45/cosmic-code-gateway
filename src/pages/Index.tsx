
import React, { useEffect } from 'react';
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
  useEffect(() => {
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
        }
        20% {
          transform: translate(-2px, 2px);
        }
        40% {
          transform: translate(-2px, -2px);
        }
        60% {
          transform: translate(2px, 2px);
        }
        80% {
          transform: translate(2px, -2px);
        }
        100% {
          transform: translate(0);
        }
      }
      
      .text-glitch:hover {
        animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.head.removeChild(styleSheet);
    };
  }, []);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full overflow-x-hidden">
        {/* GLSL shader background */}
        <ShaderBackground />
        
        {/* Custom cursor with interactions */}
        <CustomCursor />
        
        {/* Add scroll animation manager */}
        <ScrollManager />
        
        {/* Enhanced navigation with theme toggle */}
        <EnhancedNavigation />
        
        {/* Main content container */}
        <main id="main-content" className="wormhole-container">
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
