import React from 'react';
import TopNav from '../topnav/index.jsx';
import SideNav from '../sidenav/index.jsx';

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="wrapper">
                <TopNav />
                <SideNav />
                {this.props.children}
            </div>
        )
    }
}

export default Layout;