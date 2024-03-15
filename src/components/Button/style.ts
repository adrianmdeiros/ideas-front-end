import styled from "styled-components";
import { BtnProps } from ".";


export const StyledButton = styled.button<BtnProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: ${props => props.margin};
  width: ${props => props.width};
  height: ${props => props.height};
  font-weight: 700;
  cursor: pointer;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  border: none;
  border-radius: ${props => props.borderRadius};
  padding: 1.8rem;
    :hover{
    background-color: ${props => props.hover};
  }
  position: ${props => props.position};
`