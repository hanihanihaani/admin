import React            from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import PageTitle        from 'component/page-title/index.jsx';
import CartorySelect    from './cartory-selector.jsx';





class ProductSave extends React.Component{
    constructor(props) {
        super(props);
    }
    onCartgoryChange(cartgoryId,parentCartgoryId) {
        console.log('cartgoryId',cartgoryId);
        console.log('parentCartgoryId',parentCartgoryId);
    }
    render() {
        return (
            <div id='page-wrapper'>
                <PageTitle title='添加商品'/>
                <div className='row'>
                    <div className='col-md-12'>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label  className="col-md-2 control-label">商品名称</label>
                            <div className="col-md-5">
                                <input type="text" className="form-control" placeholder="请输入商品名称"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-md-2 control-label">商品描述</label>
                            <div className="col-md-5">
                                <input type="text" className="form-control" placeholder="请输入商品描述"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-md-2 control-label">所属分类</label>
                            <CartorySelect 
                                onCartgoryChange = {(cartgoryId,parentCartgoryId) => this.onCartgoryChange(cartgoryId,parentCartgoryId)}/>
                        </div>
                        <div className="form-group">
                            <label  className="col-md-2 control-label">商品价格</label>
                            <div className="col-md-5">
                                <input type="number" className="form-control" placeholder="请输入商品价格"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-md-2 control-label">商品库存</label>
                            <div className="col-md-5">
                                <input type="number" className="form-control" placeholder="请输入商品库存"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-md-2 control-label">商品图片</label>
                            <div className="col-md-5">
                                <input type="number" className="form-control" placeholder="请输入商品图片"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-md-2 control-label">商品详情</label>
                            <div className="col-md-5">
                                <input type="number" className="form-control" placeholder="请输入商品详情"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-primary">提交</button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        )   
    }
}


export default ProductSave;