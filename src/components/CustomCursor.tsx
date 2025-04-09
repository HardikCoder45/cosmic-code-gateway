
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

const CustomCursor = () => {
  const { theme } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add event listeners for hoverable elements
    const hoverableElements = document.querySelectorAll('a, button, [data-hoverable]');
    
    hoverableElements.forEach(element => {
      element.addEventListener('mouseenter', () => setIsHovering(true));
      element.addEventListener('mouseleave', () => setIsHovering(false));
    });
    
    const animate = () => {
      // Smooth follower for cursor
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      // Even smoother follower
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hoverableElements.forEach(element => {
        element.removeEventListener('mouseenter', () => setIsHovering(true));
        element.removeEventListener('mouseleave', () => setIsHovering(false));
      });
    };
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed w-4 h-4 rounded-full pointer-events-none z-50 -ml-2 -mt-2 mix-blend-difference transition-transform ${
          theme === 'dark' ? 'bg-white' : 'bg-cosmic-purple'
        } ${isHovering ? 'scale-0' : 'scale-100'}`}
      />
      <div 
        ref={followerRef} 
        className={`fixed w-8 h-8 border-2 rounded-full pointer-events-none z-50 -ml-4 -mt-4 transition-all duration-300 ${
          theme === 'dark' ? 'border-white' : 'border-cosmic-purple'
        } ${isHovering ? 'scale-150 opacity-70' : 'scale-100 opacity-30'}`}
      />
    </>
  );
};

export default CustomCursor;
