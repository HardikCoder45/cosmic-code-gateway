
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';

const scheduleEvents = [
  {
    day: "Day 1",
    events: [
      { time: "9:00 AM", title: "Registration & Check-In", description: "Arrive, get your badge and swag pack with exclusive cosmic-themed merchandise", location: "Main Lobby" },
      { time: "10:00 AM", title: "Opening Ceremony", description: "Welcome address and challenge unveiling by industry leaders and sponsors", location: "Nebula Auditorium" },
      { time: "11:30 AM", title: "Team Formation", description: "Find teammates and brainstorm ideas through our interactive matching system", location: "Collaboration Hub" },
      { time: "1:00 PM", title: "Hacking Begins", description: "Start coding your cosmic creation with access to all resources and API platforms", location: "Hacking Zones" },
      { time: "3:30 PM", title: "Workshop: AI & ML Integration", description: "Learn to incorporate cutting-edge AI/ML tools into your project", location: "Workshop Room A" },
      { time: "7:00 PM", title: "Dinner & Workshops", description: "Refuel with catered dinner while attending specialized tech workshops", location: "Dining Area & Labs" }
    ]
  },
  {
    day: "Day 2",
    events: [
      { time: "9:00 AM", title: "Breakfast & Mentorship", description: "Morning meal followed by dedicated mentor sessions with industry experts", location: "Dining Area & Mentor Stations" },
      { time: "11:00 AM", title: "Workshop: Pitch Perfect", description: "Learn how to effectively present your project to judges and investors", location: "Workshop Room B" },
      { time: "12:00 PM", title: "Progress Check-In", description: "Share your progress with mentors and receive valuable feedback", location: "Project Stations" },
      { time: "3:00 PM", title: "Workshop: UX Design", description: "Enhance your project's user experience with expert guidance", location: "Design Lab" },
      { time: "6:00 PM", title: "Final Submissions", description: "Submit your project for judging through our digital platform", location: "Online Submission" },
      { time: "7:00 PM", title: "Dinner & Demo Prep", description: "Last meal before presentations and time to perfect your demo", location: "Dining Area & Prep Zones" },
      { time: "9:00 PM", title: "Project Showcase", description: "Present your creation to judges and peers in a science-fair style format", location: "Exhibition Hall" }
    ]
  },
  {
    day: "Day 3",
    events: [
      { time: "10:00 AM", title: "Judging Period", description: "Judges review all submissions and deliberate on the winners", location: "Judging Chamber" },
      { time: "12:00 PM", title: "Finalist Announcements", description: "Top 10 teams announced for final presentation round", location: "Nebula Auditorium" },
      { time: "1:00 PM", title: "Awards Ceremony", description: "Winners announced and prizes awarded across multiple categories", location: "Main Stage" },
      { time: "2:30 PM", title: "Networking Session", description: "Connect with sponsors and recruiters for internship and job opportunities", location: "Networking Lounge" },
      { time: "4:00 PM", title: "Closing Ceremony", description: "Final remarks, acknowledgments, and future hackathon announcements", location: "Nebula Auditorium" }
    ]
  }
];

