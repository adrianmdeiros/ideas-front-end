import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialised;
  -moz-osx-font-smoothing: grayscale;
  font-family:  'Rubik', sans-serif;
}

:root{
  font-size: 62.5%;
}

body{
  font-size: 1.6rem;
  background-color: #101010;
  color: #f5f5f5;
}

main{
  margin-bottom: 10rem;
  min-height: 100vh;
}

`


export default GlobalStyle