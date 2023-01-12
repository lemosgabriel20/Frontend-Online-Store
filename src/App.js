import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/product/:id"
          component={ ProductDetails }
        />

        <Route
          exact
          path="/cart"
          component={ ShoppingCart }
        />

        <Route
          exact
          path="/"
          component={ Home }
        />
      </Switch>
    );
  }
}
