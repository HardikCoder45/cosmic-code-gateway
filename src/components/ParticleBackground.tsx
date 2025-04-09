
import React, { useEffect, useRef } from 'react';

interface ParticleProps {
  density?: number;
  className?: string;
}

const ParticleBackground: React.FC<ParticleProps> = ({ 
  density = 100,
  className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Remove any existing stars
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Create stars
    for (let i = 0; i < density; i++) {
      const star = document.createElement('div');
      
      // Randomize star properties
      const size = Math.random();
      const x = Math.floor(Math.random() * containerWidth);
      const y = Math.floor(Math.random() * containerHeight);
      const duration = 3 + Math.random() * 4; // Between 3-7s
      const delay = Math.random() * 2; // Between 0-2s
      
      // Apply star styles
      star.className = 'star';
      if (size < 0.3) {
        star.classList.add('star-sm');
      } else if (size > 0.8) {
        star.classList.add('star-lg');
      }
      
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.opacity = (0.2 + Math.random() * 0.8).toString();
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;
      star.style.animationName = 'star-twinkle';
      star.style.animationIterationCount = 'infinite';
      
      container.appendChild(star);
    }
  }, [density]);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
    />
  );
};

export default ParticleBackground;
