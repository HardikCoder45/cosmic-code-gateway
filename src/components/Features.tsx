
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: "48-Hour Coding Challenge",
    description: "Push your limits in our intensive two-day coding marathon with mentors available 24/7.",
    color: "from-cosmic-purple to-cosmic-blue",
    delay: 0
  },
  {
    title: "10K+ in Prizes",
    description: "Compete for substantial cash prizes, tech gear, and exclusive opportunities with industry leaders.",
    color: "from-cosmic-pink to-cosmic-purple",
    delay: 200
  },
  {
    title: "Expert Mentorship",
    description: "Get guidance from senior developers, startup founders, and tech innovators in real-time.",
    color: "from-cosmic-blue to-cosmic-orange",
    delay: 400
  },
  {
    title: "Networking Opportunities",
    description: "Connect with fellow hackers, sponsors, and recruiters looking for fresh talent.",
    color: "from-cosmic-orange to-cosmic-pink",
    delay: 600
  }
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
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
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen py-20 flex flex-col items-center justify-center relative"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-cosmic-purple text-glow mb-4">
        The Cosmic Experience
      </h2>
      
      <p className="text-gray-300 max-w-2xl text-center mb-16 px-4">
        Our hackathon isn't just an event—it's a journey through digital space where innovation, 
        creativity, and technology converge to create something extraordinary.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "feature-card opacity-0 translate-y-10 transition-all duration-700 cosmic-card",
              `bg-gradient-to-br ${feature.color} bg-opacity-10 hover:bg-opacity-20`
            )}
            style={{ transitionDelay: `${feature.delay}ms` }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
