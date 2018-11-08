import React    from 'react';
import MUtil    from 'util/mm.jsx';
import User     from 'service/user-service.jsx';


import './index.css';

const _mm   = new MUtil;
const _user = new User;

class Login extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            password:'',
            redirect:_mm.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount() {
        document.title = '登录，我的后台'
    }
    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]:inputValue
        })
    }
    onSubmit(e) {
        let loginInfo = {
            username:this.state.username,
            password:this.state.password
        },
        checkResult = _user.checkLoginInfo(loginInfo);
        //检验用户名和密码是否合法
        if (checkResult.status) {
            _user.login(loginInfo)
            .then((res) => {
                // console.log('this.props',this.props)
                this.props.history.push(this.state.redirect);
                _mm.setStorage('userInfo',res)
            },(errMsg) => {
                _mm.errTips(errMsg)
            })
        } else {
            _mm.errTips(checkResult.msg);
        }
        
    }
    onInputKeyUp(e) {
        if (e.keyCode == 13) {
            this.onSubmit();
        }
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
                                onKeyUp = {e => this.onInputKeyUp(e)}
                                onChange = {e => this.onInputChange(e)}
                                />
                        </div>
                        <div className="form-group">
                            <input type="password" 
                                className="form-control"
                                name='password' 
                                placeholder="请输入密码" 
                                onKeyUp = {e => this.onInputKeyUp(e)}
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