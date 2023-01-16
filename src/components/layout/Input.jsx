import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* Exibe um input na tela. Recebe as props:
- handleChange (controla a mudança de estado),
- dataTestId (para testar com o RTL),
- placeholder
- name (name, id, htmlFor) */
export default class Input extends Component {
  render() {
    const { handleChange, dataTestId, placeholder, name, value } = this.props;

    return (
      <label htmlFor={ name }>
        <input
          type="text"
          data-testid={ dataTestId }
          onChange={ handleChange }
          placeholder={ placeholder }
          name={ name }
          id={ name }
          value={ value }
        />
      </label>
    );
  }
}

Input.propTypes = {
  dataTestId: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
}.isRequired;
