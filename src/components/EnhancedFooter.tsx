
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';

const EnhancedFooter = () => {
  const { theme } = useTheme();
  const footerRef = useRef<HTMLElement>(null);
  const [asteroids, setAsteroids] = useState<React.ReactNode[]>([]);
  const [showBeam, setShowBeam] = useState(false);
  
  // Generate floating asteroids
  useEffect(() => {
    const generateAsteroids = () => {
      const newAsteroids = [];
      const count = window.innerWidth < 768 ? 8 : 15;
      
      for (let i = 0; i < count; i++) {
        const size = 4 + Math.random() * 12;
        const left = Math.random() * 100;
        const animationDuration = 15 + Math.random() * 30;
        const delay = Math.random() * 10;
        const opacity = 0.1 + Math.random() * 0.3;
        
        const asteroidStyle: React.CSSProperties = {
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          left: `${left}%`,
          bottom: `-${size}px`,
          opacity: opacity,
          background: theme === 'dark' ? 'white' : '#6E59A5',
          boxShadow: `0 0 ${size / 2}px ${theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(110, 89, 165, 0.5)'}`,
          animation: `floatUp ${animationDuration}s infinite linear`,
          animationDelay: `${delay}s`,
          pointerEvents: 'none',
        };
        
        newAsteroids.push(<div key={i} style={asteroidStyle} />);
      }
      
      setAsteroids(newAsteroids);
    };
    
    generateAsteroids();
    
    // Regenerate on resize
    window.addEventListener('resize', generateAsteroids);
    return () => window.removeEventListener('resize', generateAsteroids);
  }, [theme]);
  
  // Beam effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowBeam(true);
        } else {
          setShowBeam(false);
        }
      },
      { threshold: 0.3 }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  
  // Add keyframes for asteroid animation
  useEffect(() => {
    // Check if styles already exist
    if (!document.getElementById('asteroid-keyframes')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'asteroid-keyframes';
      
      styleElement.textContent = `
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-1500px) rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes beam {
          0% {
            opacity: 0;
            height: 0;
          }
          100% {
            opacity: 0.7;
            height: 100vh;
          }
        }
      `;
      
      document.head.appendChild(styleElement);
    }
  }, []);
  
  return (
    <footer 
      ref={footerRef}
      className={cn(
        "relative pt-20 overflow-hidden",
        theme === 'dark' ? 'bg-black' : 'bg-slate-100'
      )}
    >
      {/* Floating asteroids */}
      <div className="asteroid-container absolute inset-0 overflow-hidden pointer-events-none">
        {asteroids}
      </div>
      
      {/* Light beam effect */}
      {showBeam && (
        <div 
          className="absolute left-1/2 bottom-full w-40 -ml-20 pointer-events-none" 
          style={{
            background: `linear-gradient(to top, ${theme === 'dark' ? 'rgba(155, 135, 245, 0.2)' : 'rgba(110, 89, 165, 0.1)'} 0%, transparent 100%)`,
            height: '100vh',
            opacity: 0.7,
            animation: 'beam 2s ease-out forwards',
          }}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 py-12">
          {/* Brand and mission */}
          <div className="md:col-span-2">
            <h2 className={cn(
              "text-2xl font-bold mb-4",
              theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
            )}>
              Quantum Hackathon Portal
            </h2>
            
            <p className={cn(
              "mb-6 max-w-md",
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            )}>
              Pushing the boundaries of innovation through collaborative coding. 
              Our mission is to create an environment where technology meets creativity to solve tomorrow's challenges.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  theme === 'dark' 
                    ? 'bg-cosmic-purple/20 text-white hover:bg-cosmic-purple/40' 
                    : 'bg-cosmic-purple/10 text-cosmic-deepPurple hover:bg-cosmic-purple/20'
                )}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              
              <a 
                href="#" 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  theme === 'dark' 
                    ? 'bg-cosmic-purple/20 text-white hover:bg-cosmic-purple/40' 
                    : 'bg-cosmic-purple/10 text-cosmic-deepPurple hover:bg-cosmic-purple/20'
                )}
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              
              <a 
                href="#" 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  theme === 'dark' 
                    ? 'bg-cosmic-purple/20 text-white hover:bg-cosmic-purple/40' 
                    : 'bg-cosmic-purple/10 text-cosmic-deepPurple hover:bg-cosmic-purple/20'
                )}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className={cn(
              "text-lg font-semibold mb-4",
              theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
            )}>
              Quick Links
            </h3>
            
            <ul className="space-y-3">
              {['About', 'Schedule', 'Register', 'Sponsors', 'FAQs', 'Contact'].map((item, i) => (
                <li key={i}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className={cn(
                      "transition-colors hover:underline flex items-center",
                      theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-cosmic-deepPurple'
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cosmic-purple inline-block mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className={cn(
              "text-lg font-semibold mb-4",
              theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
            )}>
              Resources
            </h3>
            
            <ul className="space-y-3">
              {['Documentation', 'Previous Winners', 'Mentors', 'Sponsors', 'Blog', 'Newsletter'].map((item, i) => (
                <li key={i}>
                  <a 
                    href="#" 
                    className={cn(
                      "transition-colors hover:underline flex items-center",
                      theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-cosmic-deepPurple'
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cosmic-purple inline-block mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className={cn(
          "py-8 my-8 border-t border-b",
          theme === 'dark' ? 'border-white/10' : 'border-cosmic-purple/10'
        )}>
          <div className="max-w-xl mx-auto text-center">
            <h3 className={cn(
              "text-xl font-semibold mb-3",
              theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
            )}>
              Stay Connected
            </h3>
            
            <p className={cn(
              "mb-6",
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            )}>
              Subscribe to our newsletter for updates on future events, technology trends, and innovation opportunities.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className={cn(
                  "px-4 py-2 rounded-lg flex-grow",
                  theme === 'dark' 
                    ? 'bg-black/30 border border-white/10 text-white' 
                    : 'bg-white border border-cosmic-purple/10 text-cosmic-deepPurple'
                )}
              />
              
              <button
                type="submit"
                className={cn(
                  "px-6 py-2 rounded-lg font-medium transition-colors",
                  theme === 'dark' 
                    ? 'bg-cosmic-purple text-white hover:bg-cosmic-deepPurple' 
                    : 'bg-cosmic-deepPurple text-white hover:bg-cosmic-purple'
                )}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="py-6 text-center">
          <p className={cn(
            "text-sm",
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          )}>
            © {new Date().getFullYear()} Quantum Hackathon Portal. All rights reserved.
          </p>
          
          <div className="mt-2 flex items-center justify-center space-x-4 text-sm">
            <a 
              href="#" 
              className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-cosmic-deepPurple'}
            >
              Privacy Policy
            </a>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>•</span>
            <a 
              href="#" 
              className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-cosmic-deepPurple'}
            >
              Terms of Service
            </a>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>•</span>
            <a 
              href="#" 
              className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-cosmic-deepPurple'}
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
      
      {/* Cosmic decoration at the bottom */}
      <div className={cn(
        "h-24 relative z-0 overflow-hidden",
        theme === 'dark' ? 'bg-black' : 'bg-slate-100'
      )}>
        <div className="absolute inset-0 flex justify-center">
          <div
            className={cn(
              "w-full h-24 -mt-12 rounded-full opacity-10",
              theme === 'dark' ? 'bg-cosmic-purple' : 'bg-cosmic-deepPurple'
            )}
            style={{
              filter: 'blur(40px)',
              transform: 'scale(1.5, 0.5)',
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
