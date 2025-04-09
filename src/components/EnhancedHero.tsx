
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';

const EnhancedHero = () => {
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hoverGlow, setHoverGlow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Parallax effect for stars and nebula
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !nebulaRef.current || !titleRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      // Move nebula slightly
      nebulaRef.current.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
      
      // Move title in opposite direction for parallax effect
      titleRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      
      // Generate stars dynamically based on mouse position
      generateStars(x, y);
    };
    
    const generateStars = (x: number, y: number) => {
      if (!containerRef.current) return;
      
      // Create a new star
      const star = document.createElement('div');
      
      // Random position around mouse
      const randomOffsetX = (Math.random() - 0.5) * 200;
      const randomOffsetY = (Math.random() - 0.5) * 200;
      
      const posX = containerRef.current.clientWidth / 2 + x * 100 + randomOffsetX;
      const posY = containerRef.current.clientHeight / 2 + y * 100 + randomOffsetY;
      
      // Star styling
      const size = 1 + Math.random() * 3;
      star.className = 'absolute rounded-full';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${posX}px`;
      star.style.top = `${posY}px`;
      star.style.backgroundColor = theme === 'dark' ? 'white' : '#9b87f5';
      star.style.opacity = '0';
      star.style.transition = 'opacity 2s ease-out, transform 2s ease-out';
      
      // Add to container
      containerRef.current.appendChild(star);
      
      // Animate the star
      setTimeout(() => {
        star.style.opacity = (0.3 + Math.random() * 0.7).toString();
        star.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
      }, 10);
      
      // Remove the star after animation
      setTimeout(() => {
        star.style.opacity = '0';
        setTimeout(() => star.remove(), 2000);
      }, 2000);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);
  
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
            
            // Start generating binary code effect
            generateBinaryCode();
          }
        }, 100);
      }, 1500);
    }, 500);
  }, []);
  
  // Binary code floating effect
  const generateBinaryCode = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Create binary elements
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const binary = document.createElement('div');
        
        // Randomize content - binary or hex or code symbols
        const contentType = Math.random();
        if (contentType < 0.6) {
          binary.textContent = Math.random() > 0.5 ? '1' : '0';
        } else if (contentType < 0.9) {
          binary.textContent = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        } else {
          const symbols = ['<', '>', '/', '{', '}', '()', '[]', '&&', '||', '==', '===', '=>'];
          binary.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        }
        
        // Randomize appearance
        binary.className = 'binary absolute z-0 pointer-events-none opacity-0';
        binary.style.color = theme === 'dark' ? '#9b87f5' : '#6E59A5';
        binary.style.fontSize = `${0.5 + Math.random() * 0.8}rem`;
        binary.style.left = `${Math.random() * 100}%`;
        binary.style.top = `${Math.random() * 100}%`;
        binary.style.transform = 'translateY(20px)';
        binary.style.transition = 'all 1.5s ease-out';
        
        container.appendChild(binary);
        
        // Animate each binary element
        setTimeout(() => {
          binary.style.opacity = (0.1 + Math.random() * 0.4).toString();
          binary.style.transform = `translateY(-${20 + Math.random() * 50}px)`;
        }, 100);
        
        // Remove the element after animation
        setTimeout(() => {
          binary.style.opacity = '0';
          setTimeout(() => binary.remove(), 1000);
        }, 1500 + Math.random() * 1000);
      }, i * 100); // Stagger creation
    }
    
    // Continue generating binary code
    setTimeout(generateBinaryCode, 5000);
  };
  
  return (
    <section 
      id="home" 
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Nebula effect */}
      <div 
        ref={nebulaRef}
        className={cn(
          "relative w-full max-w-5xl mx-auto aspect-square transform scale-0 transition-transform duration-1000",
          loaded && "scale-100"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cosmic-purple via-cosmic-pink to-cosmic-blue opacity-10 blur-3xl"></div>
        
        {/* Additional nebula layers for depth */}
        <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-cosmic-blue via-cosmic-purple to-cosmic-pink opacity-5 blur-2xl animate-spin" style={{ animationDuration: '120s' }}></div>
        <div className="absolute inset-20 rounded-full bg-gradient-to-bl from-cosmic-pink via-cosmic-blue to-cosmic-purple opacity-5 blur-xl animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}></div>
      </div>
      
      {/* Main content */}
      <div className={cn(
        "absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-1000 z-10",
        loaded && "opacity-100"
      )}>
        <h1 
          ref={titleRef}
          className={cn(
            "text-6xl md:text-8xl font-bold mb-6 transition-colors duration-500",
            theme === 'dark' ? 'text-white text-glow' : 'text-cosmic-darkPurple'
          )}
        >
          <span className="relative">
            <span className="relative z-10">HACKATHON</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent blur filter-none opacity-60 z-0"></span>
          </span>
        </h1>
        
        <div className={cn(
          "text-xl md:text-3xl font-medium mb-12 h-8 transition-colors duration-500",
          theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
        )}>
          {typedText}
          <span className="animate-pulse">_</span>
        </div>
        
        <p className={cn(
          "max-w-md text-center mb-8 px-4 transition-colors duration-500",
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}>
          Join the ultimate coding adventure where innovation meets the cosmos. 
          Build, collaborate, and launch your ideas into the digital universe.
        </p>
        
        <a 
          href="#register" 
          data-hoverable="true"
          className={cn(
            "cosmic-button relative overflow-hidden group transition-all duration-300",
            hoverGlow && "animate-none",
            theme === 'dark' 
              ? 'bg-cosmic-purple hover:bg-cosmic-deepPurple' 
              : 'bg-cosmic-deepPurple hover:bg-cosmic-purple'
          )}
          onMouseEnter={() => setHoverGlow(true)}
          onMouseLeave={() => setHoverGlow(false)}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="relative z-10">Begin Journey</span>
          
          {/* Button glow effect */}
          <span className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300",
            hoverGlow && "opacity-100"
          )}>
            <span className="absolute inset-0 bg-gradient-to-r from-cosmic-pink via-cosmic-purple to-cosmic-blue opacity-60 blur-md"></span>
          </span>
          
          {/* Button particles */}
          {hoverGlow && Array.from({ length: 5 }).map((_, i) => (
            <span 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white animate-ping" 
              style={{ 
                left: `${20 + i * 15}%`, 
                top: '50%',
                animationDuration: `${0.6 + Math.random() * 0.8}s`,
                animationDelay: `${i * 0.1}s`
              }}
            ></span>
          ))}
        </a>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className={cn(
            "text-sm mb-2 transition-colors duration-500",
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          )}>
            Scroll to Explore
          </span>
          <div className="w-6 h-10 border-2 rounded-full flex justify-center p-1">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full animate-bounce mt-1 transition-colors duration-500",
              theme === 'dark' ? 'bg-white' : 'bg-cosmic-deepPurple'
            )} style={{ animationDuration: '1.5s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
