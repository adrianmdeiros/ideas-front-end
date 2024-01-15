import styled from "styled-components";
import { Props } from './Header'

export const StyledHeader = styled.div<Props>`
    padding: ${props => props.padding};
    position: ${props => props.position};
    /* top: 0; */
    /* left: 0; */
    margin: ${props => props.margin};
    background-color: ${props => props.backgroundColor};
    z-index: ${props => props.zIndex};
    height: ${props => props.height};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
`
