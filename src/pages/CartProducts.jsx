import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CartButton from '../components/layout/CartButton';

export default class CartProducts extends Component {
  render() {
    const {
      id,
      thumbnail,
      price,
      title,
      quantity,
      isDisabled,
      decreaseQuantity,
      increaseQuantity,
      removeProduct,
    } = this.props;

    return (
      <div>
        <img
          src={ thumbnail }
          alt={ title }
        />

        <p data-testid="shopping-cart-product-name">{title}</p>

        <div>
          <CartButton
            handleClick={ () => decreaseQuantity(id) }
            isDisabled={ isDisabled }
            dataTestId="product-decrease-quantity"
            text="-"
          />

          <p data-testid="shopping-cart-product-quantity">
            {`Qtd: ${quantity}`}
          </p>

          <CartButton
            handleClick={ () => increaseQuantity(id) }
            dataTestId="product-increase-quantity"
            isDisabled={ false }
            text="+"
          />
        </div>

        <p>{`Total: R$ ${quantity * price}`}</p>

        <CartButton
          dataTestId="remove-product"
          handleClick={ () => removeProduct(id) }
          isDisabled={ false }
          text="Remover produto"
        />
      </div>
    );
  }
}

CartProducts.propTypes = {
  decreaseQuantity: PropTypes.func,
  id: PropTypes.string,
  increaseQuantity: PropTypes.func,
  isDisabled: PropTypes.bool,
  price: PropTypes.number,
  quantity: PropTypes.number,
  removeProduct: PropTypes.func,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
}.isRequired;
