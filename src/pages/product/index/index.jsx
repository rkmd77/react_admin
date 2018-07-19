import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/util.jsx'
import Product      from 'service/product-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';
import ListSearch   from './index-list-search.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';

import './index.scss';

const _mm           = new MUtil();
const _product      = new Product();

class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            listType        : 'list'
        };
    }
    componentDidMount(){
        this.loadProductList();
    }
    // 加载商品列表
    loadProductList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.keyword    = this.state.searchKeyword;
        }
        // 请求接口
        _product.getProductList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    // 搜索
    onSearch(searchType, searchKeyword){
        console.log(searchType, searchKeyword);
        
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType        : listType,
            pageNum         : 1,
            searchType      : searchType,
            searchKeyword   : searchKeyword
        }, () => {
            this.loadProductList();
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadProductList();
        });
    }
    // 改变商品状态，上架 / 下架
    onSetProductStatus(e, productId, currentStatus){
        let newStatus   = currentStatus == 1 ? 2 : 1,
            confrimTips = currentStatus == 1 
                ? 'Do you Sure about Off Stock ?' : 'Do you sure about On Sale ?';
        if(window.confirm(confrimTips)){
            _product.setProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => {
                _mm.successTips(res);
                this.loadProductList();
            }, errMsg => {
                _mm.errorTips(res);
            });
        }
    }
    render(){
        let tableHeads = [
            {name: 'Product ID', width: '10%'},
            {name: 'Description', width: '50%'},
            {name: 'Price', width: '10%'},
            {name: 'Status', width: '15%'},
            {name: 'Operation', width: '15%'},
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="Product List">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span> Add New Product</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearchprops={(searchTypeprops, searchKeywordprops) => {this.onSearch(searchTypeprops, searchKeywordprops)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <span>{product.name}</span>
                                        <span>{product.subtitle}</span>
                                    </td>
                                    <td>${product.price}</td>
                                    <td>
                                        <span className={product.status == 1 ? 'onsale' : 'offstock'}>{product.status == 1 ? 'On Sale' : 'Off Stock'}</span>
                                        <button className={product.status == 1 ? 'btn btn-xs btn-right btn-danger' : 'btn btn-xs btn-right btn-success'}
                                            onClick={(e) => {this.onSetProductStatus(e, product.id, product.status)}}>{product.status == 1 ? 'Off Stock' : 'On Sale'}</button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={ `/product/detail/${product.id}` }><i className="fa fa-eye"></i> View</Link>
                                        <Link className="opear btn-right" to={ `/product/save/${product.id}` }><i className="fa fa-edit"></i> Edit</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
}

export default ProductList;