const EnhancedSchedule = () => {
  const { theme } = useTheme();
  const [activeDay, setActiveDay] = useState("Day 1");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [animateTimeline, setAnimateTimeline] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateTimeline(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Create constellation effect between timeline events
  useEffect(() => {
    if (!timelineRef.current || !animateTimeline) return;
    
    const timeline = timelineRef.current;
    const stars = timeline.querySelectorAll('.timeline-star');
    
    if (stars.length < 2) return;
    
    // Remove any existing lines
    const existingLines = timeline.querySelectorAll('.constellation-line');
    existingLines.forEach(line => line.remove());
    
    // Connect stars with lines to form constellation
    for (let i = 0; i < stars.length - 1; i++) {
      const currentStar = stars[i];
      const nextStar = stars[i + 1];
      
      const currentRect = currentStar.getBoundingClientRect();
      const nextRect = nextStar.getBoundingClientRect();
      const timelineRect = timeline.getBoundingClientRect();
      
      // Calculate positions relative to timeline
      const x1 = currentRect.left + currentRect.width / 2 - timelineRect.left;
      const y1 = currentRect.top + currentRect.height / 2 - timelineRect.top;
      const x2 = nextRect.left + nextRect.width / 2 - timelineRect.left;
      const y2 = nextRect.top + nextRect.height / 2 - timelineRect.top;
      
      // Calculate line properties
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
      
      // Create line
      const line = document.createElement('div');
      line.className = `constellation-line absolute transform origin-left transition-all duration-1000 opacity-0 ${theme === 'dark' ? 'bg-cosmic-purple/30' : 'bg-cosmic-deepPurple/20'}`;
      line.style.height = '1px';
      line.style.width = `${length}px`;
      line.style.left = `${x1}px`;
      line.style.top = `${y1}px`;
      line.style.transform = `rotate(${angle}deg)`;
      
      timeline.appendChild(line);
      
      // Animate line
      setTimeout(() => {
        line.style.opacity = '1';
      }, 100 * i);
    }
  }, [activeDay, animateTimeline, theme]);
  
  const handleStarClick = (event: any) => {
    setSelectedEvent(selectedEvent?.time === event.time ? null : event);
  };
  
  // Simulate star twinkling
  useEffect(() => {
    const interval = setInterval(() => {
      const stars = document.querySelectorAll('.timeline-star');
      const randomStar = stars[Math.floor(Math.random() * stars.length)];
      if (randomStar) {
        randomStar.classList.add('animate-pulse');
        setTimeout(() => {
          randomStar.classList.remove('animate-pulse');
        }, 2000);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [activeDay]);
  
  return (
    <section 
      id="schedule" 
      ref={sectionRef}
      className={cn(
        "min-h-screen py-20 relative overflow-hidden transition-colors duration-500",
        theme === 'dark' ? 'bg-transparent' : 'bg-white/5'
      )}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated orbit rings */}
        <div className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full border border-dashed opacity-10 animate-spin",
          theme === 'dark' ? 'border-white' : 'border-cosmic-purple'
        )} style={{ animationDuration: '180s' }}></div>
        <div className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border border-dashed opacity-10 animate-spin",
          theme === 'dark' ? 'border-cosmic-purple' : 'border-cosmic-deepPurple'
        )} style={{ animationDuration: '120s', animationDirection: 'reverse' }}></div>
        <div className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh] rounded-full border border-dashed opacity-10 animate-spin",
          theme === 'dark' ? 'border-cosmic-pink' : 'border-cosmic-purple'
        )} style={{ animationDuration: '90s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className={cn(
          "text-4xl md:text-5xl font-bold mb-4 text-center transition-colors duration-500",
          theme === 'dark' ? 'text-cosmic-purple text-glow' : 'text-cosmic-deepPurple'
        )}>
          Cosmic Timeline
        </h2>
        
        <p className={cn(
          "max-w-2xl mx-auto text-center mb-12 transition-colors duration-500",
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}>
          Navigate through our celestial schedule as you embark on a 
          48-hour journey of coding, learning, and innovation across the digital cosmos.
        </p>
        
        {/* Day selector tabs - styled as planets */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {scheduleEvents.map((day, index) => (
            <button
              key={day.day}
              data-hoverable="true"
              className={cn(
                "relative group transition-all duration-300 p-1",
                activeDay === day.day ? "scale-110" : "scale-100 hover:scale-105"
              )}
              onClick={() => setActiveDay(day.day)}
            >
              {/* Planet */}
              <div className={cn(
                "w-16 h-16 md:w-20 md:h-20 rounded-full relative overflow-hidden transition-all duration-500 flex items-center justify-center transform",
                activeDay === day.day 
                  ? `bg-gradient-to-br from-cosmic-purple to-cosmic-${index === 0 ? 'blue' : index === 1 ? 'pink' : 'orange'} cosmic-shadow scale-100` 
                  : theme === 'dark'
                    ? 'bg-cosmic-darkPurple/70 hover:bg-cosmic-darkPurple scale-90'
                    : 'bg-white/50 hover:bg-white/80 border border-cosmic-purple/30 scale-90'
              )}>
                {/* Planet texture/pattern */}
                <div className="absolute inset-0">
                  <div className={cn(
                    "absolute inset-0 opacity-30",
                    activeDay === day.day ? "animate-spin" : ""
                  )} style={{ animationDuration: '20s' }}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-full h-0.5 bg-white/20 origin-center"
                        style={{ transform: `rotate(${i * 22.5}deg)` }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <span className={cn(
                  "font-bold z-10 transition-colors duration-500 text-sm md:text-base",
                  activeDay === day.day 
                    ? 'text-white' 
                    : theme === 'dark' 
                      ? 'text-gray-300' 
                      : 'text-cosmic-deepPurple'
                )}>
                  {day.day}
                </span>
              </div>
              
              {/* Orbit ring - only visible for active day */}
              {activeDay === day.day && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%+16px)] h-[calc(100%+16px)] rounded-full border border-dashed animate-spin pointer-events-none opacity-70"
                  style={{ 
                    animationDuration: '10s',
                    borderColor: index === 0 ? '#0EA5E9' : index === 1 ? '#D946EF' : '#F97316'
                  }}
                ></div>
              )}
              
              {/* Small moons */}
              {activeDay === day.day && (
                <>
                  <div className="absolute w-3 h-3 rounded-full bg-white top-0 left-1/2 transform -translate-x-1/2 animate-orbit" 
                    style={{ animationDuration: `${5 + index}s` }}></div>
                  <div className="absolute w-2 h-2 rounded-full bg-cosmic-pink top-1/2 right-0 transform translate-x-1/2 animate-orbit-reverse" 
                    style={{ animationDuration: `${4 + index}s` }}></div>
                </>
              )}
            </button>
          ))}
        </div>
        
        {/* Timeline visualization */}
        <div 
          ref={timelineRef}
          className={cn(
            "relative w-full max-w-6xl mx-auto mb-12 p-8 rounded-2xl transition-all duration-500",
            theme === 'dark'
              ? 'bg-black/30 border border-white/5 backdrop-blur-sm'
              : 'bg-white/40 border border-cosmic-purple/10 backdrop-blur-sm',
            animateTimeline ? 'opacity-100' : 'opacity-0 transform translate-y-10'
          )}
        >
          {/* Connected path line */}
          <div className={cn(
            "absolute left-0 md:left-1/2 top-0 bottom-0 w-px transition-colors duration-500",
            theme === 'dark' ? 'bg-cosmic-purple/50' : 'bg-cosmic-deepPurple/30'
          )}></div>
          
          {/* Events as stars */}
          <div className="space-y-12 md:space-y-20">
            {scheduleEvents.find(day => day.day === activeDay)?.events.map((event, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative flex flex-col md:flex-row md:items-start opacity-0 transform translate-y-10 transition-all duration-700",
                  index % 2 === 0 ? "md:flex-row-reverse" : "",
                  animateTimeline && `opacity-100 translate-y-0`
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Timeline connector and star */}
                <div className="absolute left-0 md:left-1/2 top-6 transform md:-translate-x-1/2 z-10">
                  <button
                    data-hoverable="true"
                    className={cn(
                      "timeline-star w-8 h-8 flex items-center justify-center relative transition-all duration-300",
                      selectedEvent?.time === event.time
                        ? "scale-125"
                        : "scale-100 hover:scale-110"
                    )}
                    onClick={() => handleStarClick(event)}
                  >
                    {/* Star shape */}
                    <div className={cn(
                      "absolute inset-0 transition-all duration-500",
                      selectedEvent?.time === event.time
                        ? "opacity-100"
                        : "opacity-70"
                    )}>
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <path 
                          fill={theme === 'dark' ? "#9b87f5" : "#7E69AB"} 
                          d="M12 1l3.22 6.513 7.19.986-5.19 5.064 1.22 7.136L12 17.267l-6.44 3.432 1.22-7.136-5.19-5.064 7.19-.986L12 1z"
                        />
                      </svg>
                    </div>
                    
                    {/* Center glow */}
                    <div className={cn(
                      "w-2 h-2 rounded-full transition-all duration-500",
                      selectedEvent?.time === event.time
                        ? theme === 'dark' ? "bg-white" : "bg-cosmic-purple"
                        : theme === 'dark' ? "bg-cosmic-pink" : "bg-cosmic-deepPurple"
                    )}></div>
                  </button>
                </div>
                
                {/* Time marker */}
                <div className={cn(
                  "w-full md:w-1/2 pl-10 md:pl-0 md:pr-10 text-left md:text-right mb-2 md:mb-0",
                  index % 2 === 0 ? "md:pl-10 md:pr-0 md:text-left" : ""
                )}>
                  <span className={cn(
                    "font-semibold transition-colors duration-500",
                    theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
                  )}>
                    {event.time}
                  </span>
                  <div className={cn(
                    "text-sm transition-colors duration-500",
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  )}>
                    {event.location}
                  </div>
                </div>
                
                {/* Event content */}
                <div className={cn(
                  "w-full md:w-1/2 pl-10 md:pl-10",
                  index % 2 === 0 ? "md:pr-10 md:pl-0 md:text-right" : "md:text-left"
                )}>
                  <h3 className={cn(
                    "text-xl font-bold transition-colors duration-500",
                    theme === 'dark' ? 'text-white' : 'text-cosmic-darkPurple'
                  )}>{event.title}</h3>
                  <p className={cn(
                    "transition-colors duration-500",
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  )}>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Selected event details - shows when a star is clicked */}
        {selectedEvent && (
          <div className={cn(
            "w-full max-w-2xl mx-auto mt-8 rounded-xl p-8 transition-all duration-500 transform animate-scale-in relative overflow-hidden",
            theme === 'dark'
              ? 'bg-black/50 border border-cosmic-purple/30 backdrop-blur-md'
              : 'bg-white/70 border border-cosmic-purple/20 backdrop-blur-md'
          )}>
            {/* Background effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple via-cosmic-pink to-cosmic-blue animate-pulse" style={{ animationDuration: '4s' }}></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between mb-3 items-start">
                <h3 className={cn(
                  "text-2xl font-bold transition-colors duration-500",
                  theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
                )}>
                  {selectedEvent.title}
                </h3>
                <div className={cn(
                  "font-mono text-sm px-3 py-1 rounded-full transition-colors duration-500",
                  theme === 'dark' 
                    ? 'bg-cosmic-purple/20 text-white' 
                    : 'bg-cosmic-purple/10 text-cosmic-deepPurple'
                )}>
                  {selectedEvent.time}
                </div>
              </div>
              
              <p className={cn(
                "mb-4 transition-colors duration-500",
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              )}>
                {selectedEvent.description}
              </p>
              
              <div className={cn(
                "text-sm italic transition-colors duration-500",
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              )}>
                Location: {selectedEvent.location}
              </div>
              
              <div className="mt-4 flex justify-between">
                <button
                  data-hoverable="true"
                  className={cn(
                    "text-sm px-4 py-1 rounded-full transition-all duration-300",
                    theme === 'dark' 
                      ? 'bg-cosmic-purple/20 text-white hover:bg-cosmic-purple/30' 
                      : 'bg-cosmic-purple/10 text-cosmic-deepPurple hover:bg-cosmic-purple/20'
                  )}
                  onClick={() => console.log('Add to calendar')}
                >
                  Add to Calendar
                </button>
                
                <button
                  data-hoverable="true"
                  className={cn(
                    "text-sm px-4 py-1 rounded-full transition-all duration-300",
                    theme === 'dark' 
                      ? 'bg-cosmic-purple/20 text-white hover:bg-cosmic-purple/30' 
                      : 'bg-cosmic-purple/10 text-cosmic-deepPurple hover:bg-cosmic-purple/20'
                  )}
                  onClick={() => setSelectedEvent(null)}
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EnhancedSchedule;
