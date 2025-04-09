
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

const navItems = [
  { title: 'Home', path: '#home' },
  { title: 'About', path: '#about' },
  { title: 'Schedule', path: '#schedule' },
  { title: 'Register', path: '#register' },
  { title: 'Sponsors', path: '#sponsors' }
];

const CosmicNavbar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePlanetClick = (index: number) => {
    setActiveIndex(index);
    
    // Close mobile menu when a planet is clicked
    setMobileMenuOpen(false);
    
    // Add wormhole animation to body content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.add('animate-wormhole');
      setTimeout(() => {
        mainContent.classList.remove('animate-wormhole');
      }, 1000);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 px-8 backdrop-blur-md bg-black/20">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-cosmic-purple text-glow">
          COSMIC PORTAL
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-cosmic-purple" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className={cn(
                "relative py-2 px-4 rounded-full text-sm font-medium transition-all duration-300",
                activeIndex === index 
                  ? "text-cosmic-purple bg-cosmic-darkPurple/50 cosmic-shadow" 
                  : "text-gray-300 hover:text-cosmic-purple"
              )}
              onClick={(e) => {
                e.preventDefault();
                handlePlanetClick(index);
                // Smooth scroll to section
                const element = document.querySelector(item.path);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10">{item.title}</span>
              {activeIndex === index && (
                <span className="absolute inset-0 rounded-full animate-pulse-glow"></span>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 py-4 px-2 rounded-lg cosmic-card">
          <div className="flex flex-col space-y-3">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={cn(
                  "py-2 px-4 rounded-md text-sm font-medium",
                  activeIndex === index 
                    ? "text-cosmic-purple bg-cosmic-darkPurple/50" 
                    : "text-gray-300"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  handlePlanetClick(index);
                  // Smooth scroll to section
                  const element = document.querySelector(item.path);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default CosmicNavbar;
