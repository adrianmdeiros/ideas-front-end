import styled from "styled-components";
import { PostProps } from "./Post";

export const StyledPost = styled.div`
    width: 100%;
    @media (min-width: 768px){
        width: 30rem;
    }
`

export const StyledTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.8rem;
`

export const StyledAutor = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

`

export const StyledUserPhoto = styled.img`
    width: 3.8rem;
    height: 3.8rem;
    border-radius: 50%;
`

export const StyledTitle = styled.p`
    font-size: 1.4rem;
    font-weight: 500;
    line-break: auto;
    word-break: break-all;
`

export const StyledP = styled.p`
    font-size: 1.4rem;  
    max-width: 100%;
`
export const StyledDescription = styled.p<PostProps>`
    font-size: 1.4rem;
    text-align: justify;
    line-break: auto;
    word-break: break-all;
    color: ${props => props.ccolor};
`

export const StyledProject = styled.div`
    border-radius: .8rem;
    padding: 1.8rem;
    background-color: #151515;
`

export const StyledMiddle = styled.div`
    display: grid;
    gap: 1.8rem;
    border-radius: .8rem;
    padding: 1rem;
    background-color: #252525;
    line-break: auto;
    word-break: break-all;
    max-height: 12rem;
    overflow: hidden;
`

export const StyledReqContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 1.2rem;
`

export const StyledProjectReq = styled.div`
    display: flex;
    align-items: center;
    gap: .5rem;
    margin-top: 1.2rem;
`

export const StyledColorTypeProject = styled.div<PostProps>`
    height: 1rem;
    width: 1rem;
    background-color: ${props => props.ccolor};
`

export const StyledBottom = styled.div`
display: grid;
gap: 1rem;
    margin-top: 2rem;
`

export const StyledActions = styled.div`
    display: flex;
    align-items: center;
    gap: .8rem;
`

export const StyledConfirmBox = styled.div`
    margin-top: 2rem;
    > p{
        margin-bottom: 2.4rem;
    }
`
export const StyledButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
`
