
import React from 'react';

const sponsorCategories = [
  {
    tier: "Cosmic Partners",
    sponsors: [
      { name: "TechNova", logo: "💻" },
      { name: "Galaxy Innovations", logo: "🚀" },
      { name: "Quantum Systems", logo: "⚛️" }
    ]
  },
  {
    tier: "Stellar Sponsors",
    sponsors: [
      { name: "NebulaTech", logo: "☁️" },
      { name: "Binary Stars", logo: "⭐" },
      { name: "Comet Solutions", logo: "💫" },
      { name: "Orbit Dynamics", logo: "🌌" }
    ]
  },
  {
    tier: "Planetary Supporters",
    sponsors: [
      { name: "AstroCode", logo: "👩‍💻" },
      { name: "LaunchPad", logo: "🛸" },
      { name: "CodeVerse", logo: "🌐" },
      { name: "Satellite Systems", logo: "🛰️" },
      { name: "RocketFuel Dev", logo: "⚡" },
      { name: "MoonShot Inc", logo: "🌙" }
    ]
  }
];

const Sponsors = () => {
  return (
    <section id="sponsors" className="py-20 flex flex-col items-center justify-center relative">
      <h2 className="text-4xl md:text-5xl font-bold text-cosmic-purple text-glow mb-4">
        Our Sponsors
      </h2>
      
      <p className="text-gray-300 max-w-2xl text-center mb-16 px-4">
        These stellar organizations make our hackathon possible. 
        Their support fuels innovation and helps launch the next generation of tech.
      </p>
      
      <div className="w-full max-w-6xl mx-auto space-y-16 px-4">
        {sponsorCategories.map((category, idx) => (
          <div key={idx} className="space-y-6">
            <h3 className="text-2xl font-bold text-cosmic-purple text-center">
              {category.tier}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.sponsors.map((sponsor, index) => (
                <div 
                  key={index}
                  className="cosmic-card hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-4xl mb-2">{sponsor.logo}</div>
                  <div className="text-lg font-medium text-white">{sponsor.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 cosmic-card px-8 py-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-cosmic-purple mb-3">
          Become a Sponsor
        </h3>
        <p className="text-gray-300 mb-4">
          Want to support the next generation of innovators? Join our mission and become a sponsor.
        </p>
        <a 
          href="#" 
          className="inline-block cosmic-button text-sm"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default Sponsors;
