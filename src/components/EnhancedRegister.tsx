
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  teamSize: string;
  experience: string;
  interests: string[];
}

// Available technology interests
const techInterests = [
  "AI/ML", "Web Development", "Mobile Apps", "Blockchain", 
  "AR/VR", "IoT", "Game Dev", "Cybersecurity"
];

const EnhancedRegister = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(0); // 0: black hole, 1: form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    teamSize: '',
    experience: '',
    interests: []
  });
  
  const blackHoleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [blackHoleActive, setBlackHoleActive] = useState(false);
  const [mousePosX, setMousePosX] = useState(0);
  const [mousePosY, setMousePosY] = useState(0);
  
  // Black hole hover effect
  useEffect(() => {
    if (!blackHoleRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = blackHoleRef.current!.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the black hole
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate distance from center (normalized 0-1)
      const distX = (e.clientX - centerX) / (width / 2);
      const distY = (e.clientY - centerY) / (height / 2);
      
      // Update state for the gravitational pull effect
      setMousePosX(distX * 0.15); // Scale down for subtlety
      setMousePosY(distY * 0.15);
      
      // Create particle effects around black hole when mouse is near
      const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      const maxDist = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
      
      if (dist < maxDist * 1.2) {
        createParticle(e.clientX, e.clientY, centerX, centerY);
      }
    };
    
    // Create particles that get pulled toward the black hole
    const createParticle = (mouseX: number, mouseY: number, holeX: number, holeY: number) => {
      if (!blackHoleRef.current) return;
      
      const particle = document.createElement('div');
      
      // Calculate direction vector toward black hole
      const dirX = holeX - mouseX;
      const dirY = holeY - mouseY;
      const dist = Math.sqrt(dirX * dirX + dirY * dirY);
      
      // Position particle near cursor
      const randomOffsetX = (Math.random() - 0.5) * 40;
      const randomOffsetY = (Math.random() - 0.5) * 40;
      
      const startX = mouseX + randomOffsetX;
      const startY = mouseY + randomOffsetY;
      
      // Particle styling
      particle.className = 'absolute w-1 h-1 rounded-full pointer-events-none z-10';
      particle.style.backgroundColor = theme === 'dark' ? '#9b87f5' : '#7E69AB';
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.opacity = '0.8';
      particle.style.transition = 'all 1s cubic-bezier(0.075, 0.82, 0.165, 1)';
      
      document.body.appendChild(particle);
      
      // Animate particle being pulled into black hole
      setTimeout(() => {
        particle.style.left = `${holeX}px`;
        particle.style.top = `${holeY}px`;
        particle.style.opacity = '0';
        particle.style.transform = 'scale(0)';
        
        // Remove particle after animation
        setTimeout(() => {
          particle.remove();
        }, 1000);
      }, 10);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);
  
  const handleBlackHoleClick = () => {
    setBlackHoleActive(true);
    
    // Emit particles from black hole during transition
    if (blackHoleRef.current) {
      const { left, top, width, height } = blackHoleRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      for (let i = 0; i < 40; i++) {
        setTimeout(() => {
          emitParticle(centerX, centerY);
        }, i * 50);
      }
    }
    
    // Start form transition after black hole animation
    setTimeout(() => {
      setFormStep(1);
    }, 1000);
  };
  
  // Emit particles from black hole
  const emitParticle = (x: number, y: number) => {
    const particle = document.createElement('div');
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 150;
    const finalX = x + Math.cos(angle) * distance;
    const finalY = y + Math.sin(angle) * distance;
    
    // Particle styling
    const size = 1 + Math.random() * 2;
    particle.className = 'absolute rounded-full pointer-events-none z-0';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = theme === 'dark' ? '#9b87f5' : '#7E69AB';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.opacity = '0';
    particle.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
    
    document.body.appendChild(particle);
    
    // Animate particle
    setTimeout(() => {
      particle.style.left = `${finalX}px`;
      particle.style.top = `${finalY}px`;
      particle.style.opacity = '0.8';
      
      // Remove particle after animation
      setTimeout(() => {
        particle.style.opacity = '0';
        setTimeout(() => particle.remove(), 500);
      }, 500);
    }, 10);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const interests = [...prev.interests];
      
      if (interests.includes(interest)) {
        return { ...prev, interests: interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...interests, interest] };
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.teamSize || !formData.experience) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.interests.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one area of interest",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    // Emit particles from submit button
    if (formRef.current) {
      const submitButton = formRef.current.querySelector('button[type="submit"]');
      if (submitButton) {
        const { left, top, width, height } = submitButton.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            emitParticle(centerX, centerY);
          }, i * 50);
        }
      }
    }
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Registration Successful",
        description: "Welcome to the Cosmic Hackathon! Check your email for confirmation.",
      });
      
      // Return to black hole with animation
      setFormStep(0);
      setBlackHoleActive(false);
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        teamSize: '',
        experience: '',
        interests: []
      });
    }, 1500);
  };
  
  return (
    <section 
      id="register" 
      className={cn(
        "min-h-screen py-20 flex flex-col items-center justify-center relative transition-colors duration-500 overflow-hidden",
        theme === 'dark' ? 'bg-transparent' : 'bg-white/5'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
        <h2 className={cn(
          "text-4xl md:text-5xl font-bold mb-4 text-center transition-colors duration-500",
          theme === 'dark' ? 'text-cosmic-purple text-glow' : 'text-cosmic-deepPurple'
        )}>
          Join the Mission
        </h2>
        
        <p className={cn(
          "max-w-2xl mx-auto text-center mb-16 transition-colors duration-500",
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}>
          Ready to embark on a cosmic coding adventure? Register now and secure your spot 
          in the most innovative hackathon of the year. Prepare for an immersive journey 
          through the digital cosmos.
        </p>
        
        <div className="w-full max-w-xl mx-auto">
          {formStep === 0 ? (
            <div className="flex flex-col items-center">
              <div 
                ref={blackHoleRef}
                onClick={handleBlackHoleClick}
                data-hoverable="true"
                className={cn(
                  "group relative w-60 h-60 rounded-full mb-8 overflow-hidden transition-all duration-500 cursor-pointer",
                  blackHoleActive ? "scale-0" : "scale-100"
                )}
                style={{ 
                  transform: blackHoleActive 
                    ? 'scale(0)' 
                    : `scale(1) translate(${mousePosX * -20}px, ${mousePosY * -20}px)` 
                }}
              >
                {/* Accretion disk effect */}
                <div 
                  className={cn(
                    "absolute inset-0 rounded-full blur-md opacity-70 scale-110 animate-spin",
                    "bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-blue"
                  )}
                  style={{ animationDuration: '15s' }}
                ></div>
                
                {/* Secondary rotating disk */}
                <div 
                  className="absolute inset-0 rounded-full opacity-50 scale-125 animate-spin"
                  style={{ 
                    animationDuration: '12s',
                    animationDirection: 'reverse',
                    background: 'radial-gradient(circle, transparent 30%, rgba(217, 70, 239, 0.6) 70%)'
                  }}
                ></div>
                
                {/* Black hole center */}
                <div className={cn(
                  "absolute inset-10 rounded-full bg-black shadow-2xl transform transition-transform duration-500",
                  "group-hover:scale-95"
                )}></div>
                
                {/* Center glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={cn(
                    "text-white text-glow text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10",
                    "transform scale-150"
                  )}>
                    ENTER
                  </span>
                </div>
                
                {/* Particle system */}
                <div className="particles-container absolute inset-0 pointer-events-none">
                  {/* Particles are dynamically added with JS */}
                </div>
              </div>
              
              <p className={cn(
                "text-center transition-colors duration-500",
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )}>
                Click the cosmic portal to start your registration
              </p>
            </div>
          ) : (
            <div 
              ref={formRef}
              className={cn(
                "transition-all duration-700 transform rounded-2xl overflow-hidden relative",
                "p-8 backdrop-blur-lg",
                theme === 'dark' 
                  ? 'bg-black/30 border border-white/10' 
                  : 'bg-white/60 border border-cosmic-purple/20',
                formStep === 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
            >
              {/* Background animation effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-5">
                  <div 
                    className="absolute w-full h-full bg-gradient-to-br from-cosmic-purple via-cosmic-pink to-cosmic-blue"
                    style={{ 
                      transform: 'translateY(-50%) rotate(45deg)', 
                      width: '200%', 
                      height: '200%',
                      animation: 'slowSpin 15s linear infinite'
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className={cn(
                  "text-2xl font-bold mb-6 transition-colors duration-500",
                  theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
                )}>
                  Registration Form
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className={cn(
                      "text-sm transition-colors duration-500",
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}>
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full rounded-md py-2 px-4 transition-all duration-300 focus:outline-none focus:ring-2 animate-form-beam-in",
                        theme === 'dark' 
                          ? 'bg-cosmic-darkPurple/40 border border-cosmic-purple/30 text-white focus:ring-cosmic-purple' 
                          : 'bg-white border border-cosmic-purple/20 text-cosmic-darkPurple focus:ring-cosmic-deepPurple'
                      )}
                      style={{ animationDelay: '0.1s' }}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className={cn(
                      "text-sm transition-colors duration-500",
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full rounded-md py-2 px-4 transition-all duration-300 focus:outline-none focus:ring-2 animate-form-beam-in",
                        theme === 'dark' 
                          ? 'bg-cosmic-darkPurple/40 border border-cosmic-purple/30 text-white focus:ring-cosmic-purple' 
                          : 'bg-white border border-cosmic-purple/20 text-cosmic-darkPurple focus:ring-cosmic-deepPurple'
                      )}
                      style={{ animationDelay: '0.2s' }}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className={cn(
                        "text-sm transition-colors duration-500",
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      )}>
                        Team Size <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                        className={cn(
                          "w-full rounded-md py-2 px-4 transition-all duration-300 focus:outline-none focus:ring-2 animate-form-beam-in",
                          theme === 'dark' 
                            ? 'bg-cosmic-darkPurple/40 border border-cosmic-purple/30 text-white focus:ring-cosmic-purple' 
                            : 'bg-white border border-cosmic-purple/20 text-cosmic-darkPurple focus:ring-cosmic-deepPurple'
                        )}
                        style={{ animationDelay: '0.3s' }}
                      >
                        <option value="">Select team size</option>
                        <option value="solo">Solo (1 person)</option>
                        <option value="duo">Duo (2 people)</option>
                        <option value="small">Small Team (3-4 people)</option>
                        <option value="large">Large Team (5+ people)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className={cn(
                        "text-sm transition-colors duration-500",
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      )}>
                        Experience Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={cn(
                          "w-full rounded-md py-2 px-4 transition-all duration-300 focus:outline-none focus:ring-2 animate-form-beam-in",
                          theme === 'dark' 
                            ? 'bg-cosmic-darkPurple/40 border border-cosmic-purple/30 text-white focus:ring-cosmic-purple' 
                            : 'bg-white border border-cosmic-purple/20 text-cosmic-darkPurple focus:ring-cosmic-deepPurple'
                        )}
                        style={{ animationDelay: '0.4s' }}
                      >
                        <option value="">Select experience</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className={cn(
                      "text-sm transition-colors duration-500",
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}>
                      Areas of Interest <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 animate-form-beam-in" style={{ animationDelay: '0.5s' }}>
                      {techInterests.map((interest, index) => (
                        <button
                          key={interest}
                          type="button"
                          data-hoverable="true"
                          onClick={() => handleInterestToggle(interest)}
                          className={cn(
                            "py-2 px-3 rounded-md text-sm transition-all duration-300",
                            formData.interests.includes(interest)
                              ? theme === 'dark'
                                ? 'bg-cosmic-purple text-white shadow-lg shadow-cosmic-purple/20'
                                : 'bg-cosmic-deepPurple text-white shadow-lg shadow-cosmic-deepPurple/20'
                              : theme === 'dark'
                                ? 'bg-cosmic-darkPurple/40 text-gray-300 border border-cosmic-purple/30 hover:bg-cosmic-darkPurple/60'
                                : 'bg-white text-gray-600 border border-cosmic-purple/20 hover:bg-cosmic-purple/5'
                          )}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-between animate-form-beam-in" style={{ animationDelay: '0.6s' }}>
                    <button
                      type="button"
                      data-hoverable="true"
                      onClick={() => {
                        setFormStep(0);
                        setBlackHoleActive(false);
                      }}
                      className={cn(
                        "px-4 py-2 rounded-full transition-all duration-300",
                        theme === 'dark' 
                          ? 'border border-cosmic-purple/50 text-cosmic-purple hover:bg-cosmic-darkPurple/30' 
                          : 'border border-cosmic-deepPurple/30 text-cosmic-deepPurple hover:bg-cosmic-purple/10'
                      )}
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="submit"
                      data-hoverable="true"
                      disabled={isSubmitting}
                      className={cn(
                        "cosmic-button relative px-6 py-3 rounded-full font-bold overflow-hidden transition-all duration-300",
                        theme === 'dark'
                          ? 'bg-cosmic-purple hover:bg-cosmic-deepPurple text-white' 
                          : 'bg-cosmic-deepPurple hover:bg-cosmic-purple text-white',
                        isSubmitting && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      <div className="relative z-10 flex items-center">
                        {isSubmitting && (
                          <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        )}
                        {isSubmitting ? "Registering..." : "Register Now"}
                      </div>
                      
                      {/* Button glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-cosmic-pink via-cosmic-purple to-cosmic-blue opacity-60 blur-md"></div>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnhancedRegister;
