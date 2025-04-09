
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

interface QuantumCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  index: number;
  className?: string;
}

const QuantumCard: React.FC<QuantumCardProps> = ({ 
  title, 
  description, 
  icon, 
  color, 
  index,
  className 
}) => {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [particlesCreated, setParticlesCreated] = useState(false);
  
  // Parallax effect on mousemove
  useEffect(() => {
    if (!cardRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      
      // Calculate mouse position relative to card center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      setMousePosition({ x, y });
      
      // Calculate rotation based on mouse position
      // Limit rotation to 5 degrees for more subtle effect
      const rotateX = -y * 5;
      const rotateY = x * 5;
      
      setRotation({ x: rotateX, y: rotateY });
    };
    
    const handleMouseLeave = () => {
      // Reset rotation when mouse leaves
      setRotation({ x: 0, y: 0 });
      setIsHovered(false);
    };
    
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    cardRef.current.addEventListener('mouseleave', handleMouseLeave);
    cardRef.current.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (cardRef.current) {
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
        cardRef.current.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);
  
  // Intersection observer for reveal animation
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  // Create particle effect when card is hovered
  useEffect(() => {
    if (!cardRef.current || !isHovered || particlesCreated) return;
    
    const createParticles = () => {
      const card = cardRef.current;
      if (!card) return;
      
      setParticlesCreated(true);
      
      // Remove existing particles
      const existingParticles = card.querySelectorAll('.quantum-particle');
      existingParticles.forEach(p => p.remove());
      
      // Create particles
      const particleCount = 10;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Random properties
        const size = 1 + Math.random() * 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = 0.2 + Math.random() * 0.3;
        const delay = Math.random() * 1;
        const duration = 1 + Math.random() * 2;
        
        // Apply styles
        particle.classList.add('quantum-particle', 'absolute', 'rounded-full');
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = '0';
        particle.style.backgroundColor = color.includes('from-') 
          ? color.split('from-')[1].split(' ')[0] 
          : theme === 'dark' ? 'white' : '#9b87f5';
        particle.style.boxShadow = `0 0 ${size}px ${color.includes('from-') ? color.split('from-')[1].split(' ')[0] : (theme === 'dark' ? 'white' : '#9b87f5')}`;
        
        // Animation with delay
        particle.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
        particle.style.transitionDelay = `${delay}s`;
        
        card.appendChild(particle);
        
        // Start animation after a small delay
        setTimeout(() => {
          particle.style.opacity = opacity.toString();
          particle.style.transform = `translate(${(Math.random() * 50) - 25}px, ${(Math.random() * 50) - 25}px)`;
        }, delay * 1000);
        
        // Remove particle after animation
        setTimeout(() => {
          particle.style.opacity = '0';
          setTimeout(() => particle.remove(), duration * 1000);
        }, (delay + duration) * 1000);
      }
    };
    
    // Create particles periodically while hovered
    const particleInterval = setInterval(createParticles, 1000);
    createParticles();
    
    return () => {
      clearInterval(particleInterval);
    };
  }, [isHovered, theme, color, particlesCreated]);
  
  return (
    <div
      ref={cardRef}
      data-hoverable="true"
      className={cn(
        "quantum-card relative overflow-hidden rounded-xl transition-all duration-500",
        "perspective transform-gpu",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
        className
      )}
      style={{
        transitionDelay: `${index * 150}ms`,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Card Background with animated gradient */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-500",
          theme === 'dark' 
            ? 'bg-black/40 backdrop-blur-sm border border-white/10' 
            : 'bg-white/70 backdrop-blur-sm border border-black/10'
        )}
      ></div>
      
      {/* Animated gradient overlay */}
      <div 
        className={cn(
          "absolute inset-0 opacity-20 transition-opacity duration-500",
          color,
          isHovered ? "opacity-30" : "opacity-10"
        )}
        style={{
          transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`,
          transition: 'transform 0.2s ease-out, opacity 0.5s ease-out'
        }}
      ></div>
      
      {/* Content container */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Icon with animated background */}
        <div className="mb-4 relative">
          <div 
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden",
              `bg-gradient-to-br ${color} bg-opacity-20`,
              "transition-all duration-500",
              isHovered ? "scale-110 rotate-3" : "scale-100 rotate-0"
            )}
          >
            {/* Animated border for icon */}
            <div className="absolute inset-0">
              <div className={cn(
                "absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent",
                "transform transition-transform duration-1000",
                isHovered ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
              )}></div>
              <div className={cn(
                "absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent",
                "transform transition-transform duration-1000",
                isHovered ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              )}></div>
              <div className={cn(
                "absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-white to-transparent",
                "transform transition-transform duration-1000",
                isHovered ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
              )}></div>
              <div className={cn(
                "absolute right-0 bottom-0 w-0.5 h-full bg-gradient-to-b from-transparent via-white to-transparent",
                "transform transition-transform duration-1000",
                isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              )}></div>
            </div>
            
            {/* Icon */}
            <div className="text-white text-2xl">{icon}</div>
          </div>
          
          {/* Glow effect behind icon */}
          <div 
            className={cn(
              "absolute -inset-1 rounded-xl",
              "transition-opacity duration-500",
              isHovered ? "opacity-70" : "opacity-0"
            )}
            style={{
              background: `radial-gradient(circle at center, ${color.includes('from-') 
                ? color.split('from-')[1].split(' ')[0] 
                : '#9b87f5'
              }50 0%, transparent 70%)`,
              filter: 'blur(8px)'
            }}
          ></div>
        </div>
        
        {/* Title with animated underline */}
        <h3 
          className={cn(
            "text-xl font-bold mb-3 relative inline-block",
            theme === 'dark' ? 'text-white' : 'text-cosmic-darkPurple'
          )}
        >
          {title}
          <span 
            className={cn(
              "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r",
              color,
              "transition-all duration-500",
              isHovered ? "w-full opacity-100" : "w-0 opacity-0"
            )}
          ></span>
        </h3>
        
        {/* Description with animated opacity */}
        <p 
          className={cn(
            "transition-opacity duration-500",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
            isHovered ? "opacity-100" : "opacity-80"
          )}
        >
          {description}
        </p>
        
        {/* Interactive corner accents */}
        <div 
          className={cn(
            "absolute top-0 left-0 w-5 h-5 border-t border-l transition-all duration-500",
            theme === 'dark' ? 'border-white/20' : 'border-cosmic-purple/20',
            isHovered ? "scale-125 opacity-100" : "scale-100 opacity-50"
          )}
          style={{
            transformOrigin: 'top left',
            transform: isHovered 
              ? `scale(1.25) translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)` 
              : 'scale(1)'
          }}
        ></div>
        <div 
          className={cn(
            "absolute top-0 right-0 w-5 h-5 border-t border-r transition-all duration-500",
            theme === 'dark' ? 'border-white/20' : 'border-cosmic-purple/20',
            isHovered ? "scale-125 opacity-100" : "scale-100 opacity-50"
          )}
          style={{
            transformOrigin: 'top right',
            transform: isHovered 
              ? `scale(1.25) translate(${mousePosition.x * 3}px, ${mousePosition.y * -3}px)` 
              : 'scale(1)'
          }}
        ></div>
        <div 
          className={cn(
            "absolute bottom-0 left-0 w-5 h-5 border-b border-l transition-all duration-500",
            theme === 'dark' ? 'border-white/20' : 'border-cosmic-purple/20',
            isHovered ? "scale-125 opacity-100" : "scale-100 opacity-50"
          )}
          style={{
            transformOrigin: 'bottom left',
            transform: isHovered 
              ? `scale(1.25) translate(${mousePosition.x * -3}px, ${mousePosition.y * 3}px)` 
              : 'scale(1)'
          }}
        ></div>
        <div 
          className={cn(
            "absolute bottom-0 right-0 w-5 h-5 border-b border-r transition-all duration-500",
            theme === 'dark' ? 'border-white/20' : 'border-cosmic-purple/20',
            isHovered ? "scale-125 opacity-100" : "scale-100 opacity-50"
          )}
          style={{
            transformOrigin: 'bottom right',
            transform: isHovered 
              ? `scale(1.25) translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)` 
              : 'scale(1)'
          }}
        ></div>
      </div>
      
      {/* Card shine effect */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none",
          isHovered && "opacity-20"
        )}
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 50}% ${50 + mousePosition.y * 50}%, white, transparent 50%)`,
          transform: `translateZ(20px)`
        }}
      ></div>
    </div>
  );
};

export default QuantumCard;
