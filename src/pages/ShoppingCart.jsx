import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    shoppingList: [],
  };

  componentDidMount() {
    this.getFromLocalStorage();
  }

  getFromLocalStorage = () => {
    const shoppingList = JSON.parse(localStorage.getItem('cartProducts')).reverse();
    this.setState({ shoppingList });
  };

  render() {
    const { shoppingList } = this.state;

    // Caso a lista de produtos esteja vazia, a mensagem abaixo será exibida.

    const emptyMessage = (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );

    // TODO: criar função para definir a quantidade de produtos com base no ID.

    const products = shoppingList.map((product, index) => (
      <div key={ index }>
        <p data-testid="shopping-cart-product-name">{product.title}</p>
        <p data-testid="shopping-cart-product-quantity">1</p>
      </div>
    ));

    return <div>{!shoppingList ? emptyMessage : products}</div>;
  }
}
