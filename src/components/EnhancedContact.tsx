
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { Mail, MessageSquare, Send, Phone, MapPin, Globe, ArrowRight } from 'lucide-react';

const EnhancedContact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };
  
  // Create particle effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particleCount = 20;
    
    // Create keyframes for contact particles if not exist
    if (!document.getElementById('contact-particle-keyframes')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'contact-particle-keyframes';
      styleEl.textContent = `
        @keyframes contactParticleFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 20}deg); }
          50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * -20}deg); }
          75% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 20}deg); }
        }
      `;
      document.head.appendChild(styleEl);
    }
    
    // Remove existing particles
    const existingParticles = container.querySelectorAll('.contact-particle');
    existingParticles.forEach(p => p.remove());
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('contact-particle');
      
      // Random properties
      const size = 2 + Math.random() * 4;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const opacity = 0.1 + Math.random() * 0.2;
      const duration = 20 + Math.random() * 30;
      const delay = Math.random() * 10;
      
      // Apply styles
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = opacity.toString();
      particle.style.backgroundColor = theme === 'dark' ? 'white' : '#6E59A5';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '0';
      
      // Animation
      particle.style.animation = `contactParticleFloat ${duration}s infinite ease-in-out`;
      particle.style.animationDelay = `${delay}s`;
      
      container.appendChild(particle);
    }
    
    return () => {
      const el = document.getElementById('contact-particle-keyframes');
      if (el) el.remove();
    };
  }, [theme]);
  
  return (
    <section
      id="contact"
      ref={containerRef}
      className={cn(
        "relative min-h-screen py-24 overflow-hidden transition-colors duration-500",
        theme === 'dark' ? 'bg-transparent' : 'bg-white/5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-4">
            <Mail 
              size={48} 
              className={cn(
                "inline-block opacity-90 transition-colors duration-500",
                theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
              )} 
            />
          </div>
          
          <h2 
            data-animate="fade-up"
            className={cn(
              "text-4xl md:text-5xl font-bold mb-6 inline-block relative transition-colors duration-500",
              theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
            )}
          >
            <span className="relative z-10">Contact Mission Control</span>
            <span className="absolute inset-0 blur-xl bg-gradient-to-r from-cosmic-purple to-cosmic-blue opacity-30 filter-none"></span>
          </h2>
          
          <p 
            data-animate="fade-up" 
            data-delay="200"
            className={cn(
              "max-w-3xl mx-auto text-lg transition-colors duration-500",
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            )}
          >
            Have questions about the hackathon or interested in becoming a sponsor?
            Our team is ready to assist you on your cosmic journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact information */}
          <div 
            data-animate="fade-up"
            data-delay="300"
            className="lg:col-span-1"
          >
            <div className={cn(
              "p-6 rounded-xl h-full transition-all duration-500",
              theme === 'dark' 
                ? 'bg-black/30 border border-white/10' 
                : 'bg-white/70 border border-cosmic-purple/10',
              "backdrop-blur-sm"
            )}>
              <h3 className={cn(
                "text-xl font-semibold mb-6 transition-colors duration-500",
                theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
              )}>
                Cosmic Coordinates
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 transition-colors duration-500",
                    theme === 'dark' 
                      ? 'bg-cosmic-purple/20 text-cosmic-purple' 
                      : 'bg-cosmic-purple/10 text-cosmic-deepPurple'
                  )}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className={cn(
                      "text-base font-medium mb-1 transition-colors duration-500",
                      theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                    )}>
                      Email
                    </h4>
                    <p className={cn(
                      "transition-colors duration-500",
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}>
                      <a href="mailto:info@quantumhackathon.com" className="hover:underline">
                        info@quantumhackathon.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 transition-colors duration-500",
                    theme === 'dark' 
                      ? 'bg-cosmic-purple/20 text-cosmic-purple' 
                      : 'bg-cosmic-purple/10 text-cosmic-deepPurple'
                  )}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className={cn(
                      "text-base font-medium mb-1 transition-colors duration-500",
                      theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                    )}>
                      Phone
                    </h4>
                    <p className={cn(
                      "transition-colors duration-500",
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}>
                      <a href="tel:+1-555-123-4567" className="hover:underline">
                        +1 (555) 123-4567
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 transition-colors duration-500",
                    theme === 'dark' 
                      ? 'bg-cosmic-purple/20 text-cosmic-purple' 
                      : 'bg-cosmic-purple/10 text-cosmic-deepPurple'
                  )}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className={cn(
                      "text-base font-medium mb-1 transition-colors duration-500",
                      theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                    )}>
                      Location
                    </h4>
                    <p className={cn(
                      "transition-colors duration-500",
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}>
                      123 Tech Boulevard, Innovation District<br />
                      Silicon Valley, CA 94123
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 transition-colors duration-500",
                    theme === 'dark' 
                      ? 'bg-cosmic-purple/20 text-cosmic-purple' 
                      : 'bg-cosmic-purple/10 text-cosmic-deepPurple'
                  )}>
                    <Globe size={18} />
                  </div>
                  <div>
                    <h4 className={cn(
                      "text-base font-medium mb-1 transition-colors duration-500",
                      theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                    )}>
                      Social Media
                    </h4>
                    <div className="flex space-x-3 mt-2">
                      {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((platform, i) => (
                        <a 
                          key={i}
                          href="#" 
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
                            theme === 'dark' 
                              ? 'bg-cosmic-purple/20 text-white hover:bg-cosmic-purple/40' 
                              : 'bg-cosmic-purple/10 text-cosmic-deepPurple hover:bg-cosmic-purple/20'
                          )}
                          aria-label={platform}
                        >
                          <span className="text-xs">{platform.charAt(0)}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Virtual office hours */}
              <div className="mt-8 pt-6 border-t border-dashed border-gray-600">
                <h4 className={cn(
                  "text-base font-medium mb-3 transition-colors duration-500",
                  theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                )}>
                  Virtual Office Hours
                </h4>
                <ul className={cn(
                  "space-y-2 transition-colors duration-500",
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                )}>
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div 
            data-animate="fade-up"
            data-delay="400"
            className="lg:col-span-2"
          >
            <div className={cn(
              "p-6 rounded-xl transition-all duration-500 relative overflow-hidden",
              theme === 'dark' 
                ? 'bg-black/30 border border-white/10' 
                : 'bg-white/70 border border-cosmic-purple/10',
              "backdrop-blur-sm"
            )}>
              {/* Decorative glow */}
              <div 
                className={cn(
                  "absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-20 filter blur-3xl",
                  "bg-gradient-to-r from-cosmic-purple to-cosmic-pink"
                )}
                style={{ transform: 'translate(30%, 30%)' }}
              ></div>
              
              <div className="relative z-10">
                <h3 className={cn(
                  "text-xl font-semibold mb-6 transition-colors duration-500",
                  theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                )}>
                  Send a Transmission
                </h3>
                
                {submitted ? (
                  <div className={cn(
                    "p-6 rounded-lg text-center transition-all duration-500",
                    theme === 'dark' 
                      ? 'bg-cosmic-purple/20 border border-cosmic-purple/30' 
                      : 'bg-cosmic-purple/10 border border-cosmic-purple/20'
                  )}>
                    <div className="text-4xl mb-4">🚀</div>
                    <h4 className={cn(
                      "text-lg font-medium mb-2 transition-colors duration-500",
                      theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                    )}>
                      Message Transmitted Successfully!
                    </h4>
                    <p className={cn(
                      "transition-colors duration-500",
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}>
                      Thank you for contacting us. Our team will respond to your inquiry within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label 
                          htmlFor="name"
                          className={cn(
                            "block mb-2 text-sm font-medium transition-colors duration-500",
                            theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                          )}
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={cn(
                            "w-full px-4 py-3 rounded-lg transition-colors duration-500",
                            theme === 'dark' 
                              ? 'bg-black/30 border border-white/10 text-white focus:border-cosmic-purple/50 focus:ring-1 focus:ring-cosmic-purple/50' 
                              : 'bg-white/50 border border-cosmic-purple/10 text-cosmic-deepPurple focus:border-cosmic-purple/30 focus:ring-1 focus:ring-cosmic-purple/30'
                          )}
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="email"
                          className={cn(
                            "block mb-2 text-sm font-medium transition-colors duration-500",
                            theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                          )}
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={cn(
                            "w-full px-4 py-3 rounded-lg transition-colors duration-500",
                            theme === 'dark' 
                              ? 'bg-black/30 border border-white/10 text-white focus:border-cosmic-purple/50 focus:ring-1 focus:ring-cosmic-purple/50' 
                              : 'bg-white/50 border border-cosmic-purple/10 text-cosmic-deepPurple focus:border-cosmic-purple/30 focus:ring-1 focus:ring-cosmic-purple/30'
                          )}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="subject"
                        className={cn(
                          "block mb-2 text-sm font-medium transition-colors duration-500",
                          theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                        )}
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={cn(
                          "w-full px-4 py-3 rounded-lg transition-colors duration-500",
                          theme === 'dark' 
                            ? 'bg-black/30 border border-white/10 text-white focus:border-cosmic-purple/50 focus:ring-1 focus:ring-cosmic-purple/50' 
                            : 'bg-white/50 border border-cosmic-purple/10 text-cosmic-deepPurple focus:border-cosmic-purple/30 focus:ring-1 focus:ring-cosmic-purple/30'
                        )}
                      >
                        <option value="">Select a subject</option>
                        <option value="participation">Participation Inquiry</option>
                        <option value="sponsorship">Sponsorship Opportunities</option>
                        <option value="mentorship">Mentorship Program</option>
                        <option value="technical">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="message"
                        className={cn(
                          "block mb-2 text-sm font-medium transition-colors duration-500",
                          theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                        )}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg transition-colors duration-500",
                          theme === 'dark' 
                            ? 'bg-black/30 border border-white/10 text-white focus:border-cosmic-purple/50 focus:ring-1 focus:ring-cosmic-purple/50' 
                            : 'bg-white/50 border border-cosmic-purple/10 text-cosmic-deepPurple focus:border-cosmic-purple/30 focus:ring-1 focus:ring-cosmic-purple/30'
                        )}
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className={cn(
                          "inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
                          theme === 'dark' 
                            ? 'bg-cosmic-purple text-white hover:bg-cosmic-deepPurple' 
                            : 'bg-cosmic-deepPurple text-white hover:bg-cosmic-purple',
                          "hover:shadow-lg hover:shadow-cosmic-purple/20 group"
                        )}
                      >
                        <span>Send Message</span>
                        <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            
            {/* FAQ quick links */}
            <div 
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
              data-animate="fade-up"
              data-delay="500"
            >
              {[
                {
                  title: "Have Questions?",
                  description: "Check our FAQs for quick answers to common questions.",
                  link: "#faq",
                  icon: <MessageSquare size={18} />
                },
                {
                  title: "Ready to Register?",
                  description: "Join the cosmic hackathon adventure today.",
                  link: "#register",
                  icon: <ArrowRight size={18} />
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-5 rounded-xl transition-all duration-500 group",
                    theme === 'dark' 
                      ? 'bg-black/20 border border-white/5 hover:border-cosmic-purple/20' 
                      : 'bg-white/40 border border-cosmic-purple/5 hover:border-cosmic-purple/20'
                  )}
                >
                  <h4 className={cn(
                    "text-lg font-medium mb-2 transition-colors duration-500",
                    theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                  )}>
                    {item.title}
                  </h4>
                  
                  <p className={cn(
                    "text-sm mb-3 transition-colors duration-500",
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {item.description}
                  </p>
                  
                  <a 
                    href={item.link} 
                    className={cn(
                      "inline-flex items-center text-sm transition-colors duration-300",
                      theme === 'dark' 
                        ? 'text-cosmic-purple hover:text-cosmic-pink' 
                        : 'text-cosmic-deepPurple hover:text-cosmic-purple'
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(item.link)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>Learn More</span>
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      {item.icon}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContact;
