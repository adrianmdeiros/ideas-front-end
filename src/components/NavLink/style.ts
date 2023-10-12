import styled from "styled-components";
import { Props } from "./NavLink";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)<Props>`
    text-decoration: none;
    color: #505050;
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
    &.active{
        color: #f5f5f5;
    }
`

export const StyledLabel = styled.label`
    font-size: 1.4rem;
    cursor: pointer;
`
