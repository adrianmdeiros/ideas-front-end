import styled from "styled-components";
import { Props } from "./ClickableIcon";

export const StyledClickableIcon = styled.div<Props>`
    display: ${props => props.display};
    height: fit-content;
    gap: 1rem;
    align-items: center;
    text-align: center;
    cursor: pointer;
    padding: 1rem;
    border-radius: .8rem;
    :hover{
        background-color: #252525;
    }
`

export const StyledLabel = styled.label`
    font-size: 1.4rem;
`