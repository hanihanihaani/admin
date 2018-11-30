import React            from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import PageTitle        from 'component/page-title/index.jsx';
import CartorySelect    from './cartory-selector.jsx';
import FileUploader     from 'util/file-upload/index.jsx';
import RichEditor       from 'util/rich-editor/index.jsx';
import MUtil        from 'util/mm.jsx';
import Product      from 'service/product-service.jsx';


import './save.css';

const _mm   = new MUtil;
const _product = new Product;

class ProductSave extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cartgoryId          : 0,
            parentCartgoryId    : 0,
            subImages           : [],
            detail              : '',
            name                : '',
            subtitle            : '',
            price               : '',
            stock               : '',
            status              : 1,//商品状态1位在售
        }
    }
    onCartgoryChange(cartgoryId,parentCartgoryId) {
        this.setState({
            cartgoryId        : cartgoryId,
            parentCartgoryId  : parentCartgoryId
        })
    }
    onUploadSuccess(res) {
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages:subImages
        })
    }
    onUploadError(err) {
        _mm.errMsg(err)
    }
    onImageDelete(e) {
        let index = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
            subImages.splice(index,1);
            this.setState({
                subImages:subImages
            })
    }
    onDetailValueChange(value) {
        this.setState({
            detail:value
        })
    }
    onValueChange(e) {
        let name = e.target.name,
            value  = e.target.value.trim();
            this.setState({
                [name]:value
            })
    }
    getSubImagesString() {
        return this.state.subImages.map((images) => images.uri).join(',');
    }
    onSubmit(e) {
        let product = {
            name        : this.state.name,
            subtitle    : this.state.subtitle,
            cartgoryId  : parseInt(this.state.cartgoryId),
            subImages   : this.getSubImagesString(),
            detail      : this.state.detail,
            price       : parseFloat(this.state.price),
            stock       : parseInt(this.state.stock),
            status      : this.state.status
        },
        productCheckResult = _product.checkProduct(product);
        if (productCheckResult.status) {
            _product.saveProduct(product)
            .then((res) => {
                _mm.successTips(res);
                this.props.history.push('/product/index')
            },(errMsg) => {
                _mm.errTips(errMsg)
            })
        } else {
            _mm.errTips(productCheckResult.msg)
        }
    }
    render() {
        return (
            <div id='page-wrapper'>
                <PageTitle title='添加商品'/>
                <div className='row'>
                    <div className='col-md-12'>
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label  className="col-md-2 control-label">商品名称</label>
                            <div className="col-md-5">
                                <input type="text" className="form-control" placeholder="请输入商品名称"
                                        name="name"
                                        onChange={(e) => this.onValueChange(e)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-md-2 control-label">商品描述</label>
                            <div className="col-md-5">
                                <input type="text" className="form-control" placeholder="请输入商品描述"
                                        name="subtitle"
                                        onChange={(e) => this.onValueChange(e)}/>
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
                                <input type="number" className="form-control" placeholder="请输入商品价格"
                                        name="price"
                                        onChange={(e) => this.onValueChange(e)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-md-2 control-label">商品库存</label>
                            <div className="col-md-5">
                                <input type="number" className="form-control" placeholder="请输入商品库存"
                                        name="stock"
                                        onChange={(e) => this.onValueChange(e)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-md-2 control-label">商品图片</label>
                            <div className="col-sm-offset-2 col-sm-10">
                                {
                                        this.state.subImages.length ?
                                        this.state.subImages.map((image,i) => (
                                            <div className='img-box' key={i}>
                                                <img className='img' src={image.url} alt=""/>
                                                <i className='fa fa-close' index={i} onClick={(e) => this.onImageDelete(e)}></i>
                                            </div>
                                        ))
                                        : (<div>请上传图片</div>)
                                }
                            </div>
                            <div className="col-sm-offset-2 col-sm-10">
                                <FileUploader onSuccess = {(res) => this.onUploadSuccess(res)}
                                onErrorr = {(err) => this.onUploadError(err)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-md-2 control-label">商品详情</label>
                            <div className="col-md-5">
                                <RichEditor onValueChange = {(value) => this.onDetailValueChange(value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-primary" 
                                        onClick={(e) => this.onSubmit(e)}>提交</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}


export default ProductSave;