import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CartButton extends Component {
  render() {
    const { handleClick, isDisabled, dataTestId, text } = this.props;

    return (
      <button
        type="button"
        onClick={ handleClick }
        disabled={ isDisabled }
        data-testid={ dataTestId }
      >
        {text}
      </button>
    );
  }
}

CartButton.propTypes = {
  dataTestId: PropTypes.string,
  handleClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  text: PropTypes.string,
}.isRequired;
