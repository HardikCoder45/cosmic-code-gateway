import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';
import { Users, UserPlus, MessageSquare, Radio, Code, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  skills: string[];
  looking: boolean;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Jordan Lee",
    role: "Full-Stack Developer",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    looking: true,
    image: "https://source.unsplash.com/random/100x100?portrait-1"
  },
  {
    id: 2,
    name: "Mia Thompson",
    role: "UX/UI Designer",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    looking: true,
    image: "https://source.unsplash.com/random/100x100?portrait-2"
  },
  {
    id: 3,
    name: "Raj Patel",
    role: "Machine Learning Engineer",
    skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP"],
    looking: true,
    image: "https://source.unsplash.com/random/100x100?portrait-3"
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Product Manager",
    skills: ["Strategy", "Roadmapping", "Analytics", "Market Research"],
    looking: true,
    image: "https://source.unsplash.com/random/100x100?portrait-4"
  },
  {
    id: 5,
    name: "Carlos Rodriguez",
    role: "Backend Developer",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    looking: true,
    image: "https://source.unsplash.com/random/100x100?portrait-5"
  },
  {
    id: 6,
    name: "Taylor Kim",
    role: "DevOps Engineer",
    skills: ["Kubernetes", "CI/CD", "Terraform", "Linux"],
    looking: true,
    image: "https://source.unsplash.com/random/100x100?portrait-6"
  }
];

const TeamFormation = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filterOptions = [
    { value: 'all', label: 'All Roles', icon: Users },
    { value: 'developer', label: 'Developers', icon: Code },
    { value: 'designer', label: 'Designers', icon: Palette },
    { value: 'product', label: 'Product', icon: MessageSquare },
  ];

  const filteredMembers = teamMembers.filter(member => {
    if (filter === 'all') return true;
    if (filter === 'developer' && (member.role.includes('Developer') || member.role.includes('Engineer'))) return true;
    if (filter === 'designer' && member.role.includes('Design')) return true;
    if (filter === 'product' && member.role.includes('Product')) return true;
    return false;
  });

  const contactMember = (member: TeamMember) => {
    toast({
      title: `Message sent to ${member.name}`,
      description: "They'll receive your contact request and get back to you soon.",
    });
  };

  return (
    <section id="team-formation" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 right-1/4 w-64 h-64 rounded-full bg-cosmic-purple/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-64 h-64 rounded-full bg-cosmic-pink/10 blur-3xl"></div>
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
            Find Your Quantum Team
          </h2>
          <p className={cn(
            "max-w-2xl mx-auto text-lg",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}>
            Connect with like-minded hackers to form the ultimate team. Great ideas need 
            great collaborators!
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.value}
                variant={filter === option.value ? "default" : "outline"}
                className={cn(
                  "rounded-full transition-all duration-300",
                  filter === option.value 
                    ? "bg-cosmic-purple text-white" 
                    : theme === 'dark' ? "border-white/20 text-white" : "border-cosmic-purple/20 text-cosmic-deepPurple"
                )}
                onClick={() => setFilter(option.value)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {option.label}
              </Button>
            );
          })}
        </div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, idx) => (
            <motion.div 
              key={member.id}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className={cn(
                "h-full p-6 rounded-2xl transition-all duration-300 relative overflow-hidden",
                theme === 'dark' 
                  ? 'bg-black/30 backdrop-blur-md border border-white/10' 
                  : 'bg-white/70 backdrop-blur-md border border-cosmic-purple/10',
                activeIndex === idx && "transform scale-[1.02] shadow-lg shadow-cosmic-purple/20"
              )}>
                {/* Status indicator */}
                {member.looking && (
                  <div className="absolute top-4 right-4 flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className={cn(
                      "text-xs",
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    )}>Looking for team</span>
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cosmic-purple">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {activeIndex === idx && (
                      <div className="absolute inset-0 border-2 border-cosmic-pink rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className={cn(
                      "text-xl font-bold",
                      theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                    )}>
                      {member.name}
                    </h3>
                    <p className="text-cosmic-purple">{member.role}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className={cn(
                    "text-sm font-semibold mb-2",
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, i) => (
                      <span key={i} className={cn(
                        "px-2 py-1 text-xs rounded-full",
                        theme === 'dark' 
                          ? 'bg-cosmic-purple/20 text-cosmic-purple' 
                          : 'bg-cosmic-purple/10 text-cosmic-deepPurple'
                      )}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex-1 rounded-xl transition-all duration-300",
                      theme === 'dark' ? 'border-white/20 hover:border-white/40' : 'border-cosmic-purple/20 hover:border-cosmic-purple/40'
                    )}
                    onClick={() => contactMember(member)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 rounded-xl bg-gradient-to-r from-cosmic-purple to-cosmic-pink"
                    onClick={() => contactMember(member)}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Team Up
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA for creating profile */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            size="lg"
            className="rounded-xl bg-gradient-to-r from-cosmic-purple to-cosmic-pink"
            onClick={() => toast({
              title: "Profile creation coming soon!",
              description: "This feature will be available when registration opens.",
            })}
          >
            <Radio className="w-5 h-5 mr-2" />
            Create Your Hacker Profile
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamFormation;
