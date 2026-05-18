import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage on initial load
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  // Apply theme on mount and when isDark changes
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log('Theme switched to DARK');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log('Theme switched to LIGHT');
    }
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggle theme clicked. Current isDark:', isDark);
    setIsDark(prev => {
      const newValue = !prev;
      console.log('New isDark value:', newValue);
      return newValue;
    });
  };

  const value = {
    isDark,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
