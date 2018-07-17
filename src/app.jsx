import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';

import DashBoard from 'pages/dashboard/index.jsx';
import Layout from 'component/layout/index.jsx';
import './css/index.css'

ReactDOM.render(
    <div>
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={DashBoard} />
                    <Route path="/product" component={DashBoard} />
                    <Route path="/user" component={DashBoard} />
                </Switch>
            </Layout>
        </BrowserRouter>
    </div>,
    document.getElementById('app')
)