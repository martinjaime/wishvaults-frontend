import React, { useState } from "react"
import Input from "components/Input"
import { Label } from "components/pageContainers"
import styled from "styled-components"

const PasswordTogggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-secondary);
  }
`;

const PasswordFieldDiv = styled.div`
  position: relative;
`;

interface PasswordFieldProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  label?: string
  minLength?: number
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  value,
  onChange,
  placeholder = "Enter password",
  required = false,
  disabled = false,
  className = "",
  label,
  minLength
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div style={{ width: "100%" }} >
      {label && (
        <Label htmlFor={id} className="form-label">
          {label}
        </Label>
      )}
      <PasswordFieldDiv>
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          required={required}
          disabled={disabled}
          minLength={minLength}
        />
        <PasswordTogggleButton
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle"
        >
          {showPassword ? "🙈" : "👁️"}
        </PasswordTogggleButton>
      </PasswordFieldDiv>
    </div>
  )
}

export default PasswordField
