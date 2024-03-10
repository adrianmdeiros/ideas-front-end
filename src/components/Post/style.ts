import styled from "styled-components";

export const StyledPost = styled.div`
    max-width: 38rem;
    @media (min-width: 768px){
        width: 30rem;
    }
    /* border: .1rem solid #f5f5f5; */
    border-radius: .8rem;
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
    word-break: normal;
`

export const StyledP = styled.p`
    font-size: 1.2rem;  
    max-width: 100%;
`
export const StyledDescription = styled.p`
    font-size: 1.4rem;
    text-align: start;
    word-break: normal;
`

export const StyledProject = styled.div`
    border-radius: .8rem;
    padding: 1.8rem;
    background-color: #202020;
    color: #f5f5f5;
    border: .2rem solid #303030;
`

export const StyledMiddle = styled.div`
    display: grid;
    gap: 1.8rem;
    border-radius: .8rem;
    padding: 1rem;
    background-color: #303030;
    line-break: auto;
    word-break: break-all;
    max-height: 12rem;
    overflow: hidden;

`

export const StyledReqContainer = styled.div`
    /* display: flex; */
    /* align-items: end; */
    /* justify-content: space-between; */
    /* gap: 1.2rem; */
`

export const StyledProjectReq = styled.div`
    display: flex;
    align-items: center;
    gap: .5rem;
    width: fit-content;
    padding: .2rem 1rem;
    border-radius: 999rem;
    background-color: #303030;
    border: .1rem solid #909090;
    color: #ccc;
    font-weight: 500;
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
    display: grid;
    gap: 2rem;
    margin-top: 3.2rem;
`
export const StyledButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
`
