import React, { Component } from 'react';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

import LinkButton from '../components/layout/LinkButton';
import Checkbox from '../components/layout/Checkbox';
import Input from '../components/layout/Input';
import SearchButton from '../components/layout/SearchButton';
import ProductCard from './ProductCard';

export default class Home extends Component {
  state = {
    search: '',
    category: '',
    categories: [],
    products: [],
    cartProducts: [],
    buttonClicked: false,
  };

  componentDidMount() {
    this.setCategories();
  }

  // Atualiza o local storage quando a página é atualizada.

  componentDidUpdate() {
    const { cartProducts } = this.state;
    this.addToLocalStorage(cartProducts);
  }

  // Assim que a página é carregada, as categorias de produtos são buscadas na API e setadas no estado do componente.

  setCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  };

  //  Adiciona itens ao local storage.

  addToLocalStorage = (cartProducts) => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  };

  // Para cada caractere digitado, salva na variável search do state

  handleAddToCart = (id) => {
    const { cartProducts, products } = this.state;
    const foundProduct = products.find((element) => element.id === id);
    this.setState({ cartProducts: [...cartProducts, foundProduct] });
  };

  // Salva no estado o termo de pesquisa.

  handleChange = ({ target: { value } }) => {
    this.setState({ search: value, buttonClicked: false });
  };

  /* Quando pressionado o botão 'Buscar produtos', faz a busca pelo produto que está salvo na variável search (do state) na API do mercado livre.
  Caso uma categoria esteja selecionada, essa categoria é usada como filtro. */

  handleCheckbox = ({ target }) => {
    const { search } = this.state;
    const category = target.id || '';
    this.setState({ category }, async () => {
      const products = await getProductsFromCategoryAndQuery(category, search);
      this.setState({ products: products.results });
    });
  };

  // Faz uma requisição à API quando o botão de busca é clicado.

  handleClick = async () => {
    const { search, category } = this.state;
    const products = await getProductsFromCategoryAndQuery(category, search);
    this.setState({ products: products.results, buttonClicked: true });
  };

  render() {
    const { search, categories, products, buttonClicked } = this.state;
    const noResults = !products.length && buttonClicked;

    // Caso nenhuma pesquisa tenha sido feita ou nenhuma categoria tenha sido selecionada, a mensagem abaixo será exibida na página.

    const initialMessage = (
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );

    return (
      <div>
        {
          /* Faz um map renderizando um radio button para cada categoria no estado. */
          // limpar categoria
          categories.map((category) => (
            <div key={ category.id }>
              <Checkbox
                name={ category.name }
                text={ category.name }
                categoryId={ category.id }
                handleCheckbox={ this.handleCheckbox }
              />
            </div>
          ))
        }

        <LinkButton
          route="/cart"
          dataTestId="shopping-cart-button"
          text="Carrinho"
        />

        <Input
          handleChange={ this.handleChange }
          dataTestId="query-input"
          placeholder="Digite sua pesquisa"
        />

        <SearchButton
          dataTestId="query-button"
          text="Buscar produtos"
          handleClick={ this.handleClick }
        />

        {!search && initialMessage}

        {
          /* Faz um map para cada produto no termo de busca.
          Exibe mensagem de erro caso nenhum produto seja encontrado. */
          !noResults ? (
            products.map((product) => (
              <ProductCard
                key={ product.id }
                name={ product.title }
                imageSrc={ product.thumbnail }
                price={ product.price }
                id={ product.id }
                handleAddToCart={ this.handleAddToCart }
              />
            ))
          ) : (
            <p>Nenhum produto foi encontrado</p>
          )
        }
      </div>
    );
  }
}
