import styled from "styled-components";
import { TagProps } from "./Tag";

export const StyledCard = styled.div<TagProps>`
    min-width: 14rem;
    display: grid;
    place-content: start;
    width: fit-content;
    border-radius: .8rem;
    padding: 1.2rem;
    border: .2rem solid #505050;
    color: #505050;
    cursor: pointer;
    :hover{
        border: .2rem solid ${props => props.color};
        color: ${props => props.color};
    }

`