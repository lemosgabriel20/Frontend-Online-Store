import React, { Component } from 'react';

export default class Home extends Component {
  state = {
    products: [],
  };

  render() {
    const { products } = this.state;

    if (!products.length) {
      return (
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      );
    }

    return <div>Home</div>;
  }
}
