import React            from 'react';
import ReactDom         from 'react-dom';

import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import Home             from 'page/home/index.jsx';
import Layout           from 'component/layout/index.jsx';
import Login            from 'page/login/index.jsx';
import ErrorPage        from 'page/error/index.jsx';



class App extends React.Component{
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' render={props => (
                        <Layout>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route path='/product' component={Home} />
                                <Route path='/product-category' component={Home} />
                                <Route component={ErrorPage} />
                            </Switch>
                        </Layout>
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
