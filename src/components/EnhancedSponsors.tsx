
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { ExternalLink, Award, Star, Gift, Rocket } from 'lucide-react';

// Extended sponsor data with more information
const sponsorTiers = [
  {
    tier: "Quantum Pioneers",
    description: "Our main visionaries pushing the boundaries of technology",
    sponsors: [
      { 
        name: "NebulaX", 
        logo: "/logos/nebulax.svg", 
        industry: "Quantum Computing",
        founded: 2018,
        contribution: "Computing Resources & API Access",
        website: "https://nebulax.tech"
      },
      { 
        name: "CosmoTech", 
        logo: "/logos/cosmotech.svg", 
        industry: "Space Technology",
        founded: 2015,
        contribution: "Hardware & Engineering Mentorship",
        website: "https://cosmotech.space"
      },
      { 
        name: "StellarAI", 
        logo: "/logos/stellarai.svg", 
        industry: "Artificial Intelligence",
        founded: 2020,
        contribution: "AI Infrastructure & Cloud Credits",
        website: "https://stellar.ai"
      }
    ],
    icon: <Rocket className="text-cosmic-pink" size={24} />,
    color: "from-cosmic-purple to-cosmic-pink"
  },
  {
    tier: "Cosmic Accelerators",
    description: "Technology innovators driving digital transformation",
    sponsors: [
      { 
        name: "ParticleX", 
        logo: "/logos/particlex.svg", 
        industry: "Developer Tooling",
        founded: 2017,
        contribution: "Development Environment & Toolchain",
        website: "https://particlex.dev"
      },
      { 
        name: "GalaxyCorp", 
        logo: "/logos/galaxycorp.svg", 
        industry: "Enterprise Solutions",
        founded: 2013, 
        contribution: "Business Mentorship & Networking",
        website: "https://galaxycorp.io"
      },
      { 
        name: "PulsarLabs", 
        logo: "/logos/pulsarlabs.svg", 
        industry: "Data Science",
        founded: 2019,
        contribution: "Data Processing & Analytics",
        website: "https://pulsarlabs.data"
      },
      { 
        name: "NeutronSys", 
        logo: "/logos/neutronsys.svg", 
        industry: "Cybersecurity",
        founded: 2016,
        contribution: "Security Testing & Audit",
        website: "https://neutronsys.secure"
      }
    ],
    icon: <Star className="text-cosmic-orange" size={24} />,
    color: "from-cosmic-blue to-cosmic-orange"
  },
  {
    tier: "Stellar Supporters",
    description: "Ecosystem partners helping innovations reach orbit",
    sponsors: [
      { 
        name: "VortexHost", 
        logo: "/logos/vortexhost.svg", 
        industry: "Cloud Hosting",
        founded: 2015,
        contribution: "Hosting Credits & DevOps Support",
        website: "https://vortexhost.cloud"
      },
      { 
        name: "EventHorizon", 
        logo: "/logos/eventhorizon.svg", 
        industry: "Event Technology",
        founded: 2020,
        contribution: "Virtual Event Platform",
        website: "https://eventhorizon.events"
      },
      { 
        name: "QuantumVentures", 
        logo: "/logos/quantumventures.svg", 
        industry: "Venture Capital",
        founded: 2014,
        contribution: "Seed Funding & Investor Access",
        website: "https://quantum.vc"
      },
      { 
        name: "AstroDesign", 
        logo: "/logos/astrodesign.svg", 
        industry: "Design & UI/UX",
        founded: 2018,
        contribution: "Design Resources & Consultation",
        website: "https://astrodesign.co"
      },
      { 
        name: "OrbitMedia", 
        logo: "/logos/orbitmedia.svg", 
        industry: "Media & PR",
        founded: 2017,
        contribution: "Media Coverage & Content Creation",
        website: "https://orbitmedia.press"
      },
      { 
        name: "WarpLink", 
        logo: "/logos/warplink.svg", 
        industry: "Telecommunications",
        founded: 2019,
        contribution: "Network Infrastructure & IoT Devices",
        website: "https://warplink.net"
      }
    ],
    icon: <Gift className="text-cosmic-blue" size={24} />,
    color: "from-cosmic-pink to-cosmic-blue"
  }
];

