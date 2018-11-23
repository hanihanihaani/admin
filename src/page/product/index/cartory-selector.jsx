import React        from 'react';
import MUtil        from 'util/mm.jsx';
import Product      from 'service/product-service.jsx';

import './cartory-selector.css'

const _mm   = new MUtil;
const _product = new Product;

class CartorySelect extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstCartoryList    : [],
            firstCartoryId      : 0,
            secondCartoryList   : [],
            secondCartoryId     : 0
        }
    }
    componentDidMount() {
        this.loadCartgoryList();
    }
    loadCartgoryList() {
        _product.getCartgoryList()
        .then(res => {
            this.setState({
                firstCartoryList:res
            })
        }, errMsg => {
            _mm.errTips(errMsg)
        })
    }
    loadSecondCartgoryList() {
        _product.getCartgoryList(this.state.firstCartoryId)
        .then(res => {
            this.setState({
                secondCartoryList:res
            })
        }, errMsg => {
            _mm.errTips(errMsg)
        })
    }
    onFirstCartgoryChanage(e) {
        let newValue = e.target.value || 0;
        this.setState({
            firstCartoryId      : newValue,
            secondCartoryId     : 0,
            secondCartoryList   : []
        }, () => {
            this.loadSecondCartgoryList();
            this.onPropsCartgroyChange();
        })
    }
    onSecondCartgoryChanage(e) {
        let newValue = e.target.value || 0;
        this.setState({
            secondCartoryId     : newValue,
        }, () => {
            this.onPropsCartgroyChange();
        })
    }
    //传给父组件选中的结果
    onPropsCartgroyChange() {
        let cartgoryChangeble = typeof this.props.onCartgoryChange == 'function';
        if (this.state.secondCartoryId) {
            cartgoryChangeble && this.props.onCartgoryChange(this.state.secondCartoryId,this.state.firstCartoryId);
        } else {
            cartgoryChangeble && this.props.onCartgoryChange(this.state.firstCartoryId,0);
        }
    } 
    render() {
        return (
            <div className='col-md-10'>
                <select className='select-one'
                    onChange = {(e) => this.onFirstCartgoryChanage(e)}>
                    <option>请选择一级分类</option>
                    {
                        this.state.firstCartoryList.map((cartory,i) => {
                            return (
                                    <option value={cartory.id} key={i}>{cartory.name}</option>
                                )
                            })
                    }
                </select>
                {this.state.secondCartoryList.length ? 
                    <select className='select-second' 
                        onChange = {(e) => this.onSecondCartgoryChanage(e)}>
                        <option value="">请选择二级分类</option>
                        {
                            this.state.secondCartoryList.map((cartory,i) => {
                                return (
                                        <option value={cartory.id} key={i}>{cartory.name}</option>
                                    )
                                })
                        }
                    </select>
                    : null
                }
               
            </div>
        )
    }
}


export default CartorySelect;