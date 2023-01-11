import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    shoppingList: [],
  };

  render() {
    const { shoppingList } = this.state;

    if (!shoppingList.length) {
      return (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      );
    }

    return <div>ShoppingCart</div>;
  }
}
