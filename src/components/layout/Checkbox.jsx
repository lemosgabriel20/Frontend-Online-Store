import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* Esse componente renderiza checkboxes das categorias de produto.
Ele recebe como props: name (para label, name, id) e text (texto do radio button). */

export default class Checkbox extends Component {
  render() {
    const { name, text, handleCheckbox, categoryId } = this.props;

    return (
      <label
        htmlFor={ categoryId }
        data-testid="category"
      >
        <input
          type="checkbox"
          name={ name }
          id={ categoryId }
          value={ categoryId }
          onChange={ handleCheckbox }
        />
        {text}
      </label>
    );
  }
}

Checkbox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
}.isRequired;
