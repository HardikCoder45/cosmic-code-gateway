
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  systemPreference: Theme | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [systemPreference, setSystemPreference] = useState<Theme | null>(null);
  const [themeTransitioning, setThemeTransitioning] = useState(false);

  // Detect system preference on initial load - optimized with one-time setup
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemPreference = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
    };

    // Set initial value
    updateSystemPreference(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', updateSystemPreference);
    return () => mediaQuery.removeEventListener('change', updateSystemPreference);
  }, []);

  // Initialize theme from localStorage or system preference - only run once
  useEffect(() => {
    if (!systemPreference) return;
    
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(systemPreference);
    }
  }, [systemPreference]);

  // Optimized theme toggle with smooth transition
  const toggleTheme = useCallback(() => {
    setThemeTransitioning(true);
    
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Apply transition class to body
    document.body.classList.add('theme-transitioning');
    
    // Short delay before changing theme to allow transition to start
    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Remove transition class after theme change is complete
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
        setThemeTransitioning(false);
      }, 300);
    }, 50);
  }, [theme]);

  // Apply theme to document with optimized DOM operations
  useEffect(() => {
    const root = document.documentElement;
    const currentClass = theme === 'dark' ? 'dark' : 'light';
    const previousClass = theme === 'dark' ? 'light' : 'dark';
    
    // Remove previous theme class and add new one
    root.classList.remove(previousClass);
    root.classList.add(currentClass);
    
    // Add data attribute for additional styling options
    root.setAttribute('data-theme', theme);
    
    // Add custom transition styles if not already added
    if (!document.getElementById('theme-transition-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'theme-transition-styles';
      styleEl.textContent = `
        .theme-transitioning * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
        
        @keyframes theme-transition-pulse {
          0% { opacity: 0; }
          50% { opacity: 0.1; }
          100% { opacity: 0; }
        }
        
        .theme-transitioning::before {
          content: '';
          position: fixed;
          inset: 0;
          background: ${theme === 'dark' ? 'white' : 'black'};
          z-index: 9999;
          pointer-events: none;
          animation: theme-transition-pulse 0.3s ease-out forwards;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, [theme]);

  const contextValue = {
    theme,
    toggleTheme,
    systemPreference
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {themeTransitioning && (
        <div className="fixed inset-0 bg-transparent pointer-events-none z-[9999]"></div>
      )}
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
