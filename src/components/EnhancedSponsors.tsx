
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';

const sponsorCategories = [
  {
    tier: "Cosmic Partners",
    description: "Our primary supporters who make the entire hackathon possible",
    color: "from-cosmic-purple to-cosmic-blue",
    sponsors: [
      { name: "TechNova", logo: "🚀", website: "#", description: "Pioneering space technology and digital innovation" },
      { name: "Galaxy Innovations", logo: "⚛️", website: "#", description: "Building the next generation of quantum computing systems" },
      { name: "Quantum Systems", logo: "💻", website: "#", description: "Leading provider of cloud infrastructure and services" }
    ]
  },
  {
    tier: "Stellar Sponsors",
    description: "Major contributors who fund key elements of our hackathon",
    color: "from-cosmic-pink to-cosmic-purple",
    sponsors: [
      { name: "NebulaTech", logo: "☁️", website: "#", description: "Innovative cloud solutions for modern applications" },
      { name: "Binary Stars", logo: "⭐", website: "#", description: "Cutting-edge machine learning and AI infrastructure" },
      { name: "Comet Solutions", logo: "💫", website: "#", description: "Fast and reliable data processing platforms" },
      { name: "Orbit Dynamics", logo: "🌌", website: "#", description: "Next-gen motion tracking and spatial computing" }
    ]
  },
  {
    tier: "Planetary Supporters",
    description: "Valuable sponsors providing prizes, resources, and mentorship",
    color: "from-cosmic-blue to-cosmic-orange",
    sponsors: [
      { name: "AstroCode", logo: "👩‍💻", website: "#", description: "Developer tools for the modern engineer" },
      { name: "LaunchPad", logo: "🛸", website: "#", description: "Startup accelerator for technical founders" },
      { name: "CodeVerse", logo: "🌐", website: "#", description: "Interactive online learning platform" },
      { name: "Satellite Systems", logo: "🛰️", website: "#", description: "Global communications and networking" },
      { name: "RocketFuel Dev", logo: "⚡", website: "#", description: "High-performance computing and energy solutions" },
      { name: "MoonShot Inc", logo: "🌙", website: "#", description: "Venture capital for ambitious tech startups" }
    ]
  }
];

