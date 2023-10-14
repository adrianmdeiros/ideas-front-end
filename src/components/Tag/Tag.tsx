import React from "react";
import { StyledCard } from "./style";

export type CardProps = {
  bgcolor?: string;
  children: React.ReactNode
};

const Card: React.FC<CardProps> = ({ children, bgcolor }) => {
  return <StyledCard bgcolor={bgcolor}>{children}</StyledCard>;
};

export default Card;
