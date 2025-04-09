
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { ChevronDown, HelpCircle, Search, CircleHelp, Plus, Minus } from 'lucide-react';

const faqCategories = [
  {
    id: 'general',
    name: 'General Information',
    icon: <HelpCircle size={20} />,
    questions: [
      {
        question: "What is the Quantum Hackathon?",
        answer: "The Quantum Hackathon is an intensive 48-hour coding competition where participants collaborate to solve complex challenges using cutting-edge technologies. It's designed to foster innovation, provide networking opportunities, and showcase technical skills in a competitive yet supportive environment."
      },
      {
        question: "Who can participate?",
        answer: "The hackathon is open to developers, designers, and innovators of all skill levels, from beginners to experts. Students, professionals, and enthusiasts interested in technology are welcome to join. We encourage diversity in backgrounds and expertise to enhance collaboration and creativity."
      },
      {
        question: "Do I need to have a team to participate?",
        answer: "While having a pre-formed team is beneficial, it's not required. We offer team formation activities before the event where solo participants can find collaborators with complementary skills. Teams typically consist of 2-5 members with diverse backgrounds in development, design, and product management."
      },
      {
        question: "Is there an entry fee?",
        answer: "No, participation in the Quantum Hackathon is completely free thanks to our generous sponsors. We provide all necessary resources, including workspace, internet, meals, and technical support throughout the event."
      }
    ]
  },
  {
    id: 'logistics',
    name: 'Event Logistics',
    icon: <CircleHelp size={20} />,
    questions: [
      {
        question: "Where and when will the hackathon take place?",
        answer: "The hackathon will be held at the Quantum Innovation Center, located at 123 Tech Boulevard, from October 15-17, 2024. The event begins with registration at 5:00 PM on Friday and concludes with awards at 7:00 PM on Sunday. A detailed schedule will be provided to all registered participants."
      },
      {
        question: "Will accommodation be provided?",
        answer: "We don't provide accommodation directly, but we've partnered with nearby hotels to offer discounted rates for participants. Details will be shared after registration. The venue will remain open 24/7 during the event with rest areas for those who wish to stay overnight."
      },
      {
        question: "What should I bring to the hackathon?",
        answer: "Participants should bring their personal laptops, chargers, and any specialized hardware needed for their projects. We recommend bringing comfortable clothing, toiletries, and a reusable water bottle. All development tools, APIs, and standard hardware will be provided at the venue."
      },
      {
        question: "Will food be provided?",
        answer: "Yes, we provide all meals, snacks, and beverages throughout the event. This includes breakfast, lunch, dinner, midnight snacks, and continuous coffee and refreshments. Please indicate any dietary restrictions during registration so we can accommodate your needs."
      }
    ]
  },
  {
    id: 'technical',
    name: 'Technical Requirements',
    icon: <Search size={20} />,
    questions: [
      {
        question: "What technologies can I use during the hackathon?",
        answer: "Participants have complete freedom to use any programming languages, frameworks, libraries, or APIs. Popular choices include Python, JavaScript, React, TensorFlow, and cloud platforms like AWS, Google Cloud, or Azure. We encourage experimentation with emerging technologies like quantum computing, AR/VR, and blockchain."
      },
      {
        question: "Will there be technical resources or mentorship available?",
        answer: "Absolutely! We provide expert mentors from leading tech companies who will be available throughout the event to offer guidance. Additionally, we offer workshops on specific technologies and provide access to premium API credits, cloud computing resources, and specialized hardware."
      },
      {
        question: "Can I start working on my project before the hackathon?",
        answer: "While conceptual planning is allowed, actual code development should begin during the hackathon. Pre-existing projects cannot be submitted; however, using open-source libraries, frameworks, and your own previously created tools is permitted as long as they're properly attributed."
      },
      {
        question: "How will projects be judged?",
        answer: "Projects will be evaluated by a panel of industry experts based on innovation, technical complexity, real-world applicability, design quality, and presentation effectiveness. Each team will have a 5-minute pitch followed by a Q&A session with the judges. Detailed judging criteria will be shared before the event."
      }
    ]
  },
  {
    id: 'prizes',
    name: 'Prizes & Recognition',
    icon: <Plus size={20} />,
    questions: [
      {
        question: "What prizes are available for winners?",
        answer: "The total prize pool exceeds $25,000, including cash awards, cutting-edge hardware, cloud credits, and development tools. Special categories include Best Overall Solution ($10,000), Most Innovative Use of AI ($5,000), Best UX/UI Design ($2,500), and several sponsor-specific prizes that will be announced at the event."
      },
      {
        question: "Are there opportunities beyond winning prizes?",
        answer: "Yes! Many successful teams receive mentorship opportunities, incubator access, and potential investment interest from our sponsor companies. Previous participants have secured job offers, internships, and partnership opportunities through connections made during the hackathon."
      },
      {
        question: "Will participants receive certificates?",
        answer: "All participants will receive digital certificates of participation. Winners and runners-up will receive special recognition certificates. Additionally, completing specific workshops during the event will earn you skill-specific credentials that can be added to your professional profiles."
      }
    ]
  }
];

