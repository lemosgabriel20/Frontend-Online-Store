import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    shoppingList: [],
  };

  render() {
    const { shoppingList } = this.state;

    // Caso a lista de produtos esteja vazia, a mensagem abaixo será exibida.

    const emptyMessage = (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );

    return (
      <div>
        {!shoppingList.length && emptyMessage}
        ShoppingCart
      </div>
    );
  }
}
