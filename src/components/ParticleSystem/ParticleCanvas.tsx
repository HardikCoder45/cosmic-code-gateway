
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { renderParticles } from './particleRenderer';
import { createParticle, type Particle } from './particleUtils';

const ParticleCanvas = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  // Set up canvas dimensions with debounce
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const parent = canvas.parentElement;
        if (parent) {
          const { width, height } = parent.getBoundingClientRect();
          setDimensions({ width, height });
          canvas.width = width;
          canvas.height = height;
        }
      }
    };
    
    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(handleResize, 100);
    };
    
    handleResize();
    window.addEventListener('resize', debouncedResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, []);
  
  // Initialize particles only once dimensions are known
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      // Reduce particle count for better performance
      const particleCount = Math.min(Math.floor(dimensions.width * dimensions.height / 15000), 80);
      const particles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(dimensions.width, dimensions.height, theme));
      }
      
      particlesRef.current = particles;
    }
  }, [dimensions, theme]);
  
  // Mouse interaction with throttling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let lastMoveTime = 0;
    const throttleTime = 30; // ms
    
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastMoveTime < throttleTime) return;
      
      lastMoveTime = currentTime;
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    const handleMouseLeave = () => {
      setMousePosition(null);
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    
    // Intersection Observer for visibility-based rendering
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(canvas);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);
  
  // Animation loop with frame rate control
  useEffect(() => {
    if (!canvasRef.current || !dimensions.width || !dimensions.height || !isVisible) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - lastFrameTime;
      
      if (elapsedTime > frameInterval) {
        lastFrameTime = currentTime - (elapsedTime % frameInterval);
        
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        renderParticles(ctx, particlesRef.current, dimensions, mousePosition, theme);
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [dimensions, mousePosition, theme, isVisible]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default ParticleCanvas;
