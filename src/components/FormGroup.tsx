import React from "react"
import styled from "styled-components"
import { Label } from "components/pageContainers";

const FormGroupDiv = styled.div`
  margin-bottom: 24px;
`;

interface FormGroupProps {
  label?: string
  children: React.ReactNode
  className?: string
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  children,
  className = "",
}) => {
  return (
    <FormGroupDiv className={`${className}`}>
      {label && <Label>{label}</Label>}
      {children}
    </FormGroupDiv>
  )
}

export default FormGroup
