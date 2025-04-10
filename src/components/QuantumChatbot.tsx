
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const hackathonInfo = `
I'm QuantumBot, your guide to the Cosmic Hackathon! 🚀✨

🗓️ WHEN: November 15-17, 2023
📍 WHERE: Quantum Tech Center, 123 Innovation Ave
💻 WHO: Developers, designers, and innovators of all skill levels
🏆 PRIZES: $50,000 in total prizes including tech gadgets and startup funding

Need to know:
- Registration closes on October 30
- Teams of 1-5 members allowed
- Bring your own laptop and charger
- Food and drinks will be provided
- Theme: "Technology for a Sustainable Future"

How can I assist you with the hackathon today?
`;

const QuantumChatbot: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: hackathonInfo,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to the chat
    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages: [
            {
              role: 'system',
              content: `You are QuantumBot, the helpful assistant for the Cosmic Hackathon. 
              Be friendly, concise, and knowledgeable about the event details.
              Use emojis occasionally to appear friendly and engaging.
              The Cosmic Hackathon is a virtual event happening November 15-17, 2023.
              The main theme is "Technology for a Sustainable Future".
              Teams of 1-5 members are allowed.
              Registration closes on October 30.
              Total prize pool is $50,000 including tech gadgets and startup funding.
              Answer any questions about the hackathon details, registration, rules, or general programming questions.`
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: input.trim()
            }
          ]
        })
      });
      
      const data = await response.json();
      
      if (data.choices && data.choices[0].message) {
        setMessages(prev => [
          ...prev, 
          { role: 'assistant', content: data.choices[0].message.content }
        ]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
        variant: 'destructive',
      });
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error processing your request. Please try again later! 🙏'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <motion.button
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-lg",
          theme === 'dark' 
            ? "bg-cosmic-purple text-white" 
            : "bg-cosmic-deepPurple text-white",
          isOpen ? "rotate-0" : "rotate-0"
        )}
        onClick={handleToggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: isOpen ? 0 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Bot className="w-6 h-6" />
        )}
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "absolute bottom-20 right-0 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-xl flex flex-col",
              theme === 'dark' 
                ? "bg-black/80 backdrop-blur-lg border border-white/10" 
                : "bg-white/80 backdrop-blur-lg border border-cosmic-purple/10"
            )}
            style={{ height: '500px' }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Chat header */}
            <div className={cn(
              "p-4 flex items-center border-b",
              theme === 'dark' ? "border-white/10" : "border-cosmic-purple/10"
            )}>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Bot className="w-8 h-8 text-cosmic-purple" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-background"></span>
                </div>
                <div>
                  <h3 className={cn(
                    "font-medium",
                    theme === 'dark' ? "text-white" : "text-cosmic-deepPurple"
                  )}>
                    QuantumBot <Sparkles className="inline-block w-4 h-4 text-cosmic-pink" />
                  </h3>
                  <p className="text-xs text-muted-foreground">Cosmic Hackathon Assistant</p>
                </div>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2",
                      message.role === 'user'
                        ? theme === 'dark'
                          ? "bg-cosmic-purple/80 text-white"
                          : "bg-cosmic-purple text-white"
                        : theme === 'dark'
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-900"
                    )}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2",
                    theme === 'dark'
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-900"
                  )}>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-cosmic-purple animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-cosmic-purple animate-pulse delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-cosmic-purple animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Chat input */}
            <div className={cn(
              "p-4 border-t",
              theme === 'dark' ? "border-white/10" : "border-cosmic-purple/10"
            )}>
              <div className="flex items-end space-x-2">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about the hackathon..."
                  className={cn(
                    "min-h-10 resize-none",
                    theme === 'dark' 
                      ? "bg-gray-800 border-gray-700" 
                      : "bg-white border-gray-300"
                  )}
                  rows={1}
                />
                <Button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "rounded-full p-2 h-10 w-10",
                    theme === 'dark' 
                      ? "bg-cosmic-purple text-white hover:bg-cosmic-purple/90" 
                      : "bg-cosmic-deepPurple text-white hover:bg-cosmic-deepPurple/90"
                  )}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuantumChatbot;
