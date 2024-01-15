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

const Button: React.FC<BtnProps> = ({
  margin,
  onClick,
  color,
  backgroundColor,
  width,
  height,
  hover,
  borderRadius,
  children,
  position
}) => {
  return (
    <StyledButton
      onClick={onClick}
      color={color}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      hover={hover}
      borderRadius={borderRadius}
      margin={margin}
      position={position}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
