import React    from 'react';
import MUtil    from 'util/mm.jsx';


import './index.css';

const _mm = new MUtil;

class Login extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            password:''
        }
    }
    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]:inputValue
        })
    }
    onSubmit(e) {
        _mm.request({
            type:'POST',
            url:'/manage/user/login.do',
            data:{
                username:this.state.username,
                password:this.state.password,
            }
        }).then((res) => {

        },(err) => {

        })
    }
    render() {
        return (
            <div className='col-md-2 col-md-offset-5'>
               <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title">欢迎登录</h2>
                    </div>
                    <div className="panel-body">
                    <div>
                        <div className="form-group">
                            <input type="email" 
                                className="form-control"
                                name='username' 
                                placeholder="请输入用户名" 
                                onChange = {e => this.onInputChange(e)}
                                />
                        </div>
                        <div className="form-group">
                            <input type="password" 
                                className="form-control"
                                name='password' 
                                placeholder="请输入密码" 
                                onChange = {e => this.onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-lg btn-block btn-primary"
                        onClick={e => {this.onSubmit(e)}}>确定</button>
                        </div>
                    </div>
                </div>
            </div>
          
        )
    }
}

export default Login;