import React from 'react';
import ThemeToggle from 'components/ThemeToggle';
import Hero from 'components/Hero';
import Features from 'components/Features';
import Footer from 'components/Footer';
import { LinkButton } from 'components/Button';
import { ActionsDiv, Main, PageContainerDiv } from 'components/pageContainers';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
`;

const LandingLayout: React.FC = () => {
  return (
    <PageContainerDiv>
      <Header>
        <ThemeToggle />
      </Header>

      <Main>
        <Hero
          title="wishvaults"
          subtitle="Create wishlists instantly — no account required"
          description="Share your wishes with friends and family. Create public lists to share, or edit them whenever."
        />
        <ActionsDiv>
          <LinkButton to="/create-list">
            create list
          </LinkButton>
          {/* <LinkButton to="/login" variant="secondary">
            login
          </LinkButton> */}
        </ActionsDiv>
        <Features />
      </Main>
      <Footer />
    </PageContainerDiv>
  );
};

export default LandingLayout;
