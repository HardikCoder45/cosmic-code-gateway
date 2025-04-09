
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

const EnhancedFooter = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  
  // Create floating asteroids and parallax star field
  useEffect(() => {
    if (!containerRef.current || !starsRef.current) return;
    
    const container = containerRef.current;
    const starsContainer = starsRef.current;
    const containerWidth = container.offsetWidth;
    
    // Clear any existing elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    while (starsContainer.firstChild) {
      starsContainer.removeChild(starsContainer.firstChild);
    }
    
    // Create parallax stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      
      // Random properties
      const size = 1 + Math.random() * 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const depth = 0.1 + Math.random() * 0.9; // 0.1 (far) to 1.0 (close)
      const opacity = 0.1 + depth * 0.9; // More distant stars are fainter
      
      // Style the star
      star.className = 'absolute rounded-full';
      star.style.width = `${size * depth}px`;
      star.style.height = `${size * depth}px`;
      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      star.style.opacity = opacity.toString();
      star.style.backgroundColor = theme === 'dark' ? 'white' : '#9b87f5';
      star.style.transform = `translateZ(${-100 + depth * 100}px)`;
      
      // Add star to container
      starsContainer.appendChild(star);
    }
    
    // Create floating asteroids
    const asteroidTypes = [
      // Polygon SVG shapes for asteroid variety
      `<svg viewBox="0 0 24 24" fill="${theme === 'dark' ? 'white' : '#9b87f5'}" opacity="0.5"><path d="M12,2L2,7L12,12L22,7L12,2Z"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="${theme === 'dark' ? 'white' : '#9b87f5'}" opacity="0.5"><path d="M3,12L12,5L21,12L12,19L3,12Z"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="${theme === 'dark' ? 'white' : '#9b87f5'}" opacity="0.5"><path d="M12,3L20,10L17,21H7L4,10L12,3Z"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="${theme === 'dark' ? 'white' : '#9b87f5'}" opacity="0.5"><path d="M12,2L19,8L22,18L12,22L2,18L5,8L12,2Z"/></svg>`
    ];
    
    const emojis = ["✨", "⭐", "💫", "🌟"];
    
    for (let i = 0; i < 20; i++) {
      const asteroid = document.createElement('div');
      
      // Random asteroid properties
      const size = 20 + Math.floor(Math.random() * 30);
      const speed = 20 + Math.random() * 40;
      const startPosition = Math.random() * containerWidth;
      const delay = Math.random() * 15;
      const rotationSpeed = 10 + Math.random() * 40;
      const rotationDirection = Math.random() > 0.5 ? 1 : -1;
      const asteroidType = Math.random() > 0.7 
        ? `<div class="text-center text-lg">${emojis[Math.floor(Math.random() * emojis.length)]}</div>`
        : asteroidTypes[Math.floor(Math.random() * asteroidTypes.length)];
      
      // Style the asteroid
      asteroid.className = 'absolute flex items-center justify-center';
      asteroid.style.width = `${size}px`;
      asteroid.style.height = `${size}px`;
      asteroid.style.left = `${startPosition}px`;
      asteroid.style.bottom = `-${size}px`;
      asteroid.style.opacity = (0.4 + Math.random() * 0.6).toString();
      asteroid.style.zIndex = Math.floor(Math.random() * 10).toString();
      
      // Animation with keyframes
      asteroid.style.animation = `
        float ${speed}s linear infinite, 
        rotate ${rotationSpeed}s linear infinite ${rotationDirection > 0 ? '' : 'reverse'}
      `;
      asteroid.style.animationDelay = `${delay}s`;
      
      // Add asteroid content
      asteroid.innerHTML = asteroidType;
      
      container.appendChild(asteroid);
    }
    
    // Add parallax effect to stars
    const handleMouseMove = (e: MouseEvent) => {
      if (!starsContainer) return;
      
      const { left, top, width, height } = starsContainer.getBoundingClientRect();
      
      // Calculate mouse position relative to the container center (-1 to 1)
      const x = ((e.clientX - left) / width - 0.5) * 2;
      const y = ((e.clientY - top) / height - 0.5) * 2;
      
      // Apply parallax effect to stars based on their depth
      const stars = starsContainer.querySelectorAll('div');
      stars.forEach((star, index) => {
        const depth = 0.1 + (index % 10) / 10; // 0.1 to 1.0
        const translateX = x * 20 * depth; // Closer stars move more
        const translateY = y * 20 * depth;
        
        star.style.transform = `translate(${translateX}px, ${translateY}px) translateZ(${-100 + depth * 100}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);
  
  // Define footer navigation links
  const footerLinks = [
    {
      title: "Hackathon",
      links: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Schedule", href: "#schedule" },
        { name: "Register", href: "#register" },
        { name: "Sponsors", href: "#sponsors" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "FAQs", href: "#" },
        { name: "Code of Conduct", href: "#" },
        { name: "Workshops", href: "#" },
        { name: "API Documentation", href: "#" },
        { name: "Partners", href: "#" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Discord", href: "#" },
        { name: "GitHub", href: "#" },
        { name: "Twitter", href: "#" },
        { name: "LinkedIn", href: "#" },
        { name: "Blog", href: "#" }
      ]
    }
  ];
  
  return (
    <footer className={cn(
      "relative pt-20 pb-8 overflow-hidden transition-colors duration-500 perspective",
      theme === 'dark' ? 'bg-transparent' : 'bg-white/5'
    )}>
      {/* Asteroid belt */}
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />
      
      {/* Star field with parallax effect */}
      <div 
        ref={starsRef}
        className="absolute inset-0 overflow-hidden pointer-events-none perspective"
      />
      
      {/* Animated aurora effect */}
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0 opacity-20",
            theme === 'dark' ? 'bg-gradient-to-t from-cosmic-purple to-transparent' : 'bg-gradient-to-t from-cosmic-deepPurple/30 to-transparent'
          )}
        ></div>
        <div 
          className="absolute inset-0 opacity-10 bg-gradient-to-r from-cosmic-blue via-cosmic-purple to-cosmic-pink animate-pulse"
          style={{ animationDuration: '5s' }}
        ></div>
      </div>
      
      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className={cn(
          "max-w-6xl mx-auto rounded-2xl p-8 mb-12 transition-all duration-500",
          theme === 'dark'
            ? 'bg-black/30 border border-white/5 backdrop-blur-sm'
            : 'bg-white/50 border border-cosmic-purple/10 backdrop-blur-sm'
        )}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Branding section */}
            <div className="md:col-span-1">
              <div className={cn(
                "font-bold text-2xl mb-4 transition-colors duration-500",
                theme === 'dark' ? 'text-cosmic-purple text-glow' : 'text-cosmic-deepPurple'
              )}>
                <span className="inline-block">
                  Cosmic Hackathon
                  <span className="absolute -top-1 right-0 w-1 h-1 rounded-full bg-cosmic-pink animate-pulse"></span>
                </span>
              </div>
              
              <p className={cn(
                "mb-6 transition-colors duration-500",
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              )}>
                The ultimate coding journey through the digital cosmos. 
                Innovation, collaboration, and technology unite to create something extraordinary.
              </p>
              
              <div className="flex space-x-4">
                {['Twitter', 'GitHub', 'Discord', 'LinkedIn'].map(platform => (
                  <a 
                    href="#" 
                    key={platform}
                    data-hoverable="true"
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                      theme === 'dark'
                        ? 'bg-cosmic-purple/20 text-white hover:bg-cosmic-purple/30'
                        : 'bg-cosmic-purple/10 text-cosmic-deepPurple hover:bg-cosmic-purple/20'
                    )}
                    aria-label={platform}
                  >
                    {/* Simple text abbreviation instead of icons */}
                    {platform.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Navigation sections */}
            {footerLinks.map((section, index) => (
              <div key={index} className="md:col-span-1">
                <h3 className={cn(
                  "text-lg font-bold mb-4 transition-colors duration-500",
                  theme === 'dark' ? 'text-white' : 'text-cosmic-darkPurple'
                )}>
                  {section.title}
                </h3>
                
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href}
                        data-hoverable="true" 
                        className={cn(
                          "transition-colors duration-300 inline-block relative",
                          "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
                          theme === 'dark' 
                            ? 'text-gray-400 hover:text-cosmic-purple after:bg-cosmic-purple/50' 
                            : 'text-gray-600 hover:text-cosmic-deepPurple after:bg-cosmic-deepPurple/50'
                        )}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Newsletter & subscription */}
        <div className={cn(
          "max-w-2xl mx-auto mb-12 rounded-2xl p-6 transition-all duration-500",
          theme === 'dark'
            ? 'bg-black/40 border border-white/10 backdrop-blur-md'
            : 'bg-white/60 border border-cosmic-purple/10 backdrop-blur-md'
        )}>
          <div className="text-center mb-4">
            <h3 className={cn(
              "text-xl font-bold mb-2 transition-colors duration-500",
              theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
            )}>
              Stay Updated
            </h3>
            
            <p className={cn(
              "transition-colors duration-500",
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            )}>
              Subscribe to our newsletter for hackathon updates and future events
            </p>
          </div>
          
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className={cn(
                "flex-grow rounded-full py-2 px-4 transition-all duration-300 focus:outline-none focus:ring-2",
                theme === 'dark' 
                  ? 'bg-cosmic-darkPurple/40 border border-cosmic-purple/30 text-white focus:ring-cosmic-purple' 
                  : 'bg-white border border-cosmic-purple/20 text-cosmic-darkPurple focus:ring-cosmic-deepPurple'
              )}
            />
            
            <button
              type="submit"
              data-hoverable="true"
              className={cn(
                "rounded-full px-5 py-2 transition-all duration-300",
                theme === 'dark' 
                  ? 'bg-cosmic-purple hover:bg-cosmic-deepPurple text-white' 
                  : 'bg-cosmic-deepPurple hover:bg-cosmic-purple text-white'
              )}
            >
              Subscribe
            </button>
          </form>
        </div>
        
        {/* Footer bottom bar */}
        <div className={cn(
          "border-t pt-8 text-center transition-colors duration-500",
          theme === 'dark' ? 'border-cosmic-purple/20 text-gray-500' : 'border-cosmic-purple/10 text-gray-500'
        )}>
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm">
            <p>© 2025 Cosmic Hackathon. All rights reserved.</p>
            
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <a href="#" className={cn(
                "transition-colors duration-300",
                theme === 'dark' ? 'text-gray-500 hover:text-cosmic-purple' : 'text-gray-500 hover:text-cosmic-deepPurple'
              )}>
                Privacy Policy
              </a>
              <a href="#" className={cn(
                "transition-colors duration-300",
                theme === 'dark' ? 'text-gray-500 hover:text-cosmic-purple' : 'text-gray-500 hover:text-cosmic-deepPurple'
              )}>
                Terms of Service
              </a>
              <a href="#" className={cn(
                "transition-colors duration-300",
                theme === 'dark' ? 'text-gray-500 hover:text-cosmic-purple' : 'text-gray-500 hover:text-cosmic-deepPurple'
              )}>
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated shooting star */}
      <div 
        className="shooting-star absolute w-0.5 h-0.5 bg-white rounded-full pointer-events-none"
        style={{
          left: '-10px',
          top: '10%',
          boxShadow: '0 0 10px 2px white',
          animation: 'shooting-star 3s linear infinite',
          animationDelay: '1s'
        }}
      ></div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(5px, -30vh) rotate(90deg); }
          50% { transform: translate(15px, -60vh) rotate(180deg); }
          75% { transform: translate(5px, -90vh) rotate(270deg); }
          100% { transform: translate(0, -120vh) rotate(360deg); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shooting-star {
          0% { 
            transform: translateX(0) translateY(0); 
            opacity: 1;
          }
          70% { 
            transform: translateX(calc(100vw + 100px)) translateY(calc(50vh + 50px));
            opacity: 1;
          }
          100% { 
            transform: translateX(calc(100vw + 200px)) translateY(calc(100vh + 100px));
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default EnhancedFooter;
