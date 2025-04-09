
import React, { useEffect } from 'react';

const ScrollManager: React.FC = () => {
  useEffect(() => {
    // Check if IntersectionObserver is available (browser support)
    if (!('IntersectionObserver' in window)) return;
    
    // Handle scroll reveal animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('[data-animate]');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Get animation data from element
            const el = entry.target;
            const animation = el.getAttribute('data-animate');
            const delay = el.getAttribute('data-delay') || '0';
            
            // Add animation classes with delay
            setTimeout(() => {
              if (animation === 'fade-up') {
                el.classList.add('animate-fade-up');
              } else if (animation === 'fade-in') {
                el.classList.add('animate-fade-in');
              } else if (animation === 'scale-in') {
                el.classList.add('animate-scale-in');
              } else if (animation === 'slide-in') {
                el.classList.add('animate-slide-in');
              }
              
              // Remove hidden class
              el.classList.remove('opacity-0');
              
              // Unobserve after animation is triggered
              observer.unobserve(el);
            }, parseInt(delay));
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Start animation a bit before element enters viewport
      });
      
      // Observe all elements with data-animate attribute
      elements.forEach(el => {
        // Initially hide element
        el.classList.add('opacity-0');
        observer.observe(el);
      });
    };
    
    // Handle parallax effect
    const handleParallax = () => {
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      const updateParallax = () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(el => {
          const speed = Number(el.getAttribute('data-parallax') || '0.1');
          const translateY = scrollY * speed;
          
          // Apply transform
          (el as HTMLElement).style.transform = `translateY(${translateY}px)`;
        });
      };
      
      // Update on scroll
      window.addEventListener('scroll', updateParallax);
      
      // Call once on load
      updateParallax();
      
      // Clean up
      return () => window.removeEventListener('scroll', updateParallax);
    };
    
    // Initialize animations
    animateOnScroll();
    const cleanupParallax = handleParallax();
    
    // Custom scroll behavior
    const smoothScrollToAnchor = () => {
      // Get all anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      
      anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          
          if (href && href !== '#') {
            e.preventDefault();
            
            // Find target element
            const target = document.querySelector(href);
            if (target) {
              // Smooth scroll to target
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
              
              // Update URL without page reload
              window.history.pushState(null, '', href);
            }
          }
        });
      });
    };
    
    smoothScrollToAnchor();
    
    return () => {
      if (cleanupParallax) cleanupParallax();
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default ScrollManager;
