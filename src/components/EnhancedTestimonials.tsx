
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { Quote, Star, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';

// Testimonial data
const testimonials = [
  {
    name: "Alex Chen",
    role: "Software Engineer, TechCorp",
    image: "/avatars/alex.jpg",
    quote: "The Quantum Hackathon was truly transformative. The mentorship and resources provided helped our team develop a solution that we've now turned into a startup with seed funding.",
    rating: 5,
    highlight: "Turned hackathon project into funded startup",
    year: "2024"
  },
  {
    name: "Sophia Rodriguez",
    role: "AI Researcher, Neural Labs",
    image: "/avatars/sophia.jpg",
    quote: "An exceptionally well-organized event with cutting-edge challenges. The quantum computing workshop changed my approach to algorithm design and led to a breakthrough in my research.",
    rating: 5,
    highlight: "Led to research breakthrough",
    year: "2023"
  },
  {
    name: "Marcus Johnson",
    role: "CTO, Orbital Systems",
    image: "/avatars/marcus.jpg",
    quote: "As both a participant and now a mentor, I've seen firsthand how this hackathon pushes the boundaries of innovation. The network I built here has been invaluable for my career trajectory.",
    rating: 5,
    highlight: "Career-changing connections",
    year: "2022"
  },
  {
    name: "Zara Khan",
    role: "Full-stack Developer",
    image: "/avatars/zara.jpg",
    quote: "The cosmic-themed hackathon provided the perfect space to experiment with emerging technologies. Our team's solution received immediate interest from several VCs in attendance.",
    rating: 5,
    highlight: "Gained VC attention post-event",
    year: "2024"
  },
  {
    name: "Devon Park",
    role: "Data Scientist, Quantum Analytics",
    image: "/avatars/devon.jpg",
    quote: "The challenge prompts were incredibly well designed, pushing us to think beyond conventional solutions. The caliber of projects and participants was simply unmatched.",
    rating: 4,
    highlight: "Unparalleled project quality",
    year: "2023"
  }
];

const EnhancedTestimonials = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle testimonial navigation
  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  // Reset transition state after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeIndex]);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleNext();
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isTransitioning]);
  
  // Particle animation effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particleCount = 30;
    
    // Create floating particles
    const createParticles = () => {
      // Remove existing particles
      const existingParticles = container.querySelectorAll('.testimonial-particle');
      existingParticles.forEach(p => p.remove());
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('testimonial-particle');
        
        // Random properties
        const size = 1 + Math.random() * 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = 0.1 + Math.random() * 0.3;
        const duration = 20 + Math.random() * 40;
        const delay = Math.random() * 10;
        
        // Set styles
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = theme === 'dark' ? 'white' : '#6E59A5';
        particle.style.opacity = opacity.toString();
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.pointerEvents = 'none';
        
        // Animation
        particle.style.animation = `floatParticle ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
      }
    };
    
    // Create keyframes if they don't exist
    if (!document.getElementById('testimonial-particle-keyframes')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'testimonial-particle-keyframes';
      styleEl.textContent = `
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
          50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
          75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
        }
      `;
      document.head.appendChild(styleEl);
    }
    
    createParticles();
    
    return () => {
      const el = document.getElementById('testimonial-particle-keyframes');
      if (el) el.remove();
    };
  }, [theme]);
  
  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={cn(
              "mr-0.5 transition-colors duration-300",
              i < rating
                ? "fill-cosmic-purple text-cosmic-purple"
                : "text-gray-400"
            )}
          />
        ))}
      </div>
    );
  };
  
  return (
    <section 
      id="testimonials"
      ref={containerRef}
      className={cn(
        "relative min-h-screen py-24 overflow-hidden transition-colors duration-500",
        theme === 'dark' ? 'bg-transparent' : 'bg-white/5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-4">
            <MessageSquare 
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
            <span className="relative z-10">Cosmic Voices</span>
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
            Hear from participants who've journeyed through our quantum hackathon experience
            and emerged with transformative innovations and connections.
          </p>
        </div>
        
        {/* Testimonial Display */}
        <div 
          ref={testimonialRef}
          className="max-w-4xl mx-auto"
          data-animate="fade-up"
          data-delay="400"
        >
          <div className={cn(
            "p-8 md:p-12 rounded-2xl relative overflow-hidden transition-all duration-500",
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
            
            {/* Quote icon */}
            <Quote 
              size={60} 
              className={cn(
                "absolute top-8 left-8 opacity-10 transition-colors duration-500",
                theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
              )} 
            />
            
            {/* Testimonial content */}
            <div className={cn(
              "relative z-10 transition-opacity duration-500",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
                {/* Image placeholder (would be replaced with actual image) */}
                <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 relative">
                  <div className={cn(
                    "absolute inset-0 flex items-center justify-center text-2xl font-bold transition-colors duration-500",
                    theme === 'dark' ? 'bg-cosmic-purple/20 text-white' : 'bg-cosmic-purple/10 text-cosmic-deepPurple'
                  )}>
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  {/* Highlight tag */}
                  <div className="mb-4">
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-sm font-medium transition-all duration-500",
                      theme === 'dark' 
                        ? 'bg-cosmic-purple/20 text-cosmic-purple border border-cosmic-purple/30' 
                        : 'bg-cosmic-purple/10 text-cosmic-deepPurple border border-cosmic-purple/20'
                    )}>
                      {testimonials[activeIndex].highlight}
                    </span>
                  </div>
                  
                  {/* Quote */}
                  <blockquote className={cn(
                    "text-lg md:text-xl mb-6 transition-colors duration-500",
                    theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                  )}>
                    "{testimonials[activeIndex].quote}"
                  </blockquote>
                  
                  {/* Author info */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <div>
                      <div className={cn(
                        "font-semibold transition-colors duration-500",
                        theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                      )}>
                        {testimonials[activeIndex].name}
                      </div>
                      <div className={cn(
                        "text-sm transition-colors duration-500",
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      )}>
                        {testimonials[activeIndex].role}
                      </div>
                    </div>
                    
                    <div className="md:ml-auto flex items-center gap-3">
                      <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
                        <StarRating rating={testimonials[activeIndex].rating} />
                      </div>
                      <div className={cn(
                        "text-sm transition-colors duration-500",
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      )}>
                        Participant {testimonials[activeIndex].year}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-20 pointer-events-none">
              <button
                onClick={handlePrevious}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto",
                  theme === 'dark' 
                    ? 'bg-black/30 text-white hover:bg-cosmic-purple/30 backdrop-blur-sm' 
                    : 'bg-white/60 text-cosmic-deepPurple hover:bg-cosmic-purple/20 backdrop-blur-sm',
                  "border",
                  theme === 'dark' ? 'border-white/10' : 'border-cosmic-purple/10'
                )}
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={18} />
              </button>
              
              <button
                onClick={handleNext}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto",
                  theme === 'dark' 
                    ? 'bg-black/30 text-white hover:bg-cosmic-purple/30 backdrop-blur-sm' 
                    : 'bg-white/60 text-cosmic-deepPurple hover:bg-cosmic-purple/20 backdrop-blur-sm',
                  "border",
                  theme === 'dark' ? 'border-white/10' : 'border-cosmic-purple/10'
                )}
                aria-label="Next testimonial"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          
          {/* Testimonial indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isTransitioning) return;
                  setIsTransitioning(true);
                  setActiveIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? theme === 'dark'
                      ? "bg-cosmic-purple w-6"
                      : "bg-cosmic-deepPurple w-6"
                    : theme === 'dark'
                      ? "bg-white/30 hover:bg-white/50"
                      : "bg-cosmic-purple/30 hover:bg-cosmic-purple/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Additional testimonial stats */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
          data-animate="fade-up"
          data-delay="600"
        >
          {[
            {
              stat: "95%",
              description: "of participants reported significant skill improvement",
              icon: <Star className="text-cosmic-purple" size={24} />
            },
            {
              stat: "42",
              description: "projects have secured external funding after the event",
              icon: <MessageSquare className="text-cosmic-pink" size={24} />
            },
            {
              stat: "200+",
              description: "industry connections made during each hackathon",
              icon: <Quote className="text-cosmic-blue" size={24} />
            }
          ].map((item, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-xl transition-all duration-500 relative overflow-hidden group",
                theme === 'dark' 
                  ? 'bg-black/30 border border-white/10 hover:border-cosmic-purple/30' 
                  : 'bg-white/60 border border-cosmic-purple/10 hover:border-cosmic-purple/30',
                "backdrop-blur-sm"
              )}
            >
              <div className="relative z-10">
                <div className="mb-3">{item.icon}</div>
                
                <div className={cn(
                  "text-3xl font-bold mb-2 transition-colors duration-500",
                  theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                )}>
                  {item.stat}
                </div>
                
                <p className={cn(
                  "text-sm transition-colors duration-500",
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                )}>
                  {item.description}
                </p>
              </div>
              
              {/* Background hover effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-cosmic-purple to-cosmic-pink"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;
