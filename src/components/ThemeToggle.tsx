import { useTheme } from 'contexts/ThemeContext';
import React from 'react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <button className="theme-button" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default ThemeToggle;
