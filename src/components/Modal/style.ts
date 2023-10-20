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
    color: #f5f5f5;
    cursor: pointer;
`

export const StyledModal = styled.div`
    max-width: 100vw;
    min-width: 32rem;
    background-color: black;
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
        width: .6rem; /* Largura da barra de rolagem */
    }

    &::-webkit-scrollbar-thumb {
        background: #ff7a00; /* Cor do polegar da barra de rolagem */
        border-radius: .6rem; /* Borda arredondada para o polegar */
    }

    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2); /* Cor do fundo da barra de rolagem */
    }
`
