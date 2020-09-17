import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Inventory from './components/Inventory/Inventory';
import Review from './components/Review/Review';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { createContext } from 'react';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/shipment">
            <Shipment></Shipment>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productkey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
