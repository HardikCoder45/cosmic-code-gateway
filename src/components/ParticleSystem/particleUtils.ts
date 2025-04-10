
export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  increasing: boolean;
}

// Helper function to create a particle
export const createParticle = (width: number, height: number, theme: string): Particle => {
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

// Update particle position and properties
export const updateParticle = (
  particle: Particle, 
  width: number, 
  height: number, 
  mousePosition: { x: number, y: number } | null
): void => {
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
  if (particle.x < 0) particle.x = width;
  if (particle.x > width) particle.x = 0;
  if (particle.y < 0) particle.y = height;
  if (particle.y > height) particle.y = 0;
  
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
};
