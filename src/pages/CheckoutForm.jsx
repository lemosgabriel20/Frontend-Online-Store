import PropTypes from 'prop-types';
import React, { Component } from 'react';

import RadioInput from '../components/form/RadioInput';
import Input from '../components/layout/Input';

export default class CheckoutForm extends Component {
  state = {
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    filledForm: false,
    buttonClicked: false,
  };

  // Valida os campos do formulário e garante que todos estejam preenchidos.
  validateForm = () => {
    const { fullname, email, cpf, phone, cep, address, payment } = this.state;
    const errorCases = [
      !fullname.length,
      !email.length,
      !cpf.length,
      !phone.length,
      !cep.length,
      !address.length,
      !payment.length,
    ];
    const filledForm = errorCases.every((error) => error !== true);
    this.setState({ filledForm });
  };

  // Atualiza o estado do componente ao digitar nos campos do formulário.
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, buttonClicked: false }, () => this.validateForm());
  };

  //  Adiciona itens ao local storage.
  addToLocalStorage = (cartProducts) => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  };

  // Envia o formulário e redireciona para a página principal.
  handleSubmit = (event) => {
    const { filledForm } = this.state;
    const { redirect } = this.props;
    event.preventDefault();
    this.setState({ buttonClicked: true });
    if (filledForm) {
      this.addToLocalStorage([]);
      redirect();
    }
  };

  render() {
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      filledForm,
      buttonClicked,
      payment,
    } = this.state;
    const invalidCases = buttonClicked && !filledForm;

    // Exibe uma mensagem de erro caso os campos do formulário não sejam válidos.
    const errorMessage = <p data-testid="error-msg">Campos inválidos</p>;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <Input
            handleChange={ this.handleChange }
            dataTestId="checkout-fullname"
            placeholder="Nome completo"
            name="fullname"
            value={ fullname }
          />

          <Input
            handleChange={ this.handleChange }
            dataTestId="checkout-email"
            placeholder="Email"
            name="email"
            value={ email }
          />

          <Input
            handleChange={ this.handleChange }
            dataTestId="checkout-cpf"
            placeholder="CPF"
            name="cpf"
            value={ cpf }
          />

          <Input
            handleChange={ this.handleChange }
            dataTestId="checkout-phone"
            placeholder="Telefone"
            name="phone"
            value={ phone }
          />

          <Input
            handleChange={ this.handleChange }
            dataTestId="checkout-cep"
            placeholder="CEP"
            name="cep"
            value={ cep }
          />

          <Input
            handleChange={ this.handleChange }
            dataTestId="checkout-address"
            placeholder="Endereço"
            name="address"
            value={ address }
          />

          <div>
            <RadioInput
              name="payment"
              text="Boleto"
              dataTestId="ticket-payment"
              value="ticket"
              handleChange={ this.handleChange }
              checked={ payment === 'ticket' }
            />

            <RadioInput
              name="payment"
              text="Visa"
              dataTestId="visa-payment"
              value="visa"
              handleChange={ this.handleChange }
              checked={ payment === 'visa' }
            />

            <RadioInput
              name="payment"
              text="Mastercard"
              dataTestId="master-payment"
              value="master"
              handleChange={ this.handleChange }
              checked={ payment === 'master' }
            />

            <RadioInput
              name="payment"
              text="Elo"
              dataTestId="elo-payment"
              value="elo"
              handleChange={ this.handleChange }
              checked={ payment === 'elo' }
            />
          </div>

          <button
            type="submit"
            data-testid="checkout-btn"
          >
            Finalizar pagamento
          </button>
        </form>

        {invalidCases && errorMessage}
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  redirect: PropTypes.func,
}.isRequired;
