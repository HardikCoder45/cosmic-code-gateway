
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';

const features = [
  {
    title: "48-Hour Coding Challenge",
    description: "Push your limits in our intensive two-day coding marathon with mentors available 24/7. Access cutting-edge technology and frameworks to bring your ideas to life.",
    color: "from-cosmic-purple to-cosmic-blue",
    icon: "⏱️",
    delay: 0
  },
  {
    title: "10K+ in Prizes",
    description: "Compete for substantial cash prizes, tech gear, and exclusive opportunities with industry leaders. Top teams will receive funding opportunities and accelerator access.",
    color: "from-cosmic-pink to-cosmic-purple",
    icon: "🏆",
    delay: 200
  },
  {
    title: "Expert Mentorship",
    description: "Get guidance from senior developers, startup founders, and tech innovators in real-time. Our mentors come from top companies like Google, Amazon, and Microsoft.",
    color: "from-cosmic-blue to-cosmic-orange",
    icon: "👨‍💻",
    delay: 400
  },
  {
    title: "Networking Opportunities",
    description: "Connect with fellow hackers, sponsors, and recruiters looking for fresh talent. Build relationships that can lead to job offers, partnerships, and future collaborations.",
    color: "from-cosmic-orange to-cosmic-pink",
    icon: "🌐",
    delay: 600
  }
];

const EnhancedFeatures = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-20');
        }
      });
    }, observerOptions);
    
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
      observer.observe(card);
    });
    
    return () => {
      cards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);
  
  // Floating particles in the background
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const container = sectionRef.current;
    const particleCount = 30;
    
    // Remove existing particles
    const existingParticles = container.querySelectorAll('.feature-particle');
    existingParticles.forEach(p => p.remove());
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Random properties
      const size = 1 + Math.random() * 3;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const depth = 0.1 + Math.random() * 0.9;
      const speed = 30 + Math.random() * 60;
      
      // Apply styles
      particle.classList.add('feature-particle', 'absolute', 'rounded-full');
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = (0.1 + Math.random() * 0.3).toString();
      particle.style.backgroundColor = theme === 'dark' ? 'white' : '#9b87f5';
      particle.style.transform = `translateZ(${depth * 10}px)`;
      particle.style.animation = `float ${speed}s linear infinite`;
      
      container.appendChild(particle);
    }
  }, [theme]);
  
  // Parallax effect for cards
  useEffect(() => {
    if (!cardsRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.feature-card');
      const { left, top, width, height } = cardsRef.current!.getBoundingClientRect();
      
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      cards.forEach((card, index) => {
        const depth = 1 - (index % 2) * 0.5;
        const translateX = x * 20 * depth;
        const translateY = y * 20 * depth;
        const rotateX = y * 10;
        const rotateY = -x * 10;
        
        card.setAttribute('style', `
          transform: 
            perspective(1000px) 
            translateX(${translateX}px) 
            translateY(${translateY}px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg);
          transition: transform 0.1s ease;
        `);
      });
    };
    
    const resetTransforms = () => {
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach(card => {
        card.setAttribute('style', `
          transform: perspective(1000px) translateX(0) translateY(0) rotateX(0) rotateY(0);
          transition: transform 0.5s ease;
        `);
      });
    };
    
    cardsRef.current.addEventListener('mousemove', handleMouseMove);
    cardsRef.current.addEventListener('mouseleave', resetTransforms);
    
    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('mousemove', handleMouseMove);
        cardsRef.current.removeEventListener('mouseleave', resetTransforms);
      }
    };
  }, []);
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={cn(
        "min-h-screen py-20 flex flex-col items-center justify-center relative perspective overflow-hidden transition-colors duration-500",
        theme === 'dark' ? 'bg-transparent' : 'bg-white/5'
      )}
    >
      <div className={cn(
        "max-w-6xl mx-auto px-4 py-10 rounded-2xl relative z-10",
        theme === 'dark' ? 'bg-black/10' : 'bg-white/10',
        "backdrop-blur-md border-t border-l",
        theme === 'dark' ? 'border-white/5' : 'border-cosmic-purple/10'
      )}>
        <h2 className={cn(
          "text-4xl md:text-5xl font-bold mb-4 relative transition-colors duration-500",
          theme === 'dark' ? 'text-cosmic-purple text-glow' : 'text-cosmic-deepPurple'
        )}>
          <span className="relative">
            The Cosmic Experience
            <span className="absolute -top-10 -right-10 text-6xl animate-pulse opacity-20">✨</span>
          </span>
        </h2>
        
        <p className={cn(
          "max-w-2xl text-center mx-auto mb-16 transition-colors duration-500",
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}>
          Our hackathon isn't just an event—it's a journey through digital space where innovation, 
          creativity, and technology converge to create something extraordinary beyond the boundaries of conventional thinking.
        </p>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              data-hoverable="true"
              className={cn(
                "feature-card opacity-0 translate-y-20 transition-all duration-1000 overflow-hidden group",
                "perspective rounded-xl"
              )}
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              <div className={cn(
                "h-full p-8 relative transition-all duration-500 overflow-hidden",
                theme === 'dark' 
                  ? `bg-gradient-to-br ${feature.color} bg-opacity-10 border border-white/10`
                  : `bg-white/80 border border-${feature.color.split('-')[1]}/20`,
                "hover:shadow-xl"
              )}>
                {/* Icon */}
                <div className="text-4xl mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                  {feature.icon}
                </div>
                
                {/* Card content */}
                <h3 className={cn(
                  "text-2xl font-bold mb-4 transition-colors duration-500",
                  theme === 'dark' ? 'text-white' : 'text-cosmic-darkPurple'
                )}>
                  {feature.title}
                </h3>
                
                <p className={cn(
                  "transition-colors duration-500",
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                )}>
                  {feature.description}
                </p>
                
                {/* Background elements for visual interest */}
                <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full opacity-10 blur-2xl bg-gradient-to-br from-cosmic-purple to-cosmic-blue"></div>
                
                {/* Animated border */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cosmic-purple to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                  <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cosmic-pink to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cosmic-blue to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-1000"></div>
                  <div className="absolute right-0 bottom-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cosmic-orange to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-1000"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeatures;
