import React from 'react';
import { styled } from 'styled-components';

const FeaturesDiv = styled.div`
  display: grid;
  gap: 32px;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
  }
`;

const FeatureDiv = styled.div`
  text-align: center;
  padding: 0 16px;

  h3 {
    font-size: 1.1rem;
    color: var(--text-primary);
    margin: 0 0 8px 0;
    font-weight: 600;
  }

  p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.5;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 16px;
`;

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <FeatureDiv>
      <FeatureIcon>{icon}</FeatureIcon>
      <h3>{title}</h3>
      <p>{description}</p>
    </FeatureDiv>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: '✨',
      title: 'Instant Creation',
      description: 'No signup required — create lists in seconds'
    },
    {
      icon: '🔒',
      title: 'Edit Protection',
      description: 'Keep lists public to view, password-protected to edit'
    },
    {
      icon: '📱',
      title: 'Share Anywhere',
      description: 'Works perfectly on mobile and desktop'
    }
  ];

  return (
    <FeaturesDiv>
      {features.map((feature, index) => (
        <Feature
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
     </FeaturesDiv>
  );
};

export default Features;
