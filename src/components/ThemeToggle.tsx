import { useTheme } from 'contexts/ThemeContext';
import React from 'react';
import { styled } from 'styled-components';

const ThemeToggleDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ThemeToggleButton = styled.button`
  background: var(--bg-card);
  border: 2px solid var(--border-light);
  border-radius: 12px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px var(--shadow);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px var(--shadow);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeToggleDiv>
      <ThemeToggleButton onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </ThemeToggleButton>
    </ThemeToggleDiv>
  );
};

export default ThemeToggle;
