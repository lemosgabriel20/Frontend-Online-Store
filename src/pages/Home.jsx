import React, { Component } from 'react';
import Button from '../components/layout/Button';

export default class Home extends Component {
  state = {
    products: [],
  };

  render() {
    const { products } = this.state;

    const initialMessage = (
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );

    return (
      <div>
        {!products.length && initialMessage}
        <Button
          route="/cart"
          dataTestId="shopping-cart-button"
          text="Carrinho"
        />
      </div>
    );
  }
}
