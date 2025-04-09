
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const scheduleEvents = [
  {
    day: "Day 1",
    events: [
      { time: "9:00 AM", title: "Registration & Check-In", description: "Arrive, get your badge and swag" },
      { time: "10:00 AM", title: "Opening Ceremony", description: "Welcome address and challenge unveiling" },
      { time: "11:30 AM", title: "Team Formation", description: "Find teammates and brainstorm ideas" },
      { time: "1:00 PM", title: "Hacking Begins", description: "Start coding your cosmic creation" },
      { time: "7:00 PM", title: "Dinner & Workshops", description: "Learn new technologies while you eat" }
    ]
  },
  {
    day: "Day 2",
    events: [
      { time: "9:00 AM", title: "Breakfast & Mentorship", description: "Get advice from industry experts" },
      { time: "12:00 PM", title: "Progress Check-In", description: "Share your progress with mentors" },
      { time: "6:00 PM", title: "Final Submissions", description: "Submit your project for judging" },
      { time: "7:00 PM", title: "Dinner & Demo Prep", description: "Prepare your presentation" },
      { time: "9:00 PM", title: "Project Showcase", description: "Present your creation to judges and peers" }
    ]
  },
  {
    day: "Day 3",
    events: [
      { time: "10:00 AM", title: "Judging Period", description: "Judges review all submissions" },
      { time: "1:00 PM", title: "Awards Ceremony", description: "Winners announced and prizes awarded" },
      { time: "2:30 PM", title: "Networking Session", description: "Connect with sponsors and recruiters" },
      { time: "4:00 PM", title: "Closing Ceremony", description: "Final remarks and farewell" }
    ]
  }
];

const Schedule = () => {
  const [activeDay, setActiveDay] = useState("Day 1");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const handleStarClick = (event: any) => {
    setSelectedEvent(selectedEvent?.time === event.time ? null : event);
  };
  
  return (
    <section id="schedule" className="min-h-screen py-20 flex flex-col items-center justify-center relative">
      <h2 className="text-4xl md:text-5xl font-bold text-cosmic-purple text-glow mb-4">
        Cosmic Timeline
      </h2>
      
      <p className="text-gray-300 max-w-2xl text-center mb-12 px-4">
        Navigate through our celestial schedule as you embark on a 
        48-hour journey of coding, learning, and innovation.
      </p>
      
      {/* Day tabs */}
      <div className="flex space-x-2 mb-16">
        {scheduleEvents.map((day) => (
          <button
            key={day.day}
            className={cn(
              "px-6 py-2 rounded-full transition-all duration-300",
              activeDay === day.day 
                ? "bg-cosmic-purple text-white cosmic-shadow" 
                : "bg-cosmic-darkPurple/30 text-gray-300 hover:bg-cosmic-darkPurple/50"
            )}
            onClick={() => setActiveDay(day.day)}
          >
            {day.day}
          </button>
        ))}
      </div>
      
      {/* Starfield timeline */}
      <div className="relative w-full max-w-4xl mx-auto mb-8 px-4">
        {/* Connected path line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-cosmic-purple/30 transform md:translate-x-0" />
        
        {/* Events as stars */}
        <div className="space-y-8">
          {scheduleEvents.find(day => day.day === activeDay)?.events.map((event, index) => (
            <div 
              key={index} 
              className={cn(
                "relative flex flex-col md:flex-row md:items-center",
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Timeline connector and star */}
              <div className="absolute left-0 md:left-1/2 top-1/2 transform md:-translate-x-1/2 -translate-y-1/2 z-10">
                <button
                  className={cn(
                    "w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center",
                    selectedEvent?.time === event.time
                      ? "bg-cosmic-purple scale-150 cosmic-shadow"
                      : "bg-cosmic-darkPurple hover:bg-cosmic-purple animate-pulse"
                  )}
                  onClick={() => handleStarClick(event)}
                >
                  <span className="w-1 h-1 bg-white rounded-full" />
                </button>
              </div>
              
              {/* Time marker */}
              <div className={cn(
                "w-full md:w-1/2 p-4 text-right",
                index % 2 === 0 ? "md:text-left" : ""
              )}>
                <span className="text-cosmic-purple font-semibold">{event.time}</span>
              </div>
              
              {/* Event content */}
              <div className={cn(
                "w-full md:w-1/2 pl-8 md:pl-0 md:p-4",
                index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
              )}>
                <h3 className="text-xl font-bold text-white">{event.title}</h3>
                <p className="text-gray-400">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Selected event details - shows when a star is clicked */}
      {selectedEvent && (
        <div className="cosmic-card w-full max-w-xl mx-auto mt-8 animate-scale-in">
          <h3 className="text-2xl font-bold text-cosmic-purple mb-2">
            {selectedEvent.title} - {selectedEvent.time}
          </h3>
          <p className="text-gray-300 mb-4">
            {selectedEvent.description}
          </p>
          <div className="text-sm text-gray-400">
            Don't miss this event! Add it to your calendar or set a reminder.
          </div>
        </div>
      )}
    </section>
  );
};

export default Schedule;
