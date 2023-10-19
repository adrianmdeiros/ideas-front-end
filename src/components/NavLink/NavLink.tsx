import React from "react"
import { StyledNavLink, StyledLabel} from "./style";

export type Props = {
    label?: string;
    icon?: React.ReactElement;
    color?: string
    to: string
    onClick?: () => void
    display?: string;
    children?: React.ReactNode
}

const NavLink: React.FC<Props> = ({children, icon, label, to, onClick, display}) => {
  return (
    <StyledNavLink to={to} onClick={onClick} display={display} >
      <div>{icon}</div>
      <StyledLabel>{label}</StyledLabel>
      {children}
    </StyledNavLink>
  )
}

export default NavLink