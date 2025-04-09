
import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, Compass, Layers, Star, Zap, Code } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Dimension', path: '#home', icon: Compass },
  { label: 'Quantum', path: '#about', icon: Layers },
  { label: 'Nebula', path: '#schedule', icon: Star },
  { label: 'Portal', path: '#register', icon: Zap },
  { label: 'Genesis', path: '#sponsors', icon: Code }
];

const QuantumNavigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeItem, setActiveItem] = useState<string>('#home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [navFloating, setNavFloating] = useState<boolean>(false);
  const [quantumEffectPosition, setQuantumEffectPosition] = useState({ x: 0, y: 0 });
  const [quantumPulse, setQuantumPulse] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const quantumEffectRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll position for active section and progress bar
  useEffect(() => {
    const handleScroll = () => {
      // Make navbar float after scrolling 100px
      if (window.scrollY > 100) {
        setNavFloating(true);
      } else {
        setNavFloating(false);
      }
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Find active section based on scroll position
      const sections = navItems.map(item => item.path);
      
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveItem(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quantum effect mouse follower
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!navRef.current || !quantumEffectRef.current) return;
      
      const navRect = navRef.current.getBoundingClientRect();
      
      // Check if mouse is near the nav element
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const isNearNav = 
        mouseX >= navRect.left - 100 && 
        mouseX <= navRect.right + 100 && 
        mouseY >= navRect.top - 100 && 
        mouseY <= navRect.bottom + 100;

      if (isNearNav) {
        // Calculate position relative to the nav
        const x = mouseX - navRect.left;
        const y = mouseY - navRect.top;
        
        setQuantumEffectPosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Create quantum effect animation
    const pulseInterval = setInterval(() => {
      setQuantumPulse(prev => !prev);
    }, 3000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(pulseInterval);
    };
  }, []);

  const handleNavClick = (path: string) => {
    setActiveItem(path);
    setMobileMenuOpen(false);
    
    // Add quantum portal effect on navigation
    document.body.classList.add('quantum-transition');
    setTimeout(() => {
      document.body.classList.remove('quantum-transition');
    }, 1000);
    
    // Smooth scroll to section
    const element = document.querySelector(path);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Create quantum particle clouds
  useEffect(() => {
    if (!navRef.current) return;
    
    // Create particle elements
    const particleCount = 20;
    const container = navRef.current;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Randomize particle properties
      const size = 1 + Math.random() * 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = 15 + Math.random() * 10;
      const delay = Math.random() * 5;
      
      // Apply styles
      particle.classList.add('absolute', 'rounded-full', 'quantum-particle');
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = '0';
      particle.style.backgroundColor = theme === 'dark' ? 'rgba(155, 135, 245, 0.5)' : 'rgba(110, 89, 165, 0.5)';
      particle.style.boxShadow = theme === 'dark' 
        ? '0 0 5px rgba(155, 135, 245, 0.5), 0 0 10px rgba(155, 135, 245, 0.3)' 
        : '0 0 5px rgba(110, 89, 165, 0.5), 0 0 10px rgba(110, 89, 165, 0.3)';
      
      // Animation properties
      particle.style.animation = `quantumFloat ${duration}s infinite ease-in-out`;
      particle.style.animationDelay = `${delay}s`;
      
      container.appendChild(particle);
      
      // Animate in
      setTimeout(() => {
        particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();
      }, delay * 1000);
    }
    
    // Create keyframes for quantum float animation if not already defined
    if (!document.getElementById('quantum-keyframes')) {
      const keyframes = document.createElement('style');
      keyframes.id = 'quantum-keyframes';
      keyframes.textContent = `
        @keyframes quantumFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(${Math.random() * 20}px, ${Math.random() * 20}px) scale(${0.8 + Math.random() * 0.4}); }
          50% { transform: translate(${Math.random() * -20}px, ${Math.random() * 20}px) scale(${0.8 + Math.random() * 0.4}); }
          75% { transform: translate(${Math.random() * -20}px, ${Math.random() * -20}px) scale(${0.8 + Math.random() * 0.4}); }
        }
        
        @keyframes quantumPulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        
        .quantum-transition {
          overflow: hidden;
        }
        
        .quantum-transition::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(155, 135, 245, 0.7), transparent 70%);
          z-index: 999;
          opacity: 0;
          pointer-events: none;
          animation: quantumTransition 1s ease-out forwards;
        }
        
        @keyframes quantumTransition {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.8; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(2); }
        }
      `;
      document.head.appendChild(keyframes);
    }
  }, [theme]);

  return (
    <header 
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        navFloating ? 'py-2' : 'py-4'
      )}
    >
      {/* Progress indicator */}
      <div 
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-blue"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div 
        className={cn(
          "relative px-6 py-3 transition-all duration-500 overflow-hidden",
          navFloating 
            ? theme === 'dark' 
              ? 'bg-black/40 backdrop-blur-lg border-b border-white/10' 
              : 'bg-white/40 backdrop-blur-lg border-b border-cosmic-purple/10'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          {/* Logo */}
          <div 
            className="relative z-10"
            data-magnetic="0.5"
          >
            <h1 className={cn(
              "text-2xl font-bold transition-colors duration-300 relative",
              theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
            )}>
              <span className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-gradient-to-r from-cosmic-purple to-cosmic-pink blur-md animate-pulse opacity-70"></span>
              <span className="relative z-10 flex items-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-blue">
                  QUANTUM
                </span>
                <span className={theme === 'dark' ? 'text-white ml-2' : 'text-cosmic-deepPurple ml-2'}>
                  PORTAL
                </span>
              </span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => {
                const isActive = activeItem === item.path;
                
                return (
                  <button
                    key={item.path}
                    data-hoverable="true"
                    className={cn(
                      "relative px-5 py-2 rounded-full overflow-hidden transition-all duration-300",
                      isActive 
                        ? theme === 'dark' 
                          ? 'text-white' 
                          : 'text-cosmic-deepPurple'
                        : theme === 'dark'
                          ? 'text-white/60 hover:text-white'
                          : 'text-cosmic-deepPurple/60 hover:text-cosmic-deepPurple'
                    )}
                    onClick={() => handleNavClick(item.path)}
                  >
                    {/* Quantum effect background */}
                    <span 
                      className={cn(
                        "absolute inset-0 opacity-0 transition-opacity duration-300",
                        isActive && "opacity-100"
                      )}
                    >
                      <span 
                        className={cn(
                          "absolute inset-0 opacity-30",
                          theme === 'dark'
                            ? 'bg-cosmic-purple'
                            : 'bg-cosmic-purple/20'
                        )}
                      ></span>
                      <span 
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span 
                            key={i}
                            className="absolute w-full h-full rounded-full bg-cosmic-purple"
                            style={{ 
                              opacity: 0.03 * (5 - i),
                              transform: `scale(${1 + (i * 0.1)})`,
                              animation: isActive ? `quantumPulse ${2 + i * 0.5}s infinite ease-in-out alternate` : 'none',
                              animationDelay: `${i * 0.2}s`
                            }}
                          ></span>
                        ))}
                      </span>
                    </span>
                    
                    {/* Content with icon */}
                    <span className="relative z-10 flex items-center gap-2">
                      <item.icon 
                        size={16} 
                        className={cn(
                          "transition-transform duration-300",
                          isActive ? "scale-125" : "scale-100"
                        )}
                      />
                      <span className="relative">
                        {item.label}
                        {isActive && (
                          <span 
                            className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-cosmic-purple to-cosmic-pink"
                          ></span>
                        )}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
            
            {/* Theme toggle button */}
            <button
              data-hoverable="true"
              onClick={toggleTheme}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden",
                theme === 'dark' 
                  ? 'text-white' 
                  : 'text-cosmic-deepPurple'
              )}
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {/* Button background effect */}
              <span className="absolute inset-0 opacity-20 bg-gradient-to-r from-cosmic-purple to-cosmic-pink rounded-full"></span>
              
              {/* Animated icons */}
              <span className="relative">
                <Sun 
                  size={18} 
                  className={cn(
                    "absolute top-0 left-0 transition-all duration-500 transform",
                    theme === 'dark' 
                      ? 'opacity-0 rotate-90 scale-0' 
                      : 'opacity-100 rotate-0 scale-100'
                  )}
                />
                <Moon 
                  size={18} 
                  className={cn(
                    "transition-all duration-500 transform",
                    theme === 'dark' 
                      ? 'opacity-100 rotate-0 scale-100' 
                      : 'opacity-0 rotate-90 scale-0'
                  )}
                />
              </span>
              
              {/* Pulse effect */}
              <span 
                className={cn(
                  "absolute inset-0 rounded-full",
                  theme === 'dark'
                    ? 'bg-cosmic-purple/20'
                    : 'bg-cosmic-blue/20',
                  "transition-transform duration-500",
                  "animate-ping opacity-30"
                )}
                style={{ animationDuration: '3s' }}
              ></span>
            </button>
            
            {/* Mobile menu button */}
            <button
              data-hoverable="true"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative",
                theme === 'dark' 
                  ? 'text-white' 
                  : 'text-cosmic-deepPurple'
              )}
              aria-label="Toggle mobile menu"
            >
              {/* Button background with gradient */}
              <span className="absolute inset-0 opacity-20 bg-gradient-to-r from-cosmic-purple to-cosmic-pink rounded-full"></span>
              
              {/* Icon with transition */}
              <span className="relative">
                <Menu 
                  size={18} 
                  className={cn(
                    "transition-all duration-300 transform",
                    mobileMenuOpen ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'
                  )}
                />
                <X 
                  size={18} 
                  className={cn(
                    "absolute top-0 left-0 transition-all duration-300 transform",
                    mobileMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-90'
                  )}
                />
              </span>
            </button>
          </div>
        </div>
        
        {/* Quantum effect follower */}
        <div 
          ref={quantumEffectRef}
          className="absolute pointer-events-none z-0 w-40 h-40 rounded-full"
          style={{ 
            left: `${quantumEffectPosition.x - 80}px`, 
            top: `${quantumEffectPosition.y - 80}px`,
            transition: 'transform 0.1s ease-out, opacity 0.3s ease-out',
            opacity: navFloating ? 0.2 : 0.1,
          }}
        >
          <div 
            className={cn(
              "absolute inset-0 rounded-full blur-xl",
              theme === 'dark'
                ? 'bg-cosmic-purple'
                : 'bg-cosmic-deepPurple/80'
            )}
            style={{ 
              animation: quantumPulse ? 'quantumPulse 3s infinite ease-in-out' : 'none',
            }}
          ></div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu - Redesigned */}
      <div 
        className={cn(
          "fixed inset-0 z-40 transition-all duration-500 md:hidden flex flex-col",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop with cosmic theme */}
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            mobileMenuOpen ? "opacity-100" : "opacity-0",
            theme === 'dark'
              ? 'bg-black/90 backdrop-blur-xl'
              : 'bg-cosmic-deepPurple/80 backdrop-blur-xl'
          )}
        ></div>
        
        {/* Navigation items container */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <nav className="flex flex-col gap-8 p-8 max-w-sm w-full">
            {navItems.map((item, index) => {
              const isActive = activeItem === item.path;
              
              return (
                <button
                  key={item.path}
                  className={cn(
                    "group relative px-8 py-4 rounded-xl text-lg transition-all duration-300",
                    isActive 
                      ? "text-white bg-cosmic-purple/30" 
                      : "text-white/70 hover:text-white"
                  )}
                  onClick={() => handleNavClick(item.path)}
                >
                  {/* Background with cosmic effect */}
                  <span 
                    className={cn(
                      "absolute inset-0 rounded-xl overflow-hidden transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                    )}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/20 to-cosmic-pink/20 backdrop-blur-sm"></span>
                    <span className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cosmic-pink to-transparent"></span>
                    <span className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-cosmic-purple to-transparent"></span>
                  </span>
                  
                  {/* Content with animated icon */}
                  <span className="relative z-10 flex items-center">
                    <span 
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-all duration-300",
                        isActive 
                          ? "bg-cosmic-purple text-white" 
                          : "bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white"
                      )}
                    >
                      <item.icon size={20} className="transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                    </span>
                    <span className="text-lg font-medium">{item.label}</span>
                  </span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-cosmic-pink"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default QuantumNavigation;
