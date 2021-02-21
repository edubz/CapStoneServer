import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './components/globalstyles';
import { Header } from './containers/header';
ReactDOM.render(
    <React.Fragment>
        <GlobalStyle></GlobalStyle>
        <Header></Header>
    </React.Fragment>,
    document.getElementById('root'),
);
