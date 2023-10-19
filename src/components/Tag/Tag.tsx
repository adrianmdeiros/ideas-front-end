import React from "react";
import { StyledCard } from "./style";

export type TagProps = {
  bgcolor?: string;
  children: React.ReactNode
};

const Tag: React.FC<TagProps> = ({ children, bgcolor }) => {
  return <StyledCard bgcolor={bgcolor}>{children}</StyledCard>;
};

export default Tag;
