import React from "react"
import { StyledNavLink, StyledLabel} from "./style";

export type Props = {
    label?: string;
    icon?: React.ReactElement;
    color?: string
    to: string
    onClick?: () => void
    display?: string;
}

const NavLink: React.FC<Props> = ({icon, label, to, onClick, display}) => {
  return (
    <StyledNavLink to={to} onClick={onClick} display={display} >
      <div>{icon}</div>
      <StyledLabel>{label}</StyledLabel>
    </StyledNavLink>
  )
}

export default NavLink