import React from "react"
import { StyledClickableIcon, StyledLabel } from "./style";

export type Props = {
    label?: string;
    icon?: React.ReactElement;
    onClick: () => void;
    display?: string
}

const ClickableIcon: React.FC<Props> = ({icon, onClick, label, display}) => {
  

  return (
    <StyledClickableIcon display={display} onClick={onClick}>
      <div>{icon}</div>
      <StyledLabel>{label}</StyledLabel>
    </StyledClickableIcon>
  )
}

export default ClickableIcon