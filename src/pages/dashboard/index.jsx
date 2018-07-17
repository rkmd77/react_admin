import React from 'react';
import PageTitle from '../../component/page-title/index.jsx'

class DashBoard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Dashboard">
                    {/* <button className="btn btn-info">ddd</button> */}
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        body
                    </div>
                </div>
            </div>
        )
    }
}

export default DashBoard;