import React, { Component } from 'react'
import StockService from '../services/StockService'

class ViewStockComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            stock: {}
        }
    }

    componentDidMount(){
        StockService.getStockById(this.state.id).then( res => {
            this.setState({stock: res.data});
        })
    }

    cancel(){
        this.props.history.push('/stocks');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Stock Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Stock Name: </label>
                            <div> { this.state.stock.stockName }</div>
                        </div>
                        <div className = "row">
                            <label> Quantity: </label>
                            <div> { this.state.stock.quantity }</div>
                        </div>
                        <div className = "row">
                            <label> Stock Email ID: </label>
                            <div> { this.state.stock.emailId }</div>
                        </div>
                    </div>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Back</button>
                </div>
            </div>
        )
    }
}

export default ViewStockComponent