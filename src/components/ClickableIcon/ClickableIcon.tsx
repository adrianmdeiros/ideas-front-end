import React from "react"
import { StyledClickableIcon } from "./style";

type Props = {
    icon?: React.ReactElement;
    onClick: () => void;
}

const ClickableIcon: React.FC<Props> = ({icon, onClick}) => {
  

  return (
    <StyledClickableIcon onClick={onClick}>
        {icon}
    </StyledClickableIcon>
  )
}

export default ClickableIcon