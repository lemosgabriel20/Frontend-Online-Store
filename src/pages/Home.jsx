import React, { Component } from 'react';
import { getCategories } from '../services/api';

import Button from '../components/layout/Button';
import RadioButton from '../components/layout/RadioButton';

export default class Home extends Component {
  state = {
    search: '',
    categories: [],
  };

  componentDidMount() {
    this.setCategories();
  }

  // Assim que a página é carregada, as categorias de produtos são buscadas na API e setadas no estado do componente.

  setCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  };

  render() {
    const { search, categories } = this.state;

    // Caso nenhuma pesquisa tenha sido feita ou nenhuma categoria tenha sido selecionada, a mensagem abaixo será exibida na página.

    const initialMessage = (
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );

    return (
      <div>
        {!search && initialMessage}

        {/* Faz um map renderizando um radio button para cada categoria no estado. */}

        {categories.map((category) => (
          <div key={ category.id }>
            <RadioButton
              categoryName={ category.name }
              text={ category.name }
            />
          </div>
        ))}

        <Button
          route="/cart"
          dataTestId="shopping-cart-button"
          text="Carrinho"
        />
      </div>
    );
  }
}
