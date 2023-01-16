import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckoutForm from './CheckoutForm';

export default class Checkout extends Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    const getCartStorage = localStorage.getItem('cartProducts');
    if (getCartStorage) {
      this.getFromLocalStorage();
    }
  }

  // Busca produtos salvos no local storage.
  getFromLocalStorage = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    this.setState({ cartProducts });
  };

  // Determina a quantidade de produtos com base no ID.
  productQuantity = (id) => {
    const { cartProducts } = this.state;
    return cartProducts.filter((product) => product.id === id).length;
  };

  // Remove elementos duplicados do cartProducts usando o objeto Set (armazena apenas valores únicos).
  filterList = (cartProducts) => {
    if (!cartProducts) return;
    const uniqueIds = new Set();
    return cartProducts.filter((product) => {
      const duplicate = uniqueIds.has(product.id);
      uniqueIds.add(product.id);
      return !duplicate;
    });
  };

  // Calcula o valor total do carrinho
  totalCartValue = (cartProducts) => cartProducts.reduce(
    (accumulator, currentProduct) => accumulator + currentProduct.price,
    0,
  );

  // Redireciona para a página principal.
  redirect = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { cartProducts } = this.state;
    const filteredList = this.filterList(cartProducts);
    const total = this.totalCartValue(cartProducts);

    return (
      <div>
        {filteredList.map((product) => {
          const quantity = this.productQuantity(product.id);

          return (
            <div key={ product.id }>
              <p>{product.title}</p>
              <p>{`Total: R$ ${product.price * quantity}`}</p>
            </div>
          );
        })}

        <p>{`Valor total do carrinho: R$ ${total}`}</p>

        <CheckoutForm
          redirect={ this.redirect }
        />
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
