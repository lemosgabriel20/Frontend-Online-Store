import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* Card para renderizar os produtos buscados na API.
Recebe o nome, thumbnail e preço dos produtos como props. */

export default class ProductCard extends Component {
  render() {
    const { name, imageSrc, price } = this.props;

    return (
      <div data-testid="product">
        <p>{name}</p>
        <img
          src={ imageSrc }
          alt={ name }
        />
        <p>{price}</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  imageSrc: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
}.isRequired;
