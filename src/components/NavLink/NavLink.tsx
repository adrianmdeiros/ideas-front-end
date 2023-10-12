import React from "react"
import { StyledNavLink, StyledLabel} from "./style";

export type Props = {
    label?: string;
    icon?: React.ReactElement;
    color?: string
    to: string
    onClick?: () => void
}

const NavLink: React.FC<Props> = ({icon, label, to, onClick}) => {
  return (
    <StyledNavLink to={to} onClick={onClick}  >
      <div>{icon}</div>
      <StyledLabel>{label}</StyledLabel>
    </StyledNavLink>
  )
}

export default NavLink