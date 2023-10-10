import styled from "styled-components";

export const StyledNavBar = styled.nav`
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
    height: 3.2rem;
    width: 3.2rem;
    border-radius: 50%;
    border: .2rem solid #f5f5f5;
` 

export const StyledSideMenu = styled.nav`
    width: auto;
    height: 100vh;
    display: grid;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 2rem;
    margin-top: 8rem;
    background-color: #151515;
`