import React from 'react';
import styled from 'styled-components';

const HeroDiv = styled.div`
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: var(--accent-primary);
    margin: 0 0 16px 0;
    text-shadow: 2px 2px 4px var(--shadow);
  }

  .title {
    font-size: 3rem;
    font-weight: 700;
    color: var(--accent-primary);
    margin: 0 0 16px 0;
    text-shadow: 2px 2px 4px var(--shadow);
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--text-primary);
    margin: 0 0 24px 0;
    font-weight: 500;
  }

  .description {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
    max-width: 400px;
    margin: 0 auto;
  }


  @media (min-width: 768px) {
    .title {
      font-size: 4rem;
    }

    .subtitle {
      font-size: 1.5rem;
    }
  }
`;

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, description }) => {
  return (
    <HeroDiv>
      {title && <h1 className="title">{title}</h1>}
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {description && <p className="description">{description}</p>}
    </HeroDiv>
  );
};

export default Hero;
