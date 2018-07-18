import React from 'react';
import { Link }     from 'react-router-dom';

import MUtil        from 'util/util.jsx'
import Statistic    from 'service/statistic-service.jsx'

const _mm           = new MUtil();
const _statistic    = new Statistic();
import PageTitle from '../../component/page-title/index.jsx'
import './index.scss'

class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userCount       : '-',
            productCount    : '-',
            orderCount      : '-'
        }
    }
    componentDidMount(){
        this.loadCount();
    }
    loadCount(){
        _statistic.getHomeCount().then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Dashboard" />
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>Users</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/product" className="color-box green">
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>Product</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/order" className="color-box blue">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>Orders</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashBoard;