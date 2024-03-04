import React from "react"
import { StyledHeader } from './style'

export type HeaderProps = {
    children: React.ReactNode
    height?: string
    padding?: string
    position?: string
    margin?: string
    backgroundColor?: string
    zIndex?: string
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
      <StyledHeader height={props.height} padding={props.padding} position={props.position} margin={props.margin} backgroundColor={props.backgroundColor} zIndex={props.zIndex}>
        {props.children}
      </StyledHeader>
  )
}

export default Header