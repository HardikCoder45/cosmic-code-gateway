
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  teamSize: string;
  experience: string;
}

const Register = () => {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(0); // 0: black hole, 1: form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    teamSize: '',
    experience: ''
  });
  
  const handleBlackHoleClick = () => {
    setFormStep(1);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.teamSize || !formData.experience) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Registration Successful",
        description: "Welcome to the Cosmic Hackathon! Check your email for confirmation.",
      });
      setFormStep(0); // Return to black hole
      setFormData({
        name: '',
        email: '',
        teamSize: '',
        experience: ''
      });
    }, 1500);
  };
  
  return (
    <section id="register" className="min-h-screen py-20 flex flex-col items-center justify-center relative">
      <h2 className="text-4xl md:text-5xl font-bold text-cosmic-purple text-glow mb-4">
        Join the Mission
      </h2>
      
      <p className="text-gray-300 max-w-2xl text-center mb-16 px-4">
        Ready to embark on a cosmic coding adventure? Register now and secure your spot 
        in the most innovative hackathon of the year.
      </p>
      
      <div className="w-full max-w-lg mx-auto px-4">
        {formStep === 0 ? (
          <div className="flex flex-col items-center">
            <button 
              onClick={handleBlackHoleClick}
              className="relative w-40 h-40 rounded-full bg-cosmic-darkPurple mb-8 
                animate-black-hole-pulse overflow-hidden group"
            >
              {/* Accretion disk effect */}
              <div className="absolute inset-0 rounded-full 
                bg-gradient-to-r from-cosmic-purple via-cosmic-pink to-cosmic-blue 
                blur-md opacity-50 scale-110 animate-spin" 
                style={{ animationDuration: '15s' }}
              />
              
              {/* Black hole center */}
              <div className="absolute inset-4 rounded-full bg-black shadow-2xl 
                transform group-hover:scale-90 transition-transform duration-500" />
              
              {/* Center glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-glow text-sm opacity-70 group-hover:opacity-100 
                  transition-opacity duration-300 z-10">
                  ENTER
                </span>
              </div>
            </button>
            
            <p className="text-gray-400 text-center">
              Click the cosmic portal to start your registration
            </p>
          </div>
        ) : (
          <div className="cosmic-card animate-scale-in">
            <h3 className="text-2xl font-bold text-cosmic-purple mb-6">
              Registration Form
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-cosmic-darkPurple/40 border border-cosmic-purple/30 
                    rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 
                    focus:ring-cosmic-purple animate-form-beam-in"
                  style={{ animationDelay: '0.1s' }}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-cosmic-darkPurple/40 border border-cosmic-purple/30 
                    rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 
                    focus:ring-cosmic-purple animate-form-beam-in"
                  style={{ animationDelay: '0.2s' }}
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm text-gray-300">Team Size</label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full bg-cosmic-darkPurple/40 border border-cosmic-purple/30 
                    rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 
                    focus:ring-cosmic-purple animate-form-beam-in"
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
                <label className="text-sm text-gray-300">Experience Level</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full bg-cosmic-darkPurple/40 border border-cosmic-purple/30 
                    rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 
                    focus:ring-cosmic-purple animate-form-beam-in"
                  style={{ animationDelay: '0.4s' }}
                >
                  <option value="">Select experience</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setFormStep(0)}
                  className="px-4 py-2 rounded-full border border-cosmic-purple/50 
                    text-cosmic-purple hover:bg-cosmic-darkPurple/30 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "cosmic-button",
                    isSubmitting && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? "Registering..." : "Register Now"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Register;
