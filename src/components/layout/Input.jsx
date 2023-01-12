import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* Exibe um input na tela.
Recebe as props:
- handleChange (controla a mudança de estado),
- dataTestId (para testar com o RTL),
- placeholder
 */

export default class Input extends Component {
  render() {
    const { handleChange, dataTestId, placeholder } = this.props;

    return (
      <label htmlFor="input">
        <input
          type="text"
          data-testid={ dataTestId }
          onChange={ handleChange }
          placeholder={ placeholder }
        />
      </label>
    );
  }
}

Input.propTypes = {
  dataTestId: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
}.isRequired;
