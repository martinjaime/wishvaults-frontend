import React from 'react';
import styled from 'styled-components';

const FooterDiv = styled.footer`
  text-align: center;
  padding: 24px 0;
  border-top: 1px solid var(--border-light);
  margin-top: auto;

  p {
    color: var(--text-light);
    font-size: 0.9rem;
    margin: 0;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterDiv>
      <p>Made with ❤️ for wishful thinking</p>
    </FooterDiv>
  );
};

export default Footer;
