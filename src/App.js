import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch,withRouter} from 'react-router-dom';
import ListStockComponent from './components/ListStockComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateStockComponent from './components/CreateStockComponent';
import ViewStockComponent from './components/ViewStockComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route exact path = "/" component = {withRouter(ListStockComponent)}></Route>
                          <Route path = "/stocks" component = {withRouter(ListStockComponent)}></Route>
                          <Route path = "/add-stock/:id" component = {withRouter(CreateStockComponent)}></Route>
                          <Route path = "/view-stock/:id" component = {withRouter(ViewStockComponent)}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;