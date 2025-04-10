
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';

// Image data with credits to Unsplash
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1635776062127-df78c87b4418?auto=format&fit=crop&w=800&q=80",
    alt: "Quantum computer circuitry",
    caption: "Next-gen quantum computing architecture",
    credit: "Unsplash"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    alt: "Tech event collaboration",
    caption: "Collaborative innovation sessions",
    credit: "Unsplash"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    alt: "Coding visualization",
    caption: "Breakthrough algorithms in action",
    credit: "Unsplash"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    alt: "Futuristic interface",
    caption: "Gateway to quantum solutions",
    credit: "Unsplash"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    alt: "Hackathon team",
    caption: "Exceptional minds collaborating",
    credit: "Unsplash"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=800&q=80",
    alt: "Digital neural network",
    caption: "Quantum neural networks expanding",
    credit: "Unsplash"
  }
];

const ImagesGallery = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Auto rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;
      
      const scrollPosition = window.scrollY;
      const galleryElem = galleryRef.current;
      const galleryTop = galleryElem.offsetTop;
      const galleryHeight = galleryElem.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Only apply effect when gallery is in view
      if (scrollPosition + windowHeight > galleryTop && scrollPosition < galleryTop + galleryHeight) {
        const scrollProgress = (scrollPosition + windowHeight - galleryTop) / (galleryHeight + windowHeight);
        
        // Apply parallax to each image
        const imgElements = galleryElem.querySelectorAll('.gallery-img');
        imgElements.forEach((img, idx) => {
          const direction = idx % 2 === 0 ? 1 : -1;
          const translateY = scrollProgress * direction * 50;
          (img as HTMLElement).style.transform = `translateY(${translateY}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="gallery" 
      ref={galleryRef}
      className={cn(
        "py-20 relative overflow-hidden",
        theme === 'dark' ? 'bg-black/30' : 'bg-white/10'
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-4xl md:text-5xl font-bold mb-4",
            theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
          )}>
            <span className="relative inline-block">
              <span className="relative z-10">Quantum Visions</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cosmic-purple to-cosmic-blue opacity-70 blur-xl filter-none"></span>
            </span>
          </h2>
          
          <p className={cn(
            "max-w-2xl mx-auto",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}>
            Glimpses into the future of innovation and collaboration. 
            Our hackathon creates spaces where brilliance converges and 
            technological breakthroughs emerge.
          </p>
        </div>
        
        {/* Image gallery with micro-interactions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <motion.div 
              key={image.id}
              className={cn(
                "gallery-card rounded-xl overflow-hidden relative group",
                "transition-all duration-700 ease-out transform",
                "cursor-pointer"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div 
                className={cn(
                  "gallery-img w-full aspect-[4/3] overflow-hidden relative",
                  "transition-all duration-700"
                )}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className={cn(
                    "w-full h-full object-cover transition-all duration-700",
                    hoverIndex === index ? "scale-110" : "scale-100"
                  )}
                />
                
                {/* Image overlay with gradient */}
                <div 
                  className={cn(
                    "absolute inset-0 opacity-60 transition-opacity duration-500",
                    theme === 'dark' 
                      ? 'bg-gradient-to-t from-black via-black/50 to-transparent' 
                      : 'bg-gradient-to-t from-cosmic-deepPurple/80 via-cosmic-purple/30 to-transparent',
                    hoverIndex === index ? "opacity-80" : "opacity-60"
                  )}
                />
                
                {/* Glowing border effect on hover */}
                <div 
                  className={cn(
                    "absolute inset-0 border-2 border-transparent transition-all duration-500",
                    hoverIndex === index && (
                      theme === 'dark' 
                        ? "border-cosmic-purple/50 shadow-[0_0_15px_rgba(155,135,245,0.5)]" 
                        : "border-cosmic-deepPurple/50 shadow-[0_0_15px_rgba(110,89,165,0.5)]"
                    )
                  )}
                />
                
                {/* Caption */}
                <div 
                  className={cn(
                    "absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500",
                    hoverIndex === index ? "translate-y-0" : "translate-y-4"
                  )}
                >
                  <h3 className="text-white font-medium text-lg mb-1">
                    {image.caption}
                  </h3>
                  <p className={cn(
                    "text-sm transition-opacity duration-500",
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-200',
                    hoverIndex === index ? "opacity-100" : "opacity-0"
                  )}>
                    Photo: {image.credit}
                  </p>
                </div>
                
                {/* Particle effect on hover */}
                {hoverIndex === index && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white animate-ping"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          opacity: Math.random() * 0.7 + 0.3,
                          animationDuration: `${Math.random() * 1 + 0.5}s`,
                          animationDelay: `${Math.random() * 0.5}s`
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Interactive feature highlight */}
        <div className={cn(
          "p-8 rounded-xl backdrop-blur-md mt-16 relative overflow-hidden",
          theme === 'dark' 
            ? 'bg-black/30 border border-white/10' 
            : 'bg-white/30 border border-cosmic-purple/10'
        )}>
          <div className="relative z-10">
            <h3 className={cn(
              "text-2xl font-bold mb-6",
              theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
            )}>
              Immersive Innovation Environment
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className={cn(
                  "mb-4",
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                )}>
                  Our venue features cutting-edge technology and inspiring spaces designed 
                  to fuel creativity and foster collaboration between brilliant minds.
                </p>
                
                <ul className="space-y-3">
                  {[
                    "Quantum computing demonstration areas",
                    "Holographic presentation stages",
                    "Neural interface testing labs",
                    "Virtual collaboration environments"
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      className={cn(
                        "flex items-center",
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      )}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className={cn(
                        "inline-block w-2 h-2 rounded-full mr-2",
                        theme === 'dark' ? 'bg-cosmic-purple' : 'bg-cosmic-deepPurple'
                      )}></span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" 
                    alt="Advanced innovation lab" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay with gradient */}
                  <div className={cn(
                    "absolute inset-0 opacity-30",
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-cosmic-purple via-transparent to-cosmic-blue' 
                      : 'bg-gradient-to-br from-cosmic-deepPurple via-transparent to-cosmic-blue'
                  )}></div>
                  
                  {/* Interactive play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center cursor-pointer",
                        "backdrop-blur-md",
                        theme === 'dark' 
                          ? 'bg-white/10 hover:bg-white/20' 
                          : 'bg-cosmic-deepPurple/30 hover:bg-cosmic-deepPurple/50',
                        "transition-all duration-300"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className={cn(
                          "w-8 h-8",
                          theme === 'dark' ? 'text-white' : 'text-white'
                        )}
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </motion.div>
                  </div>
                </div>
                
                {/* Annotation */}
                <div className={cn(
                  "absolute -bottom-4 -right-4 p-3 rounded-lg max-w-[200px]",
                  "transform rotate-2",
                  theme === 'dark' 
                    ? 'bg-cosmic-purple/20 backdrop-blur-md border border-white/10' 
                    : 'bg-white/80 backdrop-blur-md border border-cosmic-purple/20',
                  "shadow-lg"
                )}>
                  <p className={cn(
                    "text-sm italic",
                    theme === 'dark' ? 'text-gray-200' : 'text-cosmic-deepPurple'
                  )}>
                    Participants have access to state-of-the-art equipment and emerging technologies
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-40 h-40 opacity-30 blur-3xl rounded-full bg-cosmic-purple"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 opacity-30 blur-3xl rounded-full bg-cosmic-blue"></div>
        </div>
      </div>
    </section>
  );
};

export default ImagesGallery;
