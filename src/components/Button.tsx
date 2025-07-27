import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"

// import "styles/buttons.css"

interface ButtonStyleProps {
  $isPrimary?: boolean
  $isSmall?: boolean
};

const buttonStyles = css<ButtonStyleProps>`
  font-size: ${props => props.$isSmall ? "0.9rem" : "1rem"};
  min-height: ${props => props.$isSmall ? "40px" : "56px"};
  padding: ${props => props.$isSmall ? "10px 20px" : "16px 32px"};
  display: block;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px var(--shadow);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  border: ${props => props.$isPrimary ? "none" : "2px solid var(--border-light)"};
  background: ${props => props.$isPrimary ? "var(--accent-primary)" : "var(--bg-card)" };
  color: ${props => props.$isPrimary ? "#ffffff" : "var(--text-primary)" };

  &:hover {
    background: ${props => props.$isPrimary ? "var(--accent-secondary)" : "var(--bg-secondary)" };
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  &:disabled:hover {
    transform: none !important;
  }

  @media (min-width: 768px) {
    min-width: 160px;
  }
`;

const StyledButton = styled.button<ButtonStyleProps>`
  ${buttonStyles}
`;

const StyledLink = styled(Link)<ButtonStyleProps>`
  ${buttonStyles}
`;

const StyledIconButton = styled.button`
  background: var(--bg-card);
  border: 2px solid var(--border-light);
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 1.2rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
  padding: 0;
  min-height: auto;

  &:hover {
    background: #ef4444;
    color: white;
    border-color: #ef4444;
  }
`;

interface ButtonProps {
  variant?: "primary" | "secondary"
  size?: "normal" | "small"
  type?: "button" | "submit"
  onClick?: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

interface LinkButtonProps extends Omit<ButtonProps, "type" | "onClick"> {
  to: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "normal",
  type = "button",
  onClick,
  disabled,
  className = "",
  children,
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      $isPrimary={variant === "primary"}
      $isSmall={size === "small"}
    >
      {children}
    </StyledButton>
  )
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  variant = "primary",
  size = "normal",
  className = "",
  children,
}) => {
  return (
    <StyledLink
      to={to}
      className={className}
      $isPrimary={variant === "primary"}
      $isSmall={size === "small"}
    >
      {children}
    </StyledLink>
  )
}

export const IconButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <StyledIconButton
      {...props}
      type="button"
      className={`btn-icon ${className}`}
    >
      {children}
    </StyledIconButton>
  )
}
