import React        from 'react';
import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'rc-pagination';
import MUtil        from 'util/mm.jsx';
import User         from 'service/user-service.jsx';
import 'rc-pagination/dist/rc-pagination.min.css';


const _mm   = new MUtil;
const _user = new User;


class UserList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            list    : [],
            pageNum : 1
        }
    }
    loadUserList() {
        _user.getUserList(this.state.pageNum)
        .then(res => {
            this.setState(res)
        },errMsg => {
            this.setState({
                list : []
            })
            _mm.errTips(errMsg)
        })
    }
    onChangePageNum(pageNum) {
        this.setState({
            pageNum:pageNum
        },() => {
            this.loadUserList();
        })
    }
    componentDidMount() {
        this.loadUserList();
        console.log('state',this.state);
    }
    render() {
        return(
            <div id='page-wrapper'>
                <PageTitle title='用户列表' />
                <div className='row'>
                    <div className='col-md-12'>
                        <table className='table table-striped table-bordered'> 
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>用户名</th>
                                    <th>邮箱</th>
                                    <th>电话</th>
                                    <th>注册时间</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.list.map((user,index) => {
                                    return (
                                            <tr key={index}>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{new Date(user.createTime).toLocaleString()}</td>
                                            </tr>
                                    )
                                })
                            }
                            </tbody>
                            
                        </table>
                        <Pagination 
                            current = {this.state.pageNum}
                            total = {this.state.total}
                            onChange = {(pageNum) => this.onChangePageNum(pageNum)}
                            showQuickJumper
                            hideOnSinglePage
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default UserList;