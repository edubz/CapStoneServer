import { Router, Route, Switch } from 'react-router';
import { DevicesPage } from './pages/devices';
import { Gallery } from './pages/gallery';
import { Home } from './pages/home';
import { createBrowserHistory } from 'history';
import { RegisterPage } from './pages/register';

const history = createBrowserHistory();

export const App = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route path="/devices" component={DevicesPage} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/register" component={RegisterPage} />
            </Switch>
        </Router>
    );
};
