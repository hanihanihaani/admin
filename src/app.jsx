import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import Home from 'page/home/index.jsx';
import LayOut from 'component/layout/index.jsx';
import Login from 'page/login/index.jsx';


class App extends React.Component{
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/login' render={props => (
                        <LayOut>
                            <Switch>
                                <Route exact path='/' component={Home} />
                            </Switch>
                        </LayOut>
                    )} />
                </Switch>
            </Router>
        )
    }
}

ReactDom.render(
    <App />,
    document.getElementById('app')
)
