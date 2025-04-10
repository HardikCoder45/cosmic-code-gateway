
import { Particle, updateParticle } from './particleUtils';

export const renderParticles = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  dimensions: { width: number, height: number },
  mousePosition: { x: number, y: number } | null,
  theme: string
): void => {
  // Update and draw particles
  particles.forEach((particle, index) => {
    // Update particle properties and position
    updateParticle(particle, dimensions.width, dimensions.height, mousePosition);
    
    // Draw particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0');
    ctx.fill();
    
    // Draw connections between nearby particles
    for (let j = index + 1; j < particles.length; j++) {
      const otherParticle = particles[j];
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
};
