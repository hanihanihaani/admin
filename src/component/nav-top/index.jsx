import React from 'react';
import { Link } from 'react-router-dom';

class NavTop extends React.Component{
    render() {
        return (
            <div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="index.html"><b>LEARN</b>REACT</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javaScript:;">
                        <i className="fa fa-user fa-fw"></i> 
                        <span>欢迎您，adminxxx</span>
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <a href="#">
                                <i className="fa fa-sign-out fa-fw"></i>
                                退出登录
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        )
    }
}

export default NavTop;