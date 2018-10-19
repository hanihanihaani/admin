import React from 'react';
import './index.css';

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
    render() {
        return (
            <div className='col-md-4 col-md-offset-4'>
               <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title">欢迎登录</h2>
                    </div>
                    <div className="panel-body">
                    <form>
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
                        <button type="submit" className="btn btn-lg btn-block btn-primary">确定</button>
                        </form>
                    </div>
                </div>
            </div>
          
        )
    }
}

export default Login;