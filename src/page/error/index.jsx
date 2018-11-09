import React        from 'react';
import { Link }     from 'react-router-dom';
import PageTitle    from 'component/page-title/index.jsx';

class Errorr extends React.Component{
    constructor (props) {
        super(props)
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="出错啦!"/>
                <div className="row">
                    <div className="col-md-12">
                        <span>出错了</span>
                        <Link to="/">点我返回首页</Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default Errorr;