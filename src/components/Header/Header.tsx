import React from "react"
import { StyledHeader } from './style'

export type Props = {
    children: React.ReactNode
    height?: string
    padding?: string
    position?: string
    margin?: string
    backgroundColor?: string
    zIndex?: string
}

const Header: React.FC<Props> = ({children, zIndex, backgroundColor, margin, position, padding, height}) => {
  return (
      <StyledHeader height={height} padding={padding} position={position} margin={margin} backgroundColor={backgroundColor} zIndex={zIndex}>
        {children}
      </StyledHeader>
  )
}

export default Header