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

export const StyledTitle = styled.h4`
`

export const StyledP = styled.p`
`
export const StyledDescription = styled.p<PostProps>`
    color: ${props => props.ccolor}
`

export const StyledProject = styled.div`
    border-radius: .8rem;
    padding: 1.8rem;
    background-color: #151515;
`

export const StyledMiddle = styled.div`
    display: grid;
    gap: 1rem;
    border-radius: .8rem;
    padding: 1rem;
    background-color: #252525;
`

export const StyledReqContainer = styled.div`
    display: flex;
    gap: 1.2rem;
    justify-content: right;
`

export const StyledProjectReq = styled.div`
    display: flex;
    gap: .5rem;
    align-items: center;
    margin-top: 1.2rem;
`

export const StyledColorTypeProject = styled.div<PostProps>`
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 50%;
    background-color: ${props => props.ccolor};
`

export const StyledBottom = styled.div`
display: grid;
gap: 1rem;
    margin-top: 2rem;
`

export const StyledActions = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: .8rem;
`

export const StyledConfirmBox = styled.div`
    display: grid;
    gap: 2.4rem;
    margin-top: 2rem;
`
export const StyledButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
`

export const StyledDanger = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`