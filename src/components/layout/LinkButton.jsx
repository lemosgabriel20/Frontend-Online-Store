import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* Este componente ao ser clicado direciona para outra rota na aplicação.
Ele recebe como props: route (rota que será direcionada), dataTestId (string para validação do teste) e text (texto que será exibido no botão). */
export default class LinkButton extends Component {
  render() {
    const { route, dataTestId, text, cartSize } = this.props;

    return (
      <div>
        <button type="button">
          <Link
            to={ route }
            data-testid={ dataTestId }
          >
            {text}
          </Link>
        </button>
        <span data-testid="shopping-cart-size">{cartSize}</span>
      </div>
    );
  }
}

LinkButton.propTypes = {
  dataTestId: PropTypes.string,
  route: PropTypes.string,
  text: PropTypes.string,
  cartSize: PropTypes.number,
}.isRequired;
