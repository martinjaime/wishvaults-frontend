import React from 'react';
import { Link } from 'gatsby';
import ThemeToggle from 'components/ThemeToggle';
import Hero from 'components/Hero';
import Features from 'components/Features';
import Footer from 'components/Footer';

const LandingLayout: React.FC = () => {
  return (
    <div className="landing-container">
      <header className="header">
        <ThemeToggle />
      </header>

      <main className="main">
        <Hero />
        <div className="actions">
          <Link to="/create" className="btn btn-primary">
            Create List
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
        <Features />
      </main>

      <Footer />
    </div>
  );
};

export default LandingLayout;
