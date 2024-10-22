import React, { Component } from 'react'
import StockService from '../services/StockService'
import { withRouter } from 'react-router-dom'

class ListStockComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                stocks: []
        }
        this.addStock = this.addStock.bind(this);
        this.editStock = this.editStock.bind(this);
        this.deleteStock = this.deleteStock.bind(this);
    }

    deleteStock(id){
        StockService.deleteStock(id).then( res => {
            this.setState({stocks: this.state.stocks.filter(stock => stock.id !== id)});
        });
    }
    viewStock(id){
        this.props.history.push(`/view-stock/${id}`);
    }
    editStock(id){
        this.props.history.push(`/add-stock/${id}`);
    }

    componentDidMount(){
        StockService.getStocks().then((res) => {
            this.setState({ stocks: res.data});
        });
    }

    addStock(){
        this.props.history.push('/add-stock/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Stocks List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addStock}> Add Stock</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Stock Name</th>
                                    <th> Quantity</th>
                                    <th> Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.stocks.map(
                                        stock => 
                                        <tr key = {stock.id}>
                                             <td> { stock.stockName} </td>   
                                             <td> {stock.quantity}</td>
                                             <td> {stock.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editStock(stock.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteStock(stock.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewStock(stock.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default withRouter(ListStockComponent)