
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

const CustomCursor = () => {
  const { theme } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Don't run cursor effects on mobile
    if (isMobile) return;
    
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const trails = trailsRef.current;
    
    if (!cursor || !follower || !trails) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Create trail particles
    const createTrails = () => {
      const trailCount = 8;
      for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        const size = 3 - (i * 0.2);
        trail.className = `trail absolute rounded-full pointer-events-none z-40 opacity-0 transition-opacity`;
        trail.style.width = `${size}px`;
        trail.style.height = `${size}px`;
        trail.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(155, 135, 245, 0.5)';
        trail.style.transitionDuration = `${0.1 + (i * 0.03)}s`;
        trails.appendChild(trail);
      }
    };
    
    createTrails();
    
    const updateTrails = () => {
      const trailElements = trails.children;
      for (let i = trailElements.length - 1; i > 0; i--) {
        const currentTrail = trailElements[i] as HTMLElement;
        const prevTrail = trailElements[i - 1] as HTMLElement;
        currentTrail.style.transform = prevTrail.style.transform;
        currentTrail.style.opacity = isClicking ? '0.7' : '0.4';
      }
      
      if (trailElements.length > 0) {
        const firstTrail = trailElements[0] as HTMLElement;
        firstTrail.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    // Add event listeners for hoverable elements
    const hoverableElements = document.querySelectorAll('a, button, [data-hoverable]');
    
    hoverableElements.forEach(element => {
      element.addEventListener('mouseenter', () => setIsHovering(true));
      element.addEventListener('mouseleave', () => setIsHovering(false));
    });
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    const animate = () => {
      // Smooth follower for cursor
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      // Even smoother follower
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      
      // Update trail positions
      updateTrails();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      hoverableElements.forEach(element => {
        element.removeEventListener('mouseenter', () => setIsHovering(true));
        element.removeEventListener('mouseleave', () => setIsHovering(false));
      });
    };
  }, [theme, isClicking, isMobile]);
  
  if (isMobile) return null;
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed w-4 h-4 rounded-full pointer-events-none z-50 -ml-2 -mt-2 mix-blend-difference transition-transform ${
          theme === 'dark' ? 'bg-white' : 'bg-cosmic-purple'
        } ${isHovering ? 'scale-0' : 'scale-100'} ${isClicking ? 'scale-50' : ''}`}
      />
      <div 
        ref={followerRef} 
        className={`fixed w-8 h-8 border-2 rounded-full pointer-events-none z-50 -ml-4 -mt-4 transition-all duration-300 ${
          theme === 'dark' ? 'border-white' : 'border-cosmic-purple'
        } ${isHovering ? 'scale-150 opacity-70' : 'scale-100 opacity-30'} ${isClicking ? 'scale-75 opacity-50' : ''}`}
      />
      <div
        ref={trailsRef}
        className="fixed pointer-events-none"
      />
    </>
  );
};

export default CustomCursor;
