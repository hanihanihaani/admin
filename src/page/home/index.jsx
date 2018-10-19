import React from 'react';
import PageTitle from 'component/page-title/index.jsx';


class Home extends React.Component{
    render() {
        return (
            <div id='page-wrapper'>
                <PageTitle title='首页' />
                <button type='button' className='btn btn-warning'>warning</button>
            </div>
        );
    }
}


export default Home;