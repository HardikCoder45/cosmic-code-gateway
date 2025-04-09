
import React, { useEffect, useRef } from 'react';

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    
    // Create floating asteroids
    for (let i = 0; i < 20; i++) {
      const asteroid = document.createElement('div');
      
      // Random asteroid properties
      const size = 30 + Math.floor(Math.random() * 20);
      const speed = 20 + Math.random() * 40;
      const startPosition = Math.random() * containerWidth;
      const delay = Math.random() * 15;
      
      // Style the asteroid
      asteroid.className = 
        'absolute bottom-0 rounded-full bg-cosmic-purple/20 flex items-center justify-center';
      asteroid.style.width = `${size}px`;
      asteroid.style.height = `${size}px`;
      asteroid.style.left = `${startPosition}px`;
      asteroid.style.animationDuration = `${speed}s`;
      asteroid.style.animationDelay = `${delay}s`;
      asteroid.style.animationName = 'float';
      asteroid.style.animationIterationCount = 'infinite';
      asteroid.style.animationTimingFunction = 'linear';
      
      // Add asteroid content (tiny text)
      if (Math.random() > 0.5) {
        const content = document.createElement('span');
        content.textContent = Math.random() > 0.5 ? '✨' : '⭐';
        content.className = 'text-xs text-white opacity-70';
        asteroid.appendChild(content);
      }
      
      container.appendChild(asteroid);
    }
  }, []);
  
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Asteroid belt */}
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />
      
      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-bold text-cosmic-purple mb-4">
              Cosmic Hackathon
            </h3>
            <p className="text-gray-400 mb-4">
              The ultimate coding journey through the digital cosmos. 
              Innovation, collaboration, and technology unite.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cosmic-purple hover:text-cosmic-lightPurple">Twitter</a>
              <a href="#" className="text-cosmic-purple hover:text-cosmic-lightPurple">GitHub</a>
              <a href="#" className="text-cosmic-purple hover:text-cosmic-lightPurple">Discord</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-cosmic-purple mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-cosmic-purple">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-cosmic-purple">About</a>
              </li>
              <li>
                <a href="#schedule" className="text-gray-400 hover:text-cosmic-purple">Schedule</a>
              </li>
              <li>
                <a href="#register" className="text-gray-400 hover:text-cosmic-purple">Register</a>
              </li>
              <li>
                <a href="#sponsors" className="text-gray-400 hover:text-cosmic-purple">Sponsors</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-cosmic-purple mb-4">
              Contact
            </h3>
            <p className="text-gray-400 mb-2">
              Have questions about the hackathon?
            </p>
            <a href="mailto:info@cosmichackathon.com" 
              className="text-cosmic-purple hover:text-cosmic-lightPurple">
              info@cosmichackathon.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-cosmic-purple/20 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Cosmic Hackathon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
