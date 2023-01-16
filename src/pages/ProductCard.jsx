import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* Card para renderizar os produtos buscados na API.
Recebe o nome, thumbnail e preço dos produtos como props. */
export default class ProductCard extends Component {
  render() {
    const { id, name, imageSrc, price, handleAddToCart } = this.props;

    return (
      <div data-testid="product">
        <p>{name}</p>

        <img
          src={ imageSrc }
          alt={ name }
        />

        <p>{price}</p>

        <Link
          to={ `/product/${id}` }
          data-testid="product-detail-link"
        >
          Detalhes do produto
        </Link>

        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => handleAddToCart(id) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  imageSrc: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
  handleAddToCart: PropTypes.func,
}.isRequired;
