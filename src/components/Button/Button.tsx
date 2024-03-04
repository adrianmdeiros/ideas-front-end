import React, { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./style";

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
  backgroundColor: string;
  color: string;
  width?: string;
  height?: string;
  hover: string;
  borderRadius: string;
  margin?: string;
  position?: string;
};

const Button: React.FC<BtnProps> = (props: BtnProps) => {
  return (
    <StyledButton
      onClick={props.onClick}
      color={props.color}
      backgroundColor={props.backgroundColor}
      width={props.width}
      height={props.height}
      hover={props.hover}
      borderRadius={props.borderRadius}
      margin={props.margin}
      position={props.position}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
