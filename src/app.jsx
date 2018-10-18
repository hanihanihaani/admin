import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import Home from 'page/home/index.jsx';
import LayOut from 'component/layout/index.jsx';


class App extends React.Component{
    render() {
        return (
            <Router>
                <LayOut>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Redirect from='*' to='/' />
                    </Switch>
                </LayOut>
            </Router>
        )
    }
}

ReactDom.render(
    <App />,
    document.getElementById('app')
)
