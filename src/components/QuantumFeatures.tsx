
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import QuantumCard from './QuantumCard';

const features = [
  {
    title: "Quantum Coding Challenge",
    description: "Engage in our 48-hour intensive coding marathon with cutting-edge tech stacks and real-time mentorship from industry leaders. Leverage next-gen frameworks and APIs.",
    icon: "⚡",
    color: "from-cosmic-purple to-cosmic-blue",
  },
  {
    title: "Dimensional Rewards",
    description: "Compete for $25K+ in prizes including cash, hardware, and exclusive opportunities. Winners gain accelerator access, investor connections, and innovation grants.",
    icon: "🏆",
    color: "from-cosmic-pink to-cosmic-purple",
  },
  {
    title: "Neural Network Mentorship",
    description: "Receive guidance from senior developers at FAANG companies, startup founders, and tech innovators. Benefit from specialized workshops on emerging technologies.",
    icon: "🧠",
    color: "from-cosmic-blue to-cosmic-orange",
  },
  {
    title: "Vector Networking",
    description: "Connect with industry professionals, leading engineers, and venture capitalists searching for the next breakthrough. Build relationships leading to job offers and seed funding.",
    icon: "🌐",
    color: "from-cosmic-orange to-cosmic-pink", 
  }
];

const QuantumFeatures = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create floating quantum particles
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const container = sectionRef.current;
    const particleCount = 30;
    
    // Remove existing particles
    const existingParticles = container.querySelectorAll('.quantum-background-particle');
    existingParticles.forEach(p => p.remove());
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Random properties
      const size = 1 + Math.random() * 4;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const depth = Math.random() * 100;
      const opacity = 0.1 + Math.random() * 0.2;
      const delay = Math.random() * 5;
      const duration = 30 + Math.random() * 30;
      
      // Apply styles
      particle.classList.add('quantum-background-particle', 'absolute', 'rounded-full');
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = opacity.toString();
      particle.style.backgroundColor = theme === 'dark' ? 'white' : '#6E59A5';
      particle.style.boxShadow = theme === 'dark' 
        ? `0 0 ${size + 2}px rgba(255, 255, 255, 0.5)` 
        : `0 0 ${size + 2}px rgba(110, 89, 165, 0.5)`;
      particle.style.filter = `blur(${Math.random() * 2}px)`;
      particle.style.zIndex = Math.floor(depth).toString();
      
      // Add animation with custom keyframes and delay
      particle.style.animation = `floatParticle ${duration}s infinite ease-in-out`;
      particle.style.animationDelay = `${delay}s`;
      
      container.appendChild(particle);
    }
    
    // Add keyframes if not already defined
    if (!document.getElementById('quantum-particles-keyframes')) {
      const keyframes = document.createElement('style');
      keyframes.id = 'quantum-particles-keyframes';
      keyframes.textContent = `
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px); }
          50% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px); }
          75% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px); }
        }
      `;
      document.head.appendChild(keyframes);
    }
  }, [theme]);
  
  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const section = containerRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Check if section is in viewport
      if (
        scrollY + windowHeight > sectionTop && 
        scrollY < sectionTop + sectionHeight
      ) {
        // Calculate progress through the section (0 to 1)
        const scrollProgress = (scrollY + windowHeight - sectionTop) / (sectionHeight + windowHeight);
        
        // Apply parallax effect to features
        const cards = document.querySelectorAll('.quantum-card');
        cards.forEach((card, index) => {
          const speed = 0.05 + (index % 2) * 0.05;
          const direction = index % 2 === 0 ? 1 : -1;
          const translateY = (scrollProgress - 0.5) * direction * speed * 100;
          
          (card as HTMLElement).style.transform = `translateY(${translateY}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={cn(
        "min-h-screen py-24 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500",
        theme === 'dark' ? 'bg-transparent' : 'bg-white/5'
      )}
    >
      <div 
        ref={containerRef}
        className={cn(
          "max-w-6xl mx-auto px-6 py-16 rounded-2xl relative z-10",
          theme === 'dark' ? 'bg-black/10' : 'bg-white/10',
          "backdrop-blur-md border-t border-l",
          theme === 'dark' ? 'border-white/5' : 'border-cosmic-purple/10'
        )}
      >
        {/* Section heading with glowing effect */}
        <div className="mb-16 relative">
          <h2 className={cn(
            "text-4xl md:text-5xl font-bold mb-4 relative transition-colors duration-500",
            theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
          )}>
            <span className="relative inline-block">
              <span className="relative z-10">The Quantum Experience</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cosmic-purple to-cosmic-blue opacity-70 blur-xl filter-none"></span>
            </span>
          </h2>
          
          <p className={cn(
            "max-w-2xl text-center mx-auto transition-colors duration-500",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}>
            Enter a new dimension of hackathons where innovation meets quantum computing paradigms.
            Our event transcends traditional coding challenges, opening gateways to technological breakthroughs.
          </p>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-20 h-20 opacity-20">
            <div className="absolute inset-0 rounded-full bg-cosmic-purple animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-cosmic-pink animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-8 rounded-full bg-cosmic-blue animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        {/* Features grid with our new QuantumCard component */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <QuantumCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              index={index}
              className="h-full"
            />
          ))}
        </div>
        
        {/* Additional features highlight */}
        <div className="mt-16 relative">
          <div className={cn(
            "p-6 rounded-xl transition-all duration-500",
            theme === 'dark' 
              ? 'bg-black/30 border border-white/10' 
              : 'bg-white/50 border border-cosmic-purple/10',
            "backdrop-blur-sm"
          )}>
            <h3 className={cn(
              "text-2xl font-bold mb-4 transition-colors duration-500",
              theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
            )}>
              Beyond Traditional Boundaries
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className={cn(
                "p-4 rounded-lg transition-all duration-300 hover:transform hover:scale-105",
                theme === 'dark' ? 'bg-black/30' : 'bg-white/50',
                "border",
                theme === 'dark' ? 'border-white/10' : 'border-cosmic-purple/10'
              )}>
                <div className="text-2xl mb-2">🚀</div>
                <h4 className={theme === 'dark' ? 'text-white font-medium' : 'text-cosmic-deepPurple font-medium'}>
                  Launch Innovation Lab
                </h4>
                <p className={cn(
                  "text-sm mt-2",
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Access cutting-edge equipment and experimental technologies rarely available at hackathons.
                </p>
              </div>
              
              <div className={cn(
                "p-4 rounded-lg transition-all duration-300 hover:transform hover:scale-105",
                theme === 'dark' ? 'bg-black/30' : 'bg-white/50',
                "border",
                theme === 'dark' ? 'border-white/10' : 'border-cosmic-purple/10'
              )}>
                <div className="text-2xl mb-2">💡</div>
                <h4 className={theme === 'dark' ? 'text-white font-medium' : 'text-cosmic-deepPurple font-medium'}>
                  Quantum Workshops
                </h4>
                <p className={cn(
                  "text-sm mt-2",
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Specialized training in emerging fields like quantum computing and advanced AI models.
                </p>
              </div>
              
              <div className={cn(
                "p-4 rounded-lg transition-all duration-300 hover:transform hover:scale-105",
                theme === 'dark' ? 'bg-black/30' : 'bg-white/50',
                "border",
                theme === 'dark' ? 'border-white/10' : 'border-cosmic-purple/10'
              )}>
                <div className="text-2xl mb-2">🌈</div>
                <h4 className={theme === 'dark' ? 'text-white font-medium' : 'text-cosmic-deepPurple font-medium'}>
                  Holographic Demos
                </h4>
                <p className={cn(
                  "text-sm mt-2",
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Present your projects using advanced visualization technology for immersive demonstrations.
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -left-10 w-20 h-20 opacity-20">
            <div className="absolute inset-0 rounded-full bg-cosmic-blue animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-cosmic-purple animate-pulse" style={{ animationDelay: '0.7s' }}></div>
            <div className="absolute inset-8 rounded-full bg-cosmic-pink animate-pulse" style={{ animationDelay: '1.3s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuantumFeatures;
