import styled from "styled-components";
import { TagProps } from "./Tag";

export const StyledCard = styled.div<TagProps>`
    min-width: 14rem;
    display: grid;
    place-content: start;
    width: fit-content;
    /* height: 6rem; */
    border-radius: 99rem;
    padding: 1.2rem;
    border: .2rem solid ${props => props.color};
    color: ${props => props.color};
    cursor: pointer;
    transition: 500ms;
    &:hover{
        scale: 1.1;
        background-color: ${props => props.color};
        color: #f5f5f5
    }
    
    &.active{
        scale: 1.1;
        background-color: ${props => props.color};
        color: #f5f5f5
    }

`