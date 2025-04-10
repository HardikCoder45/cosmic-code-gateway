
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, Code, Users, Wrench, LineChart } from 'lucide-react';

const criteria = [
  {
    name: "Innovation",
    description: "How original and inventive is the project? Does it solve a problem in a novel way or create something entirely new?",
    icon: Lightbulb,
    weight: "25%",
    details: [
      "Uniqueness of the approach",
      "Creative application of technology",
      "Addresses previously unsolved problems"
    ]
  },
  {
    name: "Technical Complexity",
    description: "How sophisticated is the technical implementation? Did the team overcome significant technical challenges?",
    icon: Code,
    weight: "20%",
    details: [
      "Code quality and architecture",
      "Effective use of advanced technologies",
      "Technical challenges overcome"
    ]
  },
  {
    name: "Design & UX",
    description: "How intuitive and engaging is the user experience? Is the design visually appealing and functional?",
    icon: Sparkles,
    weight: "15%",
    details: [
      "Visual design quality",
      "Usability and intuitive interaction",
      "Responsive and accessible implementation"
    ]
  },
  {
    name: "Completeness",
    description: "How fully realized is the project? Is it functional and demonstrable in its current state?",
    icon: Wrench,
    weight: "15%",
    details: [
      "Working end-to-end functionality",
      "Feature completeness relative to concept",
      "Stability and reliability"
    ]
  },
  {
    name: "Impact & Utility",
    description: "What potential impact could this project have? Does it provide real value to users?",
    icon: LineChart,
    weight: "15%",
    details: [
      "Potential market or social impact",
      "Scalability of the solution",
      "Addresses real user needs"
    ]
  },
  {
    name: "Teamwork & Presentation",
    description: "How well did the team collaborate and communicate their project? Was the presentation clear and compelling?",
    icon: Users,
    weight: "10%",
    details: [
      "Quality of project presentation",
      "Clear explanation of technical aspects",
      "Evidence of effective collaboration"
    ]
  }
];

const JudgingCriteria = () => {
  const { theme } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="judging" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-cosmic-purple/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-cosmic-pink/20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={cn(
            "text-4xl md:text-5xl font-bold mb-4",
            theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
          )}>
            Judging Criteria
          </h2>
          <p className={cn(
            "max-w-2xl mx-auto text-lg",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}>
            Understand how your project will be evaluated by our panel of industry experts and tech visionaries.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {criteria.map((criterion, idx) => {
            const Icon = criterion.icon;
            const isExpanded = expandedIndex === idx;
            
            return (
              <motion.div 
                key={idx}
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div 
                  className={cn(
                    "h-full p-6 rounded-2xl transition-all duration-300 cursor-pointer",
                    theme === 'dark' 
                      ? 'bg-black/30 backdrop-blur-md border border-white/10' 
                      : 'bg-white/70 backdrop-blur-md border border-cosmic-purple/10',
                    isExpanded && "shadow-lg shadow-cosmic-purple/20"
                  )}
                  onClick={() => toggleExpand(idx)}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-cosmic-purple to-cosmic-pink transition-transform duration-300",
                      isExpanded && "rotate-[360deg]"
                    )}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className={cn(
                          "text-xl font-bold",
                          theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                        )}>
                          {criterion.name}
                        </h3>
                        <span className="text-cosmic-purple font-bold">{criterion.weight}</span>
                      </div>
                      
                      <p className={cn(
                        "mt-2 text-sm",
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      )}>
                        {criterion.description}
                      </p>
                      
                      <motion.div 
                        className="mt-4 overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className={cn(
                          "text-sm font-bold mb-2",
                          theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
                        )}>
                          Key Evaluation Points:
                        </h4>
                        <ul className="space-y-2">
                          {criterion.details.map((detail, i) => (
                            <li key={i} className={cn(
                              "flex items-start gap-2 text-sm",
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            )}>
                              <span className="text-cosmic-purple">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      <div className="mt-3 text-sm text-cosmic-purple">
                        {isExpanded ? "Click to collapse" : "Click to expand"}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JudgingCriteria;
