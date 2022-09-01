import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: Georgia, 'Times New Roman', Times, serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;     
  letter-spacing: -0.2px;
    }
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    h1,
    h2,
    h3,
    p {
        padding: 0;
        margin: 0;
    }
`;
