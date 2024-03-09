import styled from "styled-components";
import { InputProps } from '.'

export const StyledInput = styled.input<InputProps>`
  height: ${props => props.height};
  width: 100%;
  font-size: 1.6rem;
  background-color: ${props => props.backgroundColor};
  color: #f5f5f5;
  border-radius: ${props => props.borderRadius};
  border: ${props => props.border};
  padding: 1.2rem;
  ::placeholder{
    color: #4a4a4a;
  }
  all: ${props => props.all};
`