const EnhancedSponsors = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState(0);
  const [hoverSponsor, setHoverSponsor] = useState<number | null>(null);
  const [showParticles, setShowParticles] = useState(false);
  
  // Create particle animation
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Add keyframes if not already defined
    if (!document.getElementById('sponsor-particles-keyframes')) {
      const keyframes = document.createElement('style');
      keyframes.id = 'sponsor-particles-keyframes';
      keyframes.textContent = `
        @keyframes floatParticle {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          25% { opacity: 0.5; }
          75% { opacity: 0.5; }
          100% { transform: translate(var(--x), var(--y)) rotate(var(--r)); opacity: 0; }
        }
      `;
      document.head.appendChild(keyframes);
    }
    
    // Create particles on reveal
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowParticles(true);
        }
      },
      { threshold: 0.2 }
    );
    
    observer.observe(container);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Generate particles when section is in view
  useEffect(() => {
    if (!showParticles || !containerRef.current) return;
    
    const container = containerRef.current;
    const particleCount = 30;
    
    // Remove any existing particles
    const existingParticles = container.querySelectorAll('.sponsor-particle');
    existingParticles.forEach(p => p.remove());
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        if (!containerRef.current) return;
        
        const particle = document.createElement('div');
        particle.classList.add('sponsor-particle');
        
        // Random properties
        const size = 1 + Math.random() * 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = 0.1 + Math.random() * 0.4;
        const duration = 10 + Math.random() * 20;
        
        // Random movement
        const translateX = (Math.random() - 0.5) * 200;
        const translateY = (Math.random() - 0.5) * 200;
        const rotation = Math.random() * 360;
        
        // Apply styles
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = theme === 'dark' ? 'white' : '#6E59A5';
        particle.style.opacity = `${opacity}`;
        particle.style.pointerEvents = 'none';
        
        // Set CSS variables for the animation
        particle.style.setProperty('--x', `${translateX}px`);
        particle.style.setProperty('--y', `${translateY}px`);
        particle.style.setProperty('--r', `${rotation}deg`);
        
        // Animation
        particle.style.animation = `floatParticle ${duration}s linear forwards`;
        
        container.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, duration * 1000);
      }, i * 300); // Staggered creation
    }
  }, [showParticles, theme]);
  
  return (
    <section 
      id="sponsors" 
      ref={containerRef}
      className={cn(
        "relative min-h-screen py-24 overflow-hidden transition-colors duration-500",
        theme === 'dark' ? 'bg-transparent' : 'bg-white/5'
      )}
      data-section="sponsors"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="mb-4">
            <Award 
              size={48} 
              className={cn(
                "inline-block opacity-90 transition-colors duration-500",
                theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
              )} 
            />
          </div>
          
          <h2 
            data-animate="fade-up" 
            className={cn(
              "text-4xl md:text-5xl font-bold mb-6 inline-block relative transition-colors duration-500",
              theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
            )}
          >
            <span className="relative z-10">Our Cosmic Collaborators</span>
            <span className="absolute inset-0 blur-xl bg-gradient-to-r from-cosmic-purple to-cosmic-blue opacity-30 filter-none"></span>
          </h2>
          
          <p 
            data-animate="fade-up" 
            data-delay="200" 
            className={cn(
              "max-w-3xl mx-auto text-lg transition-colors duration-500",
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            )}
          >
            These visionary organizations fuel our mission to advance technology and innovation.
            Their support powers the next generation of breakthrough ideas and solutions.
          </p>
          
          {/* Decorative elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 opacity-20 pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-cosmic-blue animate-pulse"></div>
            <div className="absolute inset-8 rounded-full bg-cosmic-purple animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-16 rounded-full bg-cosmic-pink animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        {/* Sponsor tier tabs */}
        <div 
          className={cn(
            "flex flex-wrap justify-center gap-3 mb-12 relative",
            "before:absolute before:bottom-0 before:left-0 before:right-0 before:h-px",
            theme === 'dark' ? 'before:bg-white/10' : 'before:bg-cosmic-purple/10'
          )}
        >
          {sponsorTiers.map((tier, index) => (
            <button
              key={index}
              data-animate="scale-in"
              data-delay={`${index * 100}`}
              className={cn(
                "px-5 py-3 rounded-t-lg text-sm md:text-base font-medium flex items-center gap-2 relative transition-all duration-300",
                activeTier === index 
                  ? theme === 'dark'
                    ? 'text-white bg-black/30 border-t border-l border-r border-white/10'
                    : 'text-cosmic-deepPurple bg-white/50 border-t border-l border-r border-cosmic-purple/10'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-500 hover:text-cosmic-deepPurple'
              )}
              onClick={() => setActiveTier(index)}
            >
              <span className="relative z-10 flex items-center gap-2">
                {tier.icon}
                {tier.tier}
              </span>
              
              {/* Active indicator */}
              {activeTier === index && (
                <span 
                  className="absolute inset-0 overflow-hidden rounded-t-lg"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(to right, rgba(155, 135, 245, 0.1), rgba(217, 70, 239, 0.1))'
                      : 'linear-gradient(to right, rgba(155, 135, 245, 0.05), rgba(217, 70, 239, 0.05))'
                  }}
                ></span>
              )}
            </button>
          ))}
        </div>
        
        {/* Tier description */}
        <div 
          data-animate="fade-up"
          className={cn(
            "text-center mb-8 max-w-2xl mx-auto transition-colors duration-500",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}
        >
          <p className="mb-4">{sponsorTiers[activeTier].description}</p>
          <div 
            className={cn(
              "h-1 w-24 mx-auto rounded-full bg-gradient-to-r",
              sponsorTiers[activeTier].color
            )}
          ></div>
        </div>
        
        {/* Sponsors grid with interactive cards */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          data-animate="fade-up"
          data-delay="300"
        >
          {sponsorTiers[activeTier].sponsors.map((sponsor, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-xl transition-all duration-500",
                theme === 'dark' 
                  ? 'bg-black/30 border border-white/10 hover:border-cosmic-purple/30' 
                  : 'bg-white/70 border border-cosmic-purple/10 hover:border-cosmic-purple/30',
                "backdrop-blur-sm"
              )}
              onMouseEnter={() => setHoverSponsor(index)}
              onMouseLeave={() => setHoverSponsor(null)}
              data-magnetic="0.2"
            >
              {/* Background effect */}
              <div 
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl",
                  "bg-gradient-to-br",
                  sponsorTiers[activeTier].color
                )}
              ></div>
              
              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Logo placeholder - would be replaced with actual logo */}
                <div className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-4",
                  theme === 'dark' ? 'bg-white/5' : 'bg-cosmic-purple/5'
                )}>
                  {sponsor.name.charAt(0)}
                </div>
                
                <h4 className={cn(
                  "text-xl font-semibold mb-2 transition-colors duration-500",
                  theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                )}>
                  {sponsor.name}
                </h4>
                
                <p className={cn(
                  "text-sm mb-3 opacity-90 transition-colors duration-500",
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                )}>
                  {sponsor.industry} • Est. {sponsor.founded}
                </p>
                
                <p className={cn(
                  "text-sm flex-grow mb-4 transition-colors duration-500",
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                )}>
                  {sponsor.contribution}
                </p>
                
                <a 
                  href={sponsor.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center text-sm group-hover:underline transition-colors duration-500",
                    theme === 'dark' ? 'text-cosmic-purple hover:text-cosmic-pink' : 'text-cosmic-deepPurple hover:text-cosmic-purple'
                  )}
                >
                  Visit Website <ExternalLink size={14} className="ml-1" />
                </a>
                
                {/* Particles on hover */}
                {hoverSponsor === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-ping"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          backgroundColor: theme === 'dark' ? 'white' : '#6E59A5',
                          animationDuration: `${0.6 + Math.random() * 0.8}s`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Become a sponsor */}
        <div 
          className="mt-20 max-w-3xl mx-auto"
          data-animate="fade-up"
          data-delay="500"
        >
          <div className={cn(
            "p-8 rounded-xl relative overflow-hidden transition-all duration-500",
            theme === 'dark' 
              ? 'bg-black/40 border border-white/10' 
              : 'bg-white/70 border border-cosmic-purple/10',
            "backdrop-blur-lg"
          )}>
            {/* Background glow */}
            <div 
              className="absolute inset-0 opacity-20 bg-gradient-to-br from-cosmic-purple via-cosmic-pink to-cosmic-blue"
              style={{
                filter: 'blur(40px)',
                transform: 'translateY(30%) scale(1.5)',
              }}
            ></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-grow">
                  <h3 className={cn(
                    "text-2xl font-bold mb-3 transition-colors duration-500",
                    theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                  )}>
                    Join Our Cosmic Innovation Network
                  </h3>
                  
                  <p className={cn(
                    "mb-6 transition-colors duration-500",
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Become a sponsor and connect with the brightest minds in technology. 
                    Support the next generation of innovators and position your brand at the 
                    forefront of technological advancement.
                  </p>
                  
                  <ul className={cn(
                    "grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 text-sm",
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {[
                      "Brand visibility to tech innovators", 
                      "Access to cutting-edge projects",
                      "Talent recruitment opportunities", 
                      "Product testing and feedback",
                      "Innovation partnership potential",
                      "Community engagement"
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center">
                        <Star size={12} className="mr-2 text-cosmic-purple" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex-shrink-0 text-center">
                  <a 
                    href="#contact" 
                    className={cn(
                      "inline-block px-6 py-3 rounded-lg font-medium transition-all duration-300",
                      theme === 'dark' 
                        ? 'bg-cosmic-purple text-white hover:bg-cosmic-deepPurple' 
                        : 'bg-cosmic-deepPurple text-white hover:bg-cosmic-purple',
                      "hover:shadow-lg hover:shadow-cosmic-purple/20"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Become a Sponsor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedSponsors;
