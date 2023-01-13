import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AvalForm extends Component {
  state = {
    emailValue: '',
    starValue: '',
    textValue: '',
    invalidForm: null,
  };

  componentDidUpdate() {
    const { starValue, invalidForm } = this.state;
    if (starValue.length !== 0 && invalidForm === true) {
      this.setState({ invalidForm: false });
    }
  }

  // "Desenha" as estrelas (checkbox) na tea
  drawRatings = (stars, ratings, handleRating) => {
    for (let i = 1; i <= ratings; i += 1) {
      const testId = `${i}-rating`;
      stars.push(
        <label key={ i } htmlFor={ i }>
          <input
            name="rating"
            id={ i }
            required
            type="radio"
            data-testid={ testId }
            value={ i }
            onClick={ handleRating }
          />
          { i }
        </label>,
      );
    }
    return stars;
  };

  handleEmail = ({ target: { value } }) => {
    this.setState({ emailValue: value });
  };

  handleRating = ({ target: { value } }) => {
    this.setState({ starValue: value });
  };

  handleText = ({ target: { value } }) => {
    this.setState({ textValue: value });
  };

  // Função que envia a avaliação (incluindo email, rating e texto) para o localStorage caso as informações
  // preenchidas não forem vazias.
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { emailValue, starValue, textValue } = this.state;
    const { updateAvaliations } = this.props;
    if (
      emailValue.length === 0
      || starValue.length === 0
      || textValue.length === 0
    ) {
      this.setState({ invalidForm: true });
    } else {
      const avaliation = { email: emailValue, text: textValue, rating: starValue };
      this.setState({ emailValue: '', textValue: '' });
      this.setState({ invalidForm: false });
      updateAvaliations(avaliation);
      // Renderizar no ProductDetails.jsx
    }
  };

  render() {
    const { emailValue, textValue, invalidForm } = this.state;
    const ratings = 5;
    const stars = this.drawRatings([], ratings, this.handleRating);
    return (
      <form action="" method="POST">
        <input
          data-testid="product-detail-email"
          value={ emailValue }
          onChange={ this.handleEmail }
          type="email"
          placeholder="Email"
          required
        />

        { /* Aqui renderiza as estrelas(checkboxs) */ }
        { stars }

        <textarea
          data-testid="product-detail-evaluation"
          value={ textValue }
          onChange={ this.handleText }
          required
        />

        <button
          type="submit"
          data-testid="submit-review-btn"
          onClick={ this.handleSubmit }
        >
          Avaliar
        </button>

        { invalidForm ? <p data-testid="error-msg">Campos inválidos</p> : null }
      </form>
    );
  }
}

AvalForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
