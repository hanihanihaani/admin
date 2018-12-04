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
            firstCategoryId      : 0,
            secondCartoryList   : [],
            secondCartoryId     : 0
        }
    }
    componentDidMount() {
        this.loadCartgoryList();
    }
    componentWillReceiveProps(nextProps){
        let categoryIdChange        = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;

            // 如果数据没有发生变化的时候，直接不做处理
            if (!categoryIdChange && !parentCategoryIdChange) {
                return;
            }
            // 只有一级品类
            if (nextProps.parentCategoryId == 0) {
                this.setState({
                    firstCategoryId  : nextProps.categoryId,
                    secondCartoryId : 0
                })
            } else {    //有两级品类
                this.setState({
                    firstCategoryId  : nextProps.parentCategoryId,
                    secondCartoryId : nextProps.categoryId,
                },() => {
                    parentCategoryIdChange && this.loadSecondCartgoryList()
                })
            }

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
        _product.getCartgoryList(this.state.firstCategoryId)
        .then(res => {
            this.setState({
                secondCartoryList:res
            })
        }, errMsg => {
            _mm.errTips(errMsg)
        })
    }   
    onFirstCartgoryChange(e) {
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId     : newValue,
            secondCartoryId     : 0,
            secondCartoryList   : []
        }, () => {
            this.loadSecondCartgoryList();
            this.onPropsCategoryChange();
        })
    }
    onSecondCartgoryChange(e) {
        let newValue = e.target.value || 0;
        this.setState({
            secondCartoryId     : newValue,
        }, () => {
            this.onPropsCategoryChange();
        })
    }
    //传给父组件选中的结果
    onPropsCategoryChange() {
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        if (this.state.secondCartoryId) {
            categoryChangable && this.props.onCategoryChange(this.state.secondCartoryId,this.state.firstCategoryId);
        } else {
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId,0);
        }
    } 
    render() {
        return (
            <div className='col-md-10'>
                <select className='select-one'
                    value={this.state.firstCategoryId}
                    onChange = {(e) => this.onFirstCartgoryChange(e)}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCartoryList.map(
                            (cartory,i) => <option value={cartory.id} key={i}>{cartory.name}</option>
                            )
                    }
                </select>
                {this.state.secondCartoryList.length ? 
                    <select className='select-second' 
                        value={this.state.secondCartoryId}
                        onChange = {(e) => this.onSecondCartgoryChange(e)}>
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