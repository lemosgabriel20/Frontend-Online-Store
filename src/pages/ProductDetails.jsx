import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import LinkButton from '../components/layout/LinkButton';
import AvalForm from '../components/layout/AvalForm';
import AvalCard from '../components/layout/AvalCard';

export default class ProductDetails extends Component {
  state = {
    name: '',
    price: '',
    image: '',
    avaliations: [],
  };

  componentDidMount() {
    this.getProductDetails();

    // Garante que exista um localStorage próprio para a id do produto
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { avaliations } = this.state;
    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, JSON.stringify(avaliations));
    } else {
      const savedAvaliations = (JSON.parse(localStorage.getItem(id)));
      this.setState({ avaliations: savedAvaliations });
    }
  }
  
addToLocalStorage = (id, avaliation) => {
    localStorage.setItem(id, JSON.stringify(avaliation));
  };

  // Envia as avaliações para o localStorage
  updateAvaliations = (avaliationObject) => {
    const { avaliations } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ avaliations: [...avaliations, avaliationObject] }, () => {
      const { state } = this;
      this.addToLocalStorage(id, state.avaliations);
    });
  };
  
  // Faz a requisição para a API dos detalhes do produto e salva no estado as informações.
  getProductDetails = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getProductById(id);
    this.setState({
      name: response.title,
      price: response.price,
      image: response.pictures[0].url,
    });
  };

  render() {
    const { name, image, price, avaliations } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    return (
      <div>
        <img
          src={ image }
          alt={ name }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-name">{name}</p>
        <p data-testid="product-detail-price">{`R$ ${price}`}</p>

        <LinkButton
          route="/cart"
          dataTestId="shopping-cart-button"
          text="Carrinho"
        />

        <AvalForm productId={ id } updateAvaliations={ this.updateAvaliations } />
        { avaliations.length > 0 ? (
          avaliations.map((aval, index) => (
            <AvalCard
              key={ index }
              email={ aval.email }
              rating={ aval.rating }
              text={ aval.text }
            />))
        ) : null }
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
