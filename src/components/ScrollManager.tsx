
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

const ScrollManager: React.FC = () => {
  const { theme } = useTheme();
  const scrollProgressRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    // Check if IntersectionObserver is available (browser support)
    if (!('IntersectionObserver' in window)) return;
    
    // Create scroll progress indicator
    const createScrollProgress = () => {
      if (!scrollProgressRef.current) return;
      
      const updateScrollProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollTop / scrollHeight;
        
        // Update path stroke dashoffset
        if (scrollProgressRef.current) {
          const pathLength = scrollProgressRef.current.getTotalLength();
          const dashOffset = pathLength - (pathLength * scrollProgress);
          scrollProgressRef.current.style.strokeDashoffset = dashOffset.toString();
        }
      };
      
      window.addEventListener('scroll', updateScrollProgress);
      updateScrollProgress();
      
      return () => window.removeEventListener('scroll', updateScrollProgress);
    };
    
    // Handle scroll reveal animations with advanced effects
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('[data-animate]');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Get animation data from element
            const el = entry.target;
            const animation = el.getAttribute('data-animate');
            const delay = el.getAttribute('data-delay') || '0';
            const duration = el.getAttribute('data-duration') || '500';
            
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
              } else if (animation === 'glitch') {
                el.classList.add('animate-glitch');
              } else if (animation === 'reveal') {
                el.classList.add('animate-reveal');
              }
              
              // Remove hidden class
              el.classList.remove('opacity-0');
              
              // Set custom animation duration if provided
              if (duration && duration !== '500') {
                (el as HTMLElement).style.animationDuration = `${parseInt(duration)}ms`;
              }
              
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
    
    // Handle parallax effect with advanced tracking
    const handleParallax = () => {
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      const updateParallax = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        parallaxElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          const speed = Number(el.getAttribute('data-parallax') || '0.1');
          const direction = el.getAttribute('data-parallax-direction') || 'vertical';
          const invert = el.hasAttribute('data-parallax-invert');
          
          // Calculate element's position relative to viewport
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = viewportHeight / 2;
          const distanceFromCenter = elementCenter - viewportCenter;
          
          // Apply transform based on direction
          if (direction === 'vertical') {
            const translateY = distanceFromCenter * speed * (invert ? -1 : 1);
            (el as HTMLElement).style.transform = `translateY(${translateY}px)`;
          } else if (direction === 'horizontal') {
            const translateX = distanceFromCenter * speed * (invert ? -1 : 1);
            (el as HTMLElement).style.transform = `translateX(${translateX}px)`;
          } else if (direction === 'rotation') {
            const rotate = distanceFromCenter * speed * 0.1 * (invert ? -1 : 1);
            (el as HTMLElement).style.transform = `rotate(${rotate}deg)`;
          } else if (direction === 'scale') {
            const baseScale = 1;
            const scaleOffset = distanceFromCenter * speed * 0.001 * (invert ? -1 : 1);
            const scale = baseScale + scaleOffset;
            (el as HTMLElement).style.transform = `scale(${scale})`;
          }
        });
      };
      
      // Update on scroll
      window.addEventListener('scroll', updateParallax);
      
      // Also update on mouse movement for subtle effect
      let mouseX = 0;
      let mouseY = 0;
      
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
        
        parallaxElements.forEach(el => {
          if (el.hasAttribute('data-mouse-parallax')) {
            const speed = Number(el.getAttribute('data-mouse-parallax') || '0.05');
            const translateX = mouseX * speed * 10;
            const translateY = mouseY * speed * 10;
            
            (el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
          }
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      // Call once on load
      updateParallax();
      
      // Clean up
      return () => {
        window.removeEventListener('scroll', updateParallax);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    };
    
    // Create magnetic effect on elements
    const createMagneticEffect = () => {
      const magneticElements = document.querySelectorAll('[data-magnetic]');
      
      magneticElements.forEach(el => {
        const strength = Number(el.getAttribute('data-magnetic') || '0.3');
        
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          (el as HTMLElement).style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
          (el as HTMLElement).style.transform = 'translate(0px, 0px)';
        });
      });
    };
    
    // Initialize animations
    animateOnScroll();
    const cleanupParallax = handleParallax();
    createMagneticEffect();
    const cleanupScrollProgress = createScrollProgress();
    
    // Custom scroll behavior with enhanced physics
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
              // Get position of target
              const targetPosition = (target as HTMLElement).getBoundingClientRect().top + window.scrollY;
              const startPosition = window.scrollY;
              const distance = targetPosition - startPosition;
              
              // Add wormhole effect to content when scrolling
              const mainContent = document.getElementById('main-content');
              if (mainContent) {
                mainContent.classList.add('animate-wormhole');
                setTimeout(() => {
                  mainContent.classList.remove('animate-wormhole');
                }, 1000);
              }
              
              // Custom easing function
              const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
              
              // Animate scroll
              let start: number | null = null;
              const duration = 1000; // ms
              
              const animateScroll = (timestamp: number) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);
                const easing = easeOutQuart(progress);
                
                window.scrollTo(0, startPosition + distance * easing);
                
                if (progress < 1) {
                  requestAnimationFrame(animateScroll);
                }
              };
              
              requestAnimationFrame(animateScroll);
              
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
      if (cleanupScrollProgress) cleanupScrollProgress();
    };
  }, [theme]);
  
  return (
    <div className="scroll-manager">
      {/* Scroll progress indicator */}
      <svg className="fixed top-0 right-0 w-20 h-full z-40 pointer-events-none">
        <path
          ref={scrollProgressRef}
          className={`${theme === 'dark' ? 'stroke-cosmic-purple' : 'stroke-cosmic-deepPurple'} fill-none`}
          strokeWidth="2"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          d="M10,10 C40,100 10,200 40,300 C10,400 40,500 10,600 C40,700 10,800 40,900"
        />
      </svg>
    </div>
  );
};

export default ScrollManager;
