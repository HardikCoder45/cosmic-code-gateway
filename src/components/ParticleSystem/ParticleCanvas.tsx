
import React, { useEffect, useRef, useState } from 'react';
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
  
  // Set up canvas dimensions
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
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Initialize particles
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const particleCount = Math.min(Math.floor(dimensions.width * dimensions.height / 12000), 120);
      const particles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(dimensions.width, dimensions.height, theme));
      }
      
      particlesRef.current = particles;
    }
  }, [dimensions, theme]);
  
  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    const handleMouseLeave = () => {
      setMousePosition(null);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !dimensions.width || !dimensions.height) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      renderParticles(ctx, particlesRef.current, dimensions, mousePosition, theme);
      rafRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [dimensions, mousePosition, theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default ParticleCanvas;
