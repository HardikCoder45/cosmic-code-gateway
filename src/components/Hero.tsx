
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showBinaryEffect, setShowBinaryEffect] = useState(false);
  
  // Binary code floating effect
  const createBinaryElements = () => {
    const binaryContainer = document.getElementById('binary-container');
    if (!binaryContainer) return;
    
    // Clear previous binary elements
    while (binaryContainer.firstChild) {
      binaryContainer.removeChild(binaryContainer.firstChild);
    }
    
    // Create new binary elements
    for (let i = 0; i < 50; i++) {
      const binary = document.createElement('div');
      binary.className = 'binary';
      binary.textContent = Math.random() > 0.5 ? '1' : '0';
      
      // Random positioning
      binary.style.left = `${Math.random() * 100}%`;
      binary.style.top = `${Math.random() * 100}%`;
      
      // Animation
      binary.style.animationDelay = `${Math.random() * 2}s`;
      binary.style.animationDuration = `${1 + Math.random() * 2}s`;
      binary.classList.add('animate-binary-fade');
      
      binaryContainer.appendChild(binary);
    }
  };
  
  // Type writing effect
  useEffect(() => {
    const fullText = "ENTER THE COSMIC CODE REALM";
    let index = 0;
    
    // Start animation sequence after delay
    setTimeout(() => {
      setLoaded(true);
      
      // Start typing effect after nebula animation
      setTimeout(() => {
        const typingInterval = setInterval(() => {
          setTypedText(fullText.substring(0, index + 1));
          index++;
          
          if (index >= fullText.length) {
            clearInterval(typingInterval);
            
            // Show binary effect after typing completes
            setTimeout(() => {
              setShowBinaryEffect(true);
              createBinaryElements();
              
              // Recreate binary effect periodically
              const binaryInterval = setInterval(createBinaryElements, 3000);
              return () => clearInterval(binaryInterval);
            }, 500);
          }
        }, 100);
      }, 1500);
    }, 500);
  }, []);
  
  return (
    <section id="home" className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Binary code floating effect container */}
      <div 
        id="binary-container" 
        className={cn(
          "absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-1000",
          showBinaryEffect && "opacity-100"
        )}
      />
      
      {/* Nebula effect */}
      <div 
        className={cn(
          "relative w-full max-w-4xl mx-auto nebula-bg rounded-full aspect-square transform scale-0",
          loaded && "animate-nebula-burst"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-purple via-cosmic-pink to-cosmic-blue opacity-20 blur-xl" />
      </div>
      
      {/* Content that fades in after nebula animation */}
      <div className={cn(
        "absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-1000",
        loaded && "opacity-100"
      )}>
        <h1 className="text-5xl md:text-7xl font-bold text-white text-glow mb-6">
          HACKATHON
        </h1>
        
        <div className="text-xl md:text-3xl font-medium text-cosmic-purple mb-12 h-8">
          {typedText}
          <span className="animate-pulse">_</span>
        </div>
        
        <p className="text-gray-300 max-w-md text-center mb-8 px-4">
          Join the ultimate coding adventure where innovation meets the cosmos. 
          Build, collaborate, and launch your ideas into the digital universe.
        </p>
        
        <a 
          href="#register" 
          className="cosmic-button animate-pulse-glow"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Begin Journey
        </a>
      </div>
    </section>
  );
};

export default Hero;
