import React            from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'


import ProductList      from 'page/product/index/index.jsx';
import ProductSave      from 'page/product/index/save.jsx';


class ProductRouter extends React.Component{
    render() {
        return (
            <Switch>
                <Route path='/product/index' component={ProductList} />
                <Route path='/product/save/:pid?' component={ProductSave} />
                <Redirect from='/product' to='/product/index' />    
            </Switch>
        )
    }
}


export default ProductRouter;