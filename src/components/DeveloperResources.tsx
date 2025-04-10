
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Lock, Cpu, FileCode, GitBranch, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const resources = [
  {
    title: "API Documentation",
    description: "Comprehensive guides for all the APIs available during the hackathon.",
    icon: Code,
    url: "#",
    category: "Documentation"
  },
  {
    title: "Authentication Toolkit",
    description: "Quick-start templates for implementing secure user authentication.",
    icon: Lock,
    url: "#",
    category: "Security"
  },
  {
    title: "Cloud Credits",
    description: "Free cloud credits for deploying your hackathon projects.",
    icon: Cloud,
    url: "#",
    category: "Infrastructure"
  },
  {
    title: "Database Solutions",
    description: "Ready-to-use database templates and connection guides.",
    icon: Database,
    url: "#",
    category: "Data"
  },
  {
    title: "ML Model Templates",
    description: "Pre-trained models and integration examples for AI features.",
    icon: Cpu,
    url: "#",
    category: "AI/ML"
  },
  {
    title: "UI Component Library",
    description: "Beautiful, responsive components to accelerate your frontend development.",
    icon: FileCode,
    url: "#",
    category: "Frontend"
  },
  {
    title: "Version Control Setup",
    description: "Best practices for collaborative development with Git.",
    icon: GitBranch,
    url: "#",
    category: "Collaboration"
  },
  {
    title: "Tutorials & Workshops",
    description: "Learn from experts with our curated workshop content.",
    icon: BookOpen,
    url: "#",
    category: "Learning"
  }
];

const DeveloperResources = () => {
  const { theme } = useTheme();
  
  return (
    <section id="resources" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/3 w-96 h-96 rounded-full bg-cosmic-purple/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-80 h-80 rounded-full bg-cosmic-pink/10 blur-3xl"></div>
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
            Developer Resources
          </h2>
          <p className={cn(
            "max-w-2xl mx-auto text-lg",
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}>
            Accelerate your hackathon project with our curated resources, tools, and documentation.
            Everything you need to build something amazing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <motion.a 
                key={idx}
                href={resource.url}
                className="block h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={cn(
                  "h-full p-6 rounded-2xl transition-all duration-300 group",
                  theme === 'dark' 
                    ? 'bg-black/30 backdrop-blur-md border border-white/10 hover:border-cosmic-purple/50' 
                    : 'bg-white/70 backdrop-blur-md border border-cosmic-purple/10 hover:border-cosmic-purple/30'
                )}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cosmic-purple to-cosmic-pink">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      theme === 'dark' 
                        ? 'bg-cosmic-purple/20 text-cosmic-purple' 
                        : 'bg-cosmic-purple/10 text-cosmic-deepPurple'
                    )}>
                      {resource.category}
                    </span>
                  </div>
                  
                  <h3 className={cn(
                    "text-lg font-bold mb-2 flex items-center gap-2",
                    theme === 'dark' ? 'text-white' : 'text-cosmic-deepPurple'
                  )}>
                    {resource.title}
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  
                  <p className={cn(
                    "text-sm",
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {resource.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "rounded-xl border-2 transition-all duration-300",
              theme === 'dark' 
                ? 'border-cosmic-purple/50 hover:border-cosmic-purple' 
                : 'border-cosmic-purple/30 hover:border-cosmic-purple'
            )}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Explore Documentation Hub
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperResources;
