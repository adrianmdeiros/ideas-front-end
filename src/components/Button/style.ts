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
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.25);
  position: ${props => props.position};
`