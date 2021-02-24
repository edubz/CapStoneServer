import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { DevicesPage } from './pages/devices';
import { Gallery } from './pages/gallery';
import { Home } from './pages/home';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const App = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route path="/devices" component={DevicesPage} />
                <Route path="/gallery" component={Gallery} />
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
