import React from 'react'
import { Link } from 'gatsby'
import ThemeToggle from 'components/ThemeToggle'
import { styled } from 'styled-components'

const ContainerHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const BackLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-primary);
  }
`

const BasicHeader: React.FC = () => {
  return (
    <ContainerHeader>
      <BackLink to="/" className="back-link">
        ← back to home
      </BackLink>
      <ThemeToggle />
    </ContainerHeader>
  );
};

export default BasicHeader;
