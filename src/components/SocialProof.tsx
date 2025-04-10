
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Alex Chen",
    role: "AI Engineer",
    image: "https://source.unsplash.com/random/100x100?face-1",
    testimonial: "This hackathon completely transformed my career trajectory. The mentors were incredible, and I made connections that led to my dream job.",
    company: "TechForward AI"
  },
  {
    name: "Sarah Johnson",
    role: "Full-Stack Developer",
    image: "https://source.unsplash.com/random/100x100?face-2",
    testimonial: "The collaborative atmosphere was electric. Our team created something truly innovative in just 48 hours that we're still developing today.",
    company: "CodeCraft Solutions"
  },
  {
    name: "Miguel Ortiz",
    role: "UX Designer",
    image: "https://source.unsplash.com/random/100x100?face-3",
    testimonial: "As a designer, I was amazed by how technically inclusive this hackathon was. I learned so much and felt my contributions were genuinely valued.",
    company: "Interface Innovations"
  },
  {
    name: "Priya Sharma",
    role: "ML Researcher",
    image: "https://source.unsplash.com/random/100x100?face-4",
    testimonial: "The quantum computing challenges pushed us to think beyond traditional approaches. It was the most intellectually stimulating weekend of my year.",
    company: "QuantMatrix Labs"
  }
];

const SocialProof = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % testimonials.length);
      }, 5000);
    };

    startInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Pause rotation on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-cosmic-purple blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-cosmic-pink blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2 
          className={cn(
            "text-4xl md:text-5xl font-bold mb-16 text-center",
            theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Voices from the Quantum Realm
        </motion.h2>

        <div className="relative">
          {/* Testimonial cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className={cn(
                  "relative w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] transition-all duration-500",
                  idx === activeIndex ? "z-20 scale-105" : "z-10 opacity-70 scale-95"
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: idx === activeIndex ? 1 : 0.7, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={cn(
                  "h-full p-6 rounded-2xl backdrop-blur-md transition-all duration-300",
                  theme === 'dark' 
                    ? 'bg-black/30 border border-white/10' 
                    : 'bg-white/70 border border-cosmic-purple/10',
                  idx === activeIndex && "shadow-lg shadow-cosmic-purple/20"
                )}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cosmic-purple">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {idx === activeIndex && (
                        <div className="absolute inset-0 border-2 border-cosmic-pink rounded-full animate-ping"></div>
                      )}
                    </div>
                    <div>
                      <h4 className={cn(
                        "font-bold",
                        theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                      )}>{testimonial.name}</h4>
                      <p className="text-sm text-cosmic-purple">{testimonial.role} @ {testimonial.company}</p>
                    </div>
                  </div>
                  
                  <blockquote className={cn(
                    "text-base italic mb-4",
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    "{testimonial.testimonial}"
                  </blockquote>

                  {/* Decorative quote mark */}
                  <div className="absolute -bottom-4 -right-2 text-6xl opacity-20 text-cosmic-purple">
                    "
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-10 gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  idx === activeIndex 
                    ? "bg-cosmic-purple scale-125" 
                    : theme === 'dark' ? "bg-white/30" : "bg-cosmic-purple/30"
                )}
                aria-label={`View testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
