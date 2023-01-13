import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import LinkButton from '../components/layout/LinkButton';

export default class ProductDetails extends Component {
  state = {
    name: '',
    price: '',
    image: '',
  };

  componentDidMount() {
    this.getProductDetails();
  }

  // Faz a requisição para a API dos detalhes do produto e salva no estado as informações.

  getProductDetails = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getProductById(id);
    this.setState({
      name: response.title,
      price: response.price,
      image: response.pictures[0].url,
    });
  };

  render() {
    const { name, image, price } = this.state;

    return (
      <div>
        <img
          src={ image }
          alt={ name }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-name">{name}</p>
        <p data-testid="product-detail-price">{`R$ ${price}`}</p>

        <LinkButton
          route="/cart"
          dataTestId="shopping-cart-button"
          text="Carrinho"
        />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
