import styled from "styled-components";
import { Props } from ".";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)<Props>`
    text-decoration: none;
    color: #505050;
    height: fit-content;
    display: ${props => props.display};
    align-items: center;
    gap: 1rem;
    text-align: center;
    cursor: pointer;
    padding: .8rem;
    border-radius: .8rem;
    :hover{
        background-color: #252525;
    }
    &.active{
        color: #f5f5f5;
        background-color: #252525;
    }
`

export const StyledLabel = styled.label`
    cursor: pointer;
`
