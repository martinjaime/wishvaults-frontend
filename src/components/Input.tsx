import React from "react"
import styled from "styled-components"
import { Label } from "components/pageContainers";

const InputWrapper = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-light);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(var(--accent-primary-rgb), 0.1);
  }

  &::placeholder {
    color: var(--text-light);
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface InputProps {
  id?: string
  type?: "text" | "email" | "url" | "password"
  value: string
  onChange: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  label?: string
  minLength?: number
}

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  value,
  onChange,
  onKeyDown,
  placeholder,
  required = false,
  disabled = false,
  className = "",
  label,
  minLength
}) => {
  const inputClasses = `form-input ${className}`.trim()

  return (
    <InputWrapper>
      {label && (
        <Label htmlFor={id}>
          {label}
        </Label>
      )}
      <StyledInput
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={inputClasses}
        required={required}
        disabled={disabled}
        minLength={minLength}
      />
    </InputWrapper>
  )
}

export default Input
