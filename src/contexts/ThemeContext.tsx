import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(Theme.LIGHT);

  // Initialize theme on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('wishvaults-theme') as Theme;

      if (savedTheme) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? Theme.DARK : Theme.LIGHT;
        setThemeState(systemTheme);
        document.documentElement.setAttribute('data-theme', systemTheme);
      }
    }
  }, []);

  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('wishvaults-theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  const toggleTheme = (): void => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
