export const Colors = {
    lightest: '#EEEEEE',
    light: '#E0E0E0',
    mid: '#BDBDBD',
    dark: '#828282',
    darkest: '#333333',
};

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
    }
    
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Rubik:wght@700&display=swap');

    html {font-size: 100%;} /*16px*/

    body {
        background: white;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        line-height: 1.75;
        color: ${Colors.darkest}
    }

    p {margin-bottom: 1rem;}

    h2, h3, h4, h5, a {
        margin: 3rem 0 1.38rem;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        line-height: 1.3;
    }

    h1 {
        margin-top: 0;
        font-size: 3.052rem;
    }

    h2 {font-size: 2.441rem;}

    h3 {font-size: 1.953rem;}

    h4 {font-size: 1.563rem;}

    h5 {font-size: 1.25rem;}

    small, .text_small {font-size: 0.8rem;}
`;
