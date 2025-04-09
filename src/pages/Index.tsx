
import React, { useEffect } from 'react';
import CosmicNavbar from '@/components/CosmicNavbar';
import ParticleBackground from '@/components/ParticleBackground';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Schedule from '@/components/Schedule';
import Register from '@/components/Register';
import Sponsors from '@/components/Sponsors';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Ensure smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Change document title
    document.title = 'Cosmic Hackathon Portal';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Background particles */}
      <ParticleBackground density={150} />
      
      {/* Navigation */}
      <CosmicNavbar />
      
      {/* Main content container */}
      <main id="main-content" className="wormhole-container">
        <div className="wormhole-content">
          {/* Hero section with nebula animation */}
          <Hero />
          
          {/* Features section */}
          <Features />
          
          {/* Schedule section with starfield timeline */}
          <Schedule />
          
          {/* Registration section with black hole effect */}
          <Register />
          
          {/* Sponsors section */}
          <Sponsors />
        </div>
      </main>
      
      {/* Footer with floating asteroids */}
      <Footer />
    </div>
  );
};

export default Index;
