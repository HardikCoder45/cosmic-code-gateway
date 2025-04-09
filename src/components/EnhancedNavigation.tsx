
import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '#home', icon: '🚀' },
  { label: 'About', path: '#about', icon: '✨' },
  { label: 'Schedule', path: '#schedule', icon: '🌠' },
  { label: 'Register', path: '#register', icon: '🌌' },
  { label: 'Sponsors', path: '#sponsors', icon: '💫' }
];

const EnhancedNavigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeItem, setActiveItem] = useState<string>('#home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll position for active section and progress bar
  useEffect(() => {
    const handleScroll = () => {
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

  // Handle particle animation inside nav
  useEffect(() => {
    if (!navContainerRef.current) return;
    
    const navContainer = navContainerRef.current;
    const particleCount = 15;
    
    // Remove existing particles
    const existingParticles = navContainer.querySelectorAll('.nav-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Random properties
      const size = 1 + Math.random() * 3;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = 0.1 + Math.random() * 0.4;
      const duration = 15 + Math.random() * 20;
      const delay = Math.random() * 5;
      
      // Apply styles
      particle.classList.add('nav-particle', 'absolute', 'rounded-full');
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = opacity.toString();
      particle.style.backgroundColor = theme === 'dark' ? 'white' : '#9b87f5';
      
      // Animation
      particle.style.animation = `float ${duration}s infinite ease-in-out`;
      particle.style.animationDelay = `${delay}s`;
      
      navContainer.appendChild(particle);
    }
  }, [theme]);

  const handleNavClick = (path: string, index: number) => {
    setActiveItem(path);
    setMobileMenuOpen(false);
    
    // Trigger wormhole effect on main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.add('animate-wormhole');
      setTimeout(() => {
        mainContent.classList.remove('animate-wormhole');
      }, 1000);
    }
    
    // Smooth scroll to section
    const element = document.querySelector(path);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Progress indicator */}
      <div 
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-blue"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div 
        ref={navContainerRef}
        className={cn(
          "relative px-6 py-4 transition-all duration-500 overflow-hidden",
          theme === 'dark' 
            ? 'bg-black/20 backdrop-blur-md border-b border-white/10' 
            : 'bg-white/20 backdrop-blur-md border-b border-cosmic-purple/10'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="relative z-10">
            <h1 className={cn(
              "text-2xl font-bold transition-colors duration-300",
              theme === 'dark' ? 'text-cosmic-purple text-glow' : 'text-cosmic-deepPurple'
            )}>
              COSMIC PORTAL
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cosmic-pink animate-pulse"></span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.path}
                  data-hoverable="true"
                  className={cn(
                    "relative px-4 py-2 rounded-full overflow-hidden transition-all duration-300 text-sm group",
                    activeItem === item.path 
                      ? theme === 'dark' 
                        ? 'text-white bg-cosmic-purple/30' 
                        : 'text-cosmic-deepPurple bg-cosmic-purple/10'
                      : theme === 'dark'
                        ? 'text-white/70 hover:text-white hover:bg-cosmic-purple/10'
                        : 'text-cosmic-deepPurple/70 hover:text-cosmic-deepPurple hover:bg-cosmic-purple/5'
                  )}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => handleNavClick(item.path, index)}
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2 transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                  
                  {/* Background animation */}
                  {(activeItem === item.path || hoverIndex === index) && (
                    <span className="absolute inset-0 opacity-20 bg-gradient-to-r from-cosmic-purple to-cosmic-pink animate-pulse"></span>
                  )}
                  
                  {/* Active indicator */}
                  {activeItem === item.path && (
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-cosmic-pink"></span>
                  )}
                </button>
              ))}
            </nav>
            
            {/* Theme toggle button */}
            <button
              data-hoverable="true"
              onClick={toggleTheme}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                theme === 'dark' 
                  ? 'bg-cosmic-purple/20 text-white hover:bg-cosmic-purple/30' 
                  : 'bg-cosmic-purple/10 text-cosmic-deepPurple hover:bg-cosmic-purple/20'
              )}
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            
            {/* Mobile menu button */}
            <button
              data-hoverable="true"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                theme === 'dark' 
                  ? 'bg-cosmic-purple/20 text-white hover:bg-cosmic-purple/30' 
                  : 'bg-cosmic-purple/10 text-cosmic-deepPurple hover:bg-cosmic-purple/20'
              )}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/90 backdrop-blur-xl z-40 transition-all duration-500 md:hidden flex flex-col",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex-1 flex items-center justify-center">
          <nav className="flex flex-col gap-6 p-8">
            {navItems.map((item, index) => (
              <button
                key={item.path}
                className={cn(
                  "px-8 py-3 rounded-full text-lg transition-all duration-300 group",
                  activeItem === item.path 
                    ? "text-white bg-cosmic-purple/30 cosmic-shadow" 
                    : "text-white/70 hover:text-white hover:bg-cosmic-purple/10"
                )}
                onClick={() => handleNavClick(item.path, index)}
              >
                <span className="flex items-center">
                  <span className="text-2xl mr-3 transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                    {item.icon}
                  </span>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default EnhancedNavigation;
