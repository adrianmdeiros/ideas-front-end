import styled from "styled-components";


export const StyledTabBar = styled.nav`
    height: 7rem;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #151515;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Perfil = styled.img`
    height: 4.2rem;
    width: 4.2rem;
    border-radius: 50%;
    object-fit: cover;
` 

export const StyledSideMenu = styled.nav`
    width: fit-content;
    min-width: fit-content;
    height: 100vh;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    justify-content: space-between;
    background-color: #151515;
    font-size: 500;
`
export const StyledPerfil = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`

export const StyledUserInfo = styled.div`
    display: grid;
    
        text-align: start;
    
`

export const StyledNav = styled.nav`
    display: grid;
    gap: 1rem;
`