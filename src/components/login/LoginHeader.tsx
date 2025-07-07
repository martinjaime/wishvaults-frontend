import React from 'react';
import { Link } from 'gatsby';
import ThemeToggle from '../ThemeToggle';

const LoginHeader: React.FC = () => {
  return (
    <header className="login-header">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default LoginHeader;
