import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* Este componente ao ser clicado pesquisa.
Ele recebe como props: route (rota que será direcionada), dataTestId (string para validação do teste) e text (texto que será exibido no botão). */
export default class SearchButton extends Component {
  render() {
    const { dataTestId, text, handleClick } = this.props;

    return (
      <button
        type="button"
        data-testid={ dataTestId }
        onClick={ handleClick }
      >
        {text}
      </button>
    );
  }
}

SearchButton.propTypes = {
  dataTestId: PropTypes.string,
  text: PropTypes.string,
}.isRequired;
