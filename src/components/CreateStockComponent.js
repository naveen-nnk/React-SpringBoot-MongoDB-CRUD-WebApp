import React, { Component } from 'react'
import StockService from '../services/StockService';

class CreateStockComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            stockName: '',
            quantity: '',
            emailId: ''
        }
        this.changeStockNameHandler = this.changeStockNameHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.saveOrUpdateStock = this.saveOrUpdateStock.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            StockService.getStockById(this.state.id).then( (res) =>{
                let stock = res.data;
                this.setState({stockName: stock.stockName,
                    quantity: stock.quantity,
                    emailId : stock.emailId
                });
            });
        }        
    }
    saveOrUpdateStock = (e) => {
        e.preventDefault();
        let stock = {stockName: this.state.stockName, quantity: this.state.quantity, emailId: this.state.emailId};
        console.log('stock => ' + JSON.stringify(stock));

        // step 5
        if(this.state.id === '_add'){
            StockService.createStock(stock).then(res =>{
                this.props.history.push('/stocks');
            });
        }else{
            StockService.updateStock(stock, this.state.id).then( res => {
                this.props.history.push('/stocks');
            });
        }
    }
    
    changeStockNameHandler= (event) => {
        this.setState({stockName: event.target.value});
    }

    changeQuantityHandler= (event) => {
        this.setState({quantity: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/stocks');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Stock</h3>
        }else{
            return <h3 className="text-center">Update Stock</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Stock Name: </label>
                                            <input placeholder="Stock Name" name="stockName" className="form-control" 
                                                value={this.state.stockName} onChange={this.changeStockNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Quantity: </label>
                                            <input placeholder="Quantity" name="quantity" className="form-control" 
                                                value={this.state.quantity} onChange={this.changeQuantityHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateStock}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateStockComponent