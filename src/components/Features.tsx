import React from 'react';

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
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
    <div className="features">
      {features.map((feature, index) => (
        <Feature
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default Features;