const EnhancedFAQ = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle question expansion
  const toggleQuestion = (question: string) => {
    setExpandedQuestions(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question) 
        : [...prev, question]
    );
  };
  
  // Handle search filtering
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredQuestions([]);
      return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    const results: any[] = [];
    
    faqCategories.forEach(category => {
      category.questions.forEach(item => {
        if (
          item.question.toLowerCase().includes(searchLower) ||
          item.answer.toLowerCase().includes(searchLower)
        ) {
          results.push({
            ...item,
            category: category.name
          });
        }
      });
    });
    
    setFilteredQuestions(results);
  }, [searchTerm]);
  
  // Create particle effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particleCount = 20;
    
    // Create keyframes for FAQ particles if not exist
    if (!document.getElementById('faq-particle-keyframes')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'faq-particle-keyframes';
      styleEl.textContent = `
        @keyframes faqParticleFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 20}deg); }
          50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * -20}deg); }
          75% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 20}deg); }
        }
      `;
      document.head.appendChild(styleEl);
    }
    
    // Remove existing particles
    const existingParticles = container.querySelectorAll('.faq-particle');
    existingParticles.forEach(p => p.remove());
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('faq-particle');
      
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
      particle.style.animation = `faqParticleFloat ${duration}s infinite ease-in-out`;
      particle.style.animationDelay = `${delay}s`;
      
      container.appendChild(particle);
    }
    
    return () => {
      const el = document.getElementById('faq-particle-keyframes');
      if (el) el.remove();
    };
  }, [theme]);
  
  return (
    <section
      id="faq"
      ref={containerRef}
      className={cn(
        "relative min-h-screen py-24 overflow-hidden transition-colors duration-500",
        theme === 'dark' ? 'bg-transparent' : 'bg-white/5'
      )}
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-4">
            <HelpCircle 
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
            <span className="relative z-10">Frequently Asked Questions</span>
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
            Find answers to common questions about our quantum hackathon experience.
            Can't find what you're looking for? Contact us directly.
          </p>
        </div>
        
        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className={cn(
            "relative rounded-full overflow-hidden transition-all duration-300 focus-within:ring-2",
            theme === 'dark' 
              ? 'bg-black/30 border border-white/10 focus-within:ring-cosmic-purple/50' 
              : 'bg-white/70 border border-cosmic-purple/10 focus-within:ring-cosmic-purple/30'
          )}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={cn(
                "block w-full pl-12 pr-5 py-3 text-base outline-none transition-colors duration-300",
                theme === 'dark' 
                  ? 'bg-transparent text-white placeholder:text-gray-400' 
                  : 'bg-transparent text-cosmic-deepPurple placeholder:text-gray-500'
              )}
            />
            {searchTerm && (
              <button 
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        
        {/* Search results */}
        {searchTerm && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className={cn(
              "p-6 rounded-xl transition-all duration-500",
              theme === 'dark' 
                ? 'bg-black/30 border border-white/10' 
                : 'bg-white/70 border border-cosmic-purple/10',
              "backdrop-blur-sm"
            )}>
              <h3 className={cn(
                "text-xl font-semibold mb-4 transition-colors duration-500",
                theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
              )}>
                Search Results ({filteredQuestions.length})
              </h3>
              
              {filteredQuestions.length === 0 ? (
                <p className={cn(
                  "text-center py-6 transition-colors duration-500",
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                )}>
                  No results found for "{searchTerm}". Try a different search term or browse the categories below.
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredQuestions.map((item, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "p-4 rounded-lg transition-all duration-300",
                        theme === 'dark' 
                          ? 'bg-black/20 hover:bg-black/30 border border-white/5' 
                          : 'bg-white/60 hover:bg-white/80 border border-cosmic-purple/5',
                      )}
                    >
                      <div className="flex justify-between">
                        <h4 className={cn(
                          "font-medium cursor-pointer transition-colors duration-500",
                          theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                        )}>
                          {item.question}
                        </h4>
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full transition-colors duration-500",
                          theme === 'dark' 
                            ? 'bg-cosmic-purple/20 text-cosmic-purple' 
                            : 'bg-cosmic-purple/10 text-cosmic-deepPurple'
                        )}>
                          {item.category}
                        </span>
                      </div>
                      <p className={cn(
                        "mt-2 text-sm transition-colors duration-500",
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      )}>
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {!searchTerm && (
          <>
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8" data-animate="fade-up" data-delay="300">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 flex items-center gap-2",
                    activeCategory === category.id
                      ? theme === 'dark'
                        ? 'bg-cosmic-purple/30 text-white'
                        : 'bg-cosmic-purple/20 text-cosmic-deepPurple'
                      : theme === 'dark'
                        ? 'bg-black/20 text-gray-300 hover:bg-black/30 hover:text-white'
                        : 'bg-white/40 text-gray-600 hover:bg-white/60 hover:text-cosmic-deepPurple',
                    "border",
                    theme === 'dark' ? 'border-white/10' : 'border-cosmic-purple/10'
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="opacity-80">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* FAQ accordion */}
            <div 
              className="max-w-3xl mx-auto space-y-4"
              data-animate="fade-up"
              data-delay="400"
            >
              {faqCategories
                .find(cat => cat.id === activeCategory)
                ?.questions.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded-xl overflow-hidden transition-all duration-500",
                      theme === 'dark' 
                        ? 'bg-black/30 border border-white/10' 
                        : 'bg-white/70 border border-cosmic-purple/10',
                      expandedQuestions.includes(item.question) && (
                        theme === 'dark'
                          ? 'ring-1 ring-cosmic-purple/30'
                          : 'ring-1 ring-cosmic-purple/20'
                      ),
                      "backdrop-blur-sm"
                    )}
                  >
                    <button
                      className="flex items-center justify-between w-full px-6 py-4 text-left"
                      onClick={() => toggleQuestion(item.question)}
                    >
                      <h3 className={cn(
                        "font-medium text-base md:text-lg transition-colors duration-500",
                        theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                      )}>
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0 ml-4">
                        {expandedQuestions.includes(item.question) ? (
                          <Minus 
                            size={18} 
                            className={theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'} 
                          />
                        ) : (
                          <Plus 
                            size={18} 
                            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} 
                          />
                        )}
                      </div>
                    </button>
                    
                    <div 
                      className={cn(
                        "overflow-hidden transition-all duration-500",
                        expandedQuestions.includes(item.question) 
                          ? "max-h-96 opacity-100" 
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <div className={cn(
                        "px-6 pb-4 text-sm md:text-base transition-colors duration-500",
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      )}>
                        {item.answer}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
        
        {/* Contact for more questions */}
        <div 
          className="mt-16 max-w-2xl mx-auto text-center p-6"
          data-animate="fade-up"
          data-delay="500"
        >
          <h3 className={cn(
            "text-xl font-semibold mb-3 transition-colors duration-500",
            theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
          )}>
            Still have questions?
          </h3>
          
          <p className={cn(
            "mb-6 transition-colors duration-500",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}>
            We're here to help. Contact our team directly for personalized assistance.
          </p>
          
          <a 
            href="#contact" 
            className={cn(
              "inline-block px-6 py-3 rounded-lg font-medium transition-all duration-300",
              theme === 'dark' 
                ? 'bg-cosmic-purple text-white hover:bg-cosmic-deepPurple' 
                : 'bg-cosmic-deepPurple text-white hover:bg-cosmic-purple',
              "hover:shadow-lg hover:shadow-cosmic-purple/20"
            )}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default EnhancedFAQ;