const EnhancedSponsors = () => {
  const { theme } = useTheme();
  const [hoveredSponsor, setHoveredSponsor] = useState<number | null>(null);
  const [categoryIndex, setCategoryIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sponsorsGridRef = useRef<HTMLDivElement>(null);
  
  // Galaxy background effect with sponsor logos orbiting
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Create galaxy background
    const container = sectionRef.current;
    const galaxyCanvas = document.createElement('canvas');
    galaxyCanvas.className = 'absolute inset-0 w-full h-full opacity-20 pointer-events-none';
    galaxyCanvas.width = container.offsetWidth;
    galaxyCanvas.height = container.offsetHeight;
    
    container.appendChild(galaxyCanvas);
    
    const ctx = galaxyCanvas.getContext('2d');
    if (!ctx) return;
    
    // Create stars
    const stars: { x: number; y: number; radius: number; speed: number; opacity: number }[] = [];
    
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * galaxyCanvas.width,
        y: Math.random() * galaxyCanvas.height,
        radius: Math.random() * 1.5,
        speed: 0.1 + Math.random() * 0.3,
        opacity: 0.2 + Math.random() * 0.8
      });
    }
    
    // Create image textures for sponsor logos (simplified with colored circles)
    const logoColors = [
      '#9b87f5', // Purple
      '#D946EF', // Pink
      '#0EA5E9', // Blue
      '#F97316'  // Orange
    ];
    
    // Create sponsor particles
    const sponsorParticles: { x: number; y: number; radius: number; color: string; angle: number; distance: number; speed: number }[] = [];
    
    for (let i = 0; i < 30; i++) {
      sponsorParticles.push({
        x: galaxyCanvas.width / 2,
        y: galaxyCanvas.height / 2,
        radius: 2 + Math.random() * 3,
        color: logoColors[Math.floor(Math.random() * logoColors.length)],
        angle: Math.random() * Math.PI * 2,
        distance: 50 + Math.random() * 300,
        speed: 0.001 + Math.random() * 0.002
      });
    }
    
    // Animation loop
    const animate = () => {
      if (!ctx || !galaxyCanvas.parentElement) {
        return;
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);
      
      // Center of the galaxy
      const centerX = galaxyCanvas.width / 2;
      const centerY = galaxyCanvas.height / 2;
      
      // Draw galaxy center glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
      gradient.addColorStop(0, theme === 'dark' ? 'rgba(155, 135, 245, 0.2)' : 'rgba(155, 135, 245, 0.1)');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark' ? `rgba(255, 255, 255, ${star.opacity})` : `rgba(155, 135, 245, ${star.opacity})`;
        ctx.fill();
        
        // Move stars - parallax effect based on size
        star.x -= star.speed;
        
        // Reset if off screen
        if (star.x < -5) {
          star.x = galaxyCanvas.width + 5;
          star.y = Math.random() * galaxyCanvas.height;
        }
      });
      
      // Draw sponsor particles
      sponsorParticles.forEach(particle => {
        // Update position
        particle.angle += particle.speed;
        const x = centerX + Math.cos(particle.angle) * particle.distance;
        const y = centerY + Math.sin(particle.angle) * particle.distance;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + (theme === 'dark' ? '80' : '40'); // Hex opacity
        ctx.fill();
        
        // Draw orbit path
        ctx.beginPath();
        ctx.arc(centerX, centerY, particle.distance, 0, Math.PI * 2);
        ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(155, 135, 245, 0.03)';
        ctx.stroke();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!galaxyCanvas.parentElement) return;
      
      galaxyCanvas.width = container.offsetWidth;
      galaxyCanvas.height = container.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (galaxyCanvas.parentElement) {
        galaxyCanvas.parentElement.removeChild(galaxyCanvas);
      }
    };
  }, [theme]);
  
  // Interactive card tilting effect
  useEffect(() => {
    if (!sponsorsGridRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const sponsorCards = document.querySelectorAll('.sponsor-card');
      sponsorCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to card center
        const distX = (e.clientX - cardCenterX) / (rect.width / 2);
        const distY = (e.clientY - cardCenterY) / (rect.height / 2);
        
        // Only apply tilt effect if mouse is close to card
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 2) {
          // Calculate tilt angle (max 10 degrees)
          const tiltX = 10 * (distY / 2);
          const tiltY = -10 * (distX / 2);
          
          card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
          card.style.zIndex = '1';
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
          card.style.zIndex = '0';
        }
      });
    };
    
    const handleMouseLeave = () => {
      const sponsorCards = document.querySelectorAll('.sponsor-card');
      sponsorCards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.zIndex = '0';
      });
    };
    
    sponsorsGridRef.current.addEventListener('mousemove', handleMouseMove);
    sponsorsGridRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (sponsorsGridRef.current) {
        sponsorsGridRef.current.removeEventListener('mousemove', handleMouseMove);
        sponsorsGridRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  return (
    <section 
      id="sponsors" 
      ref={sectionRef}
      className={cn(
        "py-20 relative transition-colors duration-500 overflow-hidden",
        theme === 'dark' ? 'bg-transparent' : 'bg-white/5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 z-10 relative">
        <h2 className={cn(
          "text-4xl md:text-5xl font-bold mb-4 text-center transition-colors duration-500",
          theme === 'dark' ? 'text-cosmic-purple text-glow' : 'text-cosmic-deepPurple'
        )}>
          Our Sponsors
        </h2>
        
        <p className={cn(
          "max-w-2xl mx-auto text-center mb-16 transition-colors duration-500",
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}>
          These stellar organizations make our hackathon possible. 
          Their support fuels innovation and helps launch the next generation of tech.
        </p>
        
        <div className="w-full space-y-32 mb-20">
          {sponsorCategories.map((category, categoryIdx) => (
            <div 
              key={categoryIdx} 
              className="space-y-6"
              onMouseEnter={() => setCategoryIndex(categoryIdx)}
              onMouseLeave={() => setCategoryIndex(null)}
            >
              <div className="text-center space-y-3">
                <h3 className={cn(
                  "text-2xl font-bold relative inline-block transition-colors duration-500",
                  theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
                )}>
                  {category.tier}
                  
                  {/* Animated underline */}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-300",
                    `bg-gradient-to-r ${category.color}`,
                    categoryIndex === categoryIdx && "scale-x-100"
                  )}></span>
                </h3>
                
                <p className={cn(
                  "text-center mx-auto max-w-xl transition-colors duration-500",
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                )}>
                  {category.description}
                </p>
              </div>
              
              <div 
                ref={sponsorsGridRef}
                className={cn(
                  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
                  category.tier === "Cosmic Partners" && "lg:grid-cols-3",
                  category.tier === "Stellar Sponsors" && "lg:grid-cols-4",
                  category.tier === "Planetary Supporters" && "sm:grid-cols-3"
                )}
              >
                {category.sponsors.map((sponsor, index) => {
                  const sponsorIndex = categoryIdx * 100 + index;
                  return (
                    <div 
                      key={index}
                      className="sponsor-card-container perspective"
                      onMouseEnter={() => setHoveredSponsor(sponsorIndex)}
                      onMouseLeave={() => setHoveredSponsor(null)}
                    >
                      <div 
                        data-hoverable="true"
                        className={cn(
                          "sponsor-card h-full transition-all duration-300 relative",
                          "rounded-xl overflow-hidden",
                          theme === 'dark'
                            ? 'bg-black/40 border border-white/10 backdrop-blur-sm'
                            : 'bg-white/70 border border-cosmic-purple/10 backdrop-blur-sm'
                        )}
                      >
                        {/* Background gradient */}
                        <div className={cn(
                          "absolute inset-0 opacity-0 transition-opacity duration-500",
                          `bg-gradient-to-br ${category.color}`,
                          hoveredSponsor === sponsorIndex ? "opacity-10" : "opacity-0"
                        )}></div>
                        
                        <div className="p-6 relative z-10 h-full flex flex-col">
                          {/* Logo & Name */}
                          <div className="flex items-center mb-4">
                            <div className={cn(
                              "text-4xl mr-3 transition-transform duration-300",
                              hoveredSponsor === sponsorIndex && "transform scale-110"
                            )}>
                              {sponsor.logo}
                            </div>
                            
                            <h4 className={cn(
                              "text-xl font-bold transition-colors duration-500",
                              theme === 'dark' ? 'text-white' : 'text-cosmic-darkPurple'
                            )}>
                              {sponsor.name}
                            </h4>
                          </div>
                          
                          {/* Description */}
                          <p className={cn(
                            "mb-4 flex-grow transition-colors duration-500",
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          )}>
                            {sponsor.description}
                          </p>
                          
                          {/* Visit website button */}
                          <a 
                            href={sponsor.website}
                            className={cn(
                              "inline-flex items-center text-sm py-1 px-3 rounded-full transition-all duration-300",
                              theme === 'dark'
                                ? 'bg-cosmic-purple/20 text-white hover:bg-cosmic-purple/40'
                                : 'bg-cosmic-purple/10 text-cosmic-deepPurple hover:bg-cosmic-purple/20'
                            )}
                          >
                            <span>Visit website</span>
                            <span className={cn(
                              "ml-1 transition-transform duration-300",
                              hoveredSponsor === sponsorIndex && "transform translate-x-1"
                            )}>→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className={cn(
          "rounded-2xl p-8 max-w-3xl mx-auto relative transition-all duration-500",
          theme === 'dark'
            ? 'bg-black/50 border border-cosmic-purple/20 backdrop-blur-lg'
            : 'bg-white/70 border border-cosmic-purple/10 backdrop-blur-lg'
        )}>
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute w-full h-full bg-gradient-to-br from-cosmic-purple via-cosmic-pink to-cosmic-blue animate-spin" 
                style={{ 
                  animationDuration: '20s', 
                  transform: 'translateY(-50%) rotate(45deg)', 
                  width: '200%', 
                  height: '200%' 
                }}
              ></div>
            </div>
          </div>
          
          <div className="relative z-10">
            <h3 className={cn(
              "text-2xl font-bold mb-4 transition-colors duration-500",
              theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
            )}>
              Become a Sponsor
            </h3>
            
            <p className={cn(
              "mb-6 transition-colors duration-500",
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            )}>
              Want to support the next generation of innovators? Join our mission and connect your brand with talented developers, designers, and tech entrepreneurs from around the world.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#" 
                data-hoverable="true"
                className={cn(
                  "cosmic-button relative overflow-hidden group transition-all duration-300",
                  theme === 'dark' 
                    ? 'bg-cosmic-purple hover:bg-cosmic-deepPurple' 
                    : 'bg-cosmic-deepPurple hover:bg-cosmic-purple'
                )}
              >
                <span className="relative z-10">Contact Us</span>
                
                {/* Button glow effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-0 bg-gradient-to-r from-cosmic-pink via-cosmic-purple to-cosmic-blue opacity-60 blur-md"></span>
                </span>
              </a>
              
              <a 
                href="#" 
                data-hoverable="true"
                className={cn(
                  "px-6 py-3 rounded-full transition-all duration-300",
                  theme === 'dark' 
                    ? 'bg-transparent border border-cosmic-purple text-cosmic-purple hover:bg-cosmic-purple/10' 
                    : 'bg-transparent border border-cosmic-deepPurple text-cosmic-deepPurple hover:bg-cosmic-purple/10'
                )}
              >
                Download Sponsorship Deck
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedSponsors;
