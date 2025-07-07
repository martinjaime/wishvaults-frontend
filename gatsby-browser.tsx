import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import './src/styles/colors.css';

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {element}
      </AuthProvider>
    </ThemeProvider>
  );
};
