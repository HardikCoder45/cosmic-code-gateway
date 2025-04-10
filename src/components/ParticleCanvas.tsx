
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  increasing: boolean;
}

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
      const particleCount = Math.min(Math.floor(dimensions.width * dimensions.height / 10000), 150);
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
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Pulsate size and opacity
        if (particle.increasing) {
          particle.alpha += 0.01;
          if (particle.alpha >= 1) {
            particle.increasing = false;
          }
        } else {
          particle.alpha -= 0.01;
          if (particle.alpha <= 0.3) {
            particle.increasing = true;
          }
        }
        
        // Boundary check with wrap-around
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;
        
        // Mouse interaction - attract particles towards mouse
        if (mousePosition) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (150 - distance) / 150;
            
            particle.speedX += forceDirectionX * force * 0.2;
            particle.speedY += forceDirectionY * force * 0.2;
            
            // Limit speed
            const maxSpeed = 3;
            const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
            if (currentSpeed > maxSpeed) {
              const ratio = maxSpeed / currentSpeed;
              particle.speedX *= ratio;
              particle.speedY *= ratio;
            }
          }
        }
        
        // Apply drag to slow particles gradually
        particle.speedX *= 0.98;
        particle.speedY *= 0.98;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Draw connections between nearby particles
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            
            // Line opacity based on distance
            const alpha = 1 - distance / 100;
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(155, 135, 245, ${alpha * 0.2})` 
              : `rgba(110, 89, 165, ${alpha * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      
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

// Helper function to create a particle
const createParticle = (width: number, height: number, theme: string): Particle => {
  const baseColor = theme === 'dark' ? '#9b87f5' : '#6E59A5';
  
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    color: baseColor,
    alpha: Math.random() * 0.7 + 0.3,
    increasing: Math.random() > 0.5
  };
};

export default ParticleCanvas;
