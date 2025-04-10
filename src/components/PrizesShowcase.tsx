
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';
import { Trophy, Award, Zap, Star, Sparkles, GitBranch } from 'lucide-react';

const prizes = [
  {
    title: "Grand Prize",
    value: "$10,000",
    description: "For the most innovative and complete project that demonstrates exceptional creativity and technical expertise.",
    icon: Trophy,
    color: "from-yellow-300 to-yellow-500",
    benefits: [
      "Direct mentorship from industry leaders",
      "Featured article on TechCrunch",
      "Opportunity to pitch to VC investors"
    ]
  },
  {
    title: "Runner Up",
    value: "$5,000",
    description: "For the second-place team that shows outstanding potential and execution.",
    icon: Award,
    color: "from-cosmic-purple to-cosmic-pink",
    benefits: [
      "3-month co-working space membership",
      "Professional video production of product demo",
      "1-year premium cloud credits"
    ]
  },
  {
    title: "Technical Excellence",
    value: "$3,000",
    description: "For the project demonstrating the most impressive technical implementation and innovation.",
    icon: Zap,
    color: "from-blue-400 to-cosmic-blue",
    benefits: [
      "Advanced hardware development kit",
      "Priority access to beta API programs",
      "Private code review with senior engineers"
    ]
  },
  {
    title: "Best UI/UX",
    value: "$2,000",
    description: "For the project with exceptional user interface and user experience design.",
    icon: Sparkles,
    color: "from-green-400 to-teal-500",
    benefits: [
      "Professional design consultation sessions",
      "Premium design tool licenses",
      "Feature in design publications"
    ]
  },
  {
    title: "Social Impact",
    value: "$2,000",
    description: "For the project that addresses important social challenges and demonstrates potential for positive impact.",
    icon: Star,
    color: "from-red-400 to-orange-500",
    benefits: [
      "Social entrepreneurship mentorship",
      "Impact assessment consultation",
      "Introductions to nonprofit partners"
    ]
  },
  {
    title: "Most Innovative Use of AI",
    value: "$2,000",
    description: "For the project that applies artificial intelligence in the most creative and effective way.",
    icon: GitBranch,
    color: "from-purple-400 to-indigo-500",
    benefits: [
      "Access to premium AI computing resources",
      "Advanced AI model training sessions",
      "Private demo to AI research teams"
    ]
  }
];

const PrizesShowcase = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="prizes" className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-cosmic-purple opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cosmic-pink opacity-10 rounded-full blur-3xl"></div>
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
            Quantum Rewards
          </h2>
          <p className={cn(
            "max-w-2xl mx-auto text-lg",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}>
            Compete for substantial prizes and opportunities that can launch your project into the stratosphere.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prizes.map((prize, idx) => {
            const Icon = prize.icon;
            return (
              <motion.div 
                key={idx}
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className={cn(
                  "h-full flex flex-col p-6 rounded-2xl transition-all duration-300 relative overflow-hidden",
                  theme === 'dark' 
                    ? 'bg-black/30 backdrop-blur-md border border-white/10' 
                    : 'bg-white/70 backdrop-blur-md border border-cosmic-purple/10',
                  activeIndex === idx && "transform scale-[1.02] shadow-lg"
                )}>
                  {/* Background gradient */}
                  <div className={cn(
                    `absolute inset-0 bg-gradient-to-br ${prize.color} opacity-0 transition-opacity duration-300 -z-10`,
                    activeIndex === idx && "opacity-10"
                  )}></div>
                  
                  {/* Prize icon */}
                  <div className={cn(
                    `w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${prize.color} mb-6 transition-transform duration-300`,
                    activeIndex === idx && "transform rotate-6"
                  )}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Prize details */}
                  <h3 className={cn(
                    "text-2xl font-bold mb-2",
                    theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                  )}>
                    {prize.title}
                  </h3>
                  
                  <div className={cn(
                    "text-3xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent",
                    `from${prize.color.substring(prize.color.indexOf('-'))}`
                  )}>
                    {prize.value}
                  </div>
                  
                  <p className={cn(
                    "mb-6 flex-grow",
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {prize.description}
                  </p>
                  
                  {/* Prize benefits */}
                  <div className="mt-auto">
                    <h4 className={cn(
                      "text-sm font-semibold mb-2",
                      theme === 'dark' ? 'text-cosmic-purple' : 'text-cosmic-deepPurple'
                    )}>
                      Additional Benefits:
                    </h4>
                    <ul className="space-y-2">
                      {prize.benefits.map((benefit, i) => (
                        <li key={i} className={cn(
                          "flex items-start gap-2 text-sm",
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        )}>
                          <span className={cn(
                            "min-w-4 h-4 rounded-full flex items-center justify-center text-xs mt-0.5",
                            `bg-gradient-to-br ${prize.color} text-white`
                          )}>
                            ✓
                          </span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
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

export default PrizesShowcase;
