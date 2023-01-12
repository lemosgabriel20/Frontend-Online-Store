import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* Esse componente renderiza radio buttons.
Ele recebe como props: name (para label, name, id) e text (texto do radio button). */

export default class RadioButton extends Component {
  render() {
    const { name, text, handleRadioClick, categoryId } = this.props;

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
          onChange={ handleRadioClick }
        />
        {text}
      </label>
    );
  }
}

RadioButton.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
}.isRequired;
