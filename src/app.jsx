import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';

import DashBoard from 'pages/dashboard/index.jsx';
import UserList from 'pages/user/index.jsx';
import Layout from 'component/layout/index.jsx';
import LogIn from 'pages/login/index.jsx';
import Error from 'pages/error/index.jsx';
import './css/index.css'

class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout> 
                <Switch>
                    <Route exact path="/" component={DashBoard}/>
                    {/* <Route path="/product" component={ProductRouter}/>
                    <Route path="/product-category" component={ProductRouter}/>
                    <Route path="/order/index" component={OrderList}/>
                    <Route path="/order/detail/:orderNumber" component={OrderDetail}/> */}
                    <Route path="/user/index" component={UserList}/>
                    {/* <Redirect exact from="/order" to="/order/index"/> */}
                    <Redirect exact from="/user" to="/user/index"/>
                    <Route component={Error}/>
                </Switch>
            </Layout>
        );
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LogIn}/>
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)