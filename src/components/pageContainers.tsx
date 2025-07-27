import styled from "styled-components";

export const PageContainerDiv = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;

  @media (min-width: 768px) {
    max-width: 600px;
    padding: 0 32px;
  }
`;

interface ContainerProps {
  $centered?: boolean;
}

export const Main = styled.main<ContainerProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.$centered ? "center" : "flex-start")};
  text-align: ${props => (props.$centered ? "center" : "left")};
  padding: 40px 0;
`;

Main.defaultProps = {
  $centered: true
}

export const Label = styled.label`
  color: var(--text-primary);
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 6px;
  text-align: left;
`;

export const ErrorMessageP = styled.p`
  background: rgba(246, 124, 95, 0.1);
  border: 1px solid var(--accent-danger);
  color: var(--accent-danger);
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 0.9rem;
  text-align: center;
`;

export const ActionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 64px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 24px;
  }
`;
