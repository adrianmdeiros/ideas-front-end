import { X } from "react-feather";
import styled from "styled-components";

export const StyledContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(0,0,0, 0.7);
    z-index: 1;
`

export const CloseButton = styled(X)`
    position: absolute;
    right: 2rem;
    top: 2rem;
    color: #f5f5f5;
    cursor: pointer;
`

export const StyledModal = styled.div`
    max-width: 100%;
    min-width: 28rem;
    background-color: #101010;
    border-radius: .8rem;
    padding: 2rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow-y: auto;
    max-height: 90vh ;
    z-index: 2;
    

    &::-webkit-scrollbar {
        width: .6rem; 
    }

    &::-webkit-scrollbar-thumb {
        background: #39ff14; 
        border-radius: .6rem; 
    }

    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2); 
    }
`
