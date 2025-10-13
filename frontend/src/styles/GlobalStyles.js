// Estilos globais da aplicação

import { createGlobalStyle } from 'styled-components';

// Importando fonte do projeto
import IstokWebRegular from '../assets/fonts/IstokWeb-Regular.ttf';
import IstokWebBold from '../assets/fonts/IstokWeb-Bold.ttf';
import IstokWebItalic from '../assets/fonts/IstokWeb-Italic.ttf';
import IstokWebBoldItalic from '../assets/fonts/IstokWeb-BoldItalic.ttf';

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Istok Web';
        src: url(${IstokWebRegular}) format('truetype');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Istok Web';
        src: url(${IstokWebBold}) format('truetype');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'Istok Web';
        src: url(${IstokWebItalic}) format('truetype');
        font-weight: 400;
        font-style: italic;
    }

    @font-face {
        font-family: 'Istok Web';
        src: url(${IstokWebBoldItalic}) format('truetype');
        font-weight: 700;
        font-style: italic;
    }

    /* CSS Reset Básico */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        font-family: 'Istok Web', sans-serif;
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.dark};
        font-size: ${({ theme }) => theme.fonts.sizes.medium};
        line-height: 1.6;
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
    }

    a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }

    button {
        font-family: 'Istok Web', sans-serif;
        cursor: pointer;
        border: none;
        font-family: ${({ theme }) => theme.fonts.family.primary};
    }

    input, textarea, select {
        font-family: ${({ theme }) => theme.fonts.family.primary};
    }
`;

export default GlobalStyles;