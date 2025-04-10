
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

const CustomCursor = () => {
  const { theme } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const cursorPositionRef = useRef({ x: 0, y: 0 });
  const followerPositionRef = useRef({ x: 0, y: 0 });

  // Check if device is mobile - only needs to run once
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    const resizeListener = () => {
      checkMobile();
    };
    
    window.addEventListener('resize', resizeListener, { passive: true });
    
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  // Create optimized cursor animation
  const animateCursor = useCallback(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (cursor && follower) {
      // Smooth follower for cursor with optimized calculations
      cursorPositionRef.current.x += (mousePositionRef.current.x - cursorPositionRef.current.x) * 0.2;
      cursorPositionRef.current.y += (mousePositionRef.current.y - cursorPositionRef.current.y) * 0.2;
      
      // Even smoother follower
      followerPositionRef.current.x += (mousePositionRef.current.x - followerPositionRef.current.x) * 0.1;
      followerPositionRef.current.y += (mousePositionRef.current.y - followerPositionRef.current.y) * 0.1;
      
      cursor.style.transform = `translate(${mousePositionRef.current.x}px, ${mousePositionRef.current.y}px)`;
      follower.style.transform = `translate(${followerPositionRef.current.x}px, ${followerPositionRef.current.y}px)`;
    }
    
    rafRef.current = requestAnimationFrame(animateCursor);
  }, []);

  useEffect(() => {
    // Don't run cursor effects on mobile
    if (isMobile) return;
    
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const trails = trailsRef.current;
    
    if (!cursor || !follower || !trails) return;
    
    // Create less trail particles (fewer DOM nodes)
    const createTrails = () => {
      // Clear previous trails first
      while (trails.firstChild) {
        trails.removeChild(trails.firstChild);
      }
      
      const trailCount = 5; // Reduced from 8
      for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        const size = 3 - (i * 0.4);
        trail.className = 'trail absolute rounded-full pointer-events-none z-40 opacity-0 transition-opacity';
        trail.style.width = `${size}px`;
        trail.style.height = `${size}px`;
        trail.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(155, 135, 245, 0.5)';
        trail.style.transitionDuration = `${0.1 + (i * 0.05)}s`;
        trails.appendChild(trail);
      }
    };
    
    createTrails();
    
    // Throttle mouse move events
    let lastMoveTime = 0;
    const throttleTime = 10; // ms
    
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastMoveTime < throttleTime) return;
      
      lastMoveTime = currentTime;
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    // Only track hoverable elements in viewport
    const trackHoverableElements = () => {
      const hoverableElements = document.querySelectorAll('a, button, [data-hoverable]');
      
      hoverableElements.forEach(element => {
        element.addEventListener('mouseenter', () => setIsHovering(true));
        element.addEventListener('mouseleave', () => setIsHovering(false));
      });
      
      return () => {
        hoverableElements.forEach(element => {
          element.removeEventListener('mouseenter', () => setIsHovering(true));
          element.removeEventListener('mouseleave', () => setIsHovering(false));
        });
      };
    };
    
    const cleanupHoverTracking = trackHoverableElements();
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Start animation
    rafRef.current = requestAnimationFrame(animateCursor);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cleanupHoverTracking();
    };
  }, [theme, isClicking, isMobile, animateCursor]);
  
  // Don't render cursor on mobile devices
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

export default React.memo(CustomCursor);
