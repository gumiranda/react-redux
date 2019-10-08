import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // connect this component to redux state
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions'; // importing both functions by using *

import { ProductList, AddToCartButton } from './styles';

// move export defult to ouside fo class to be able to use connect from redux
// export default class Home extends Component {
class Home extends Component {
  static propTypes = {
    addToCartRequest: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    amount: PropTypes.number.isRequired,
  };

  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    // Avoit to call function inside the render, it is better to do like this way inside the componentDidMount
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  // Function handleAddProduct receives the product as argument
  // Every component connected to redux receives a property called "this.props.dispatch"
  // it basically works to do actions to redux

  handleAddProduct = id => {
    // changed this after mapDispatchToProps being added to the end of this module
    // const { dispatch } = this.props;
    const { addToCartRequest } = this.props;

    // changed this after mapDispatchToProps being added to the end of this module
    // dispatch(CartActions.addToCard(product));
    // Changed to support Saga
    // addToCart(product);
    addToCartRequest(id);

    // how to navigate using react router dom:
    // this.props.history.push('/cart');
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <AddToCartButton onClick={() => this.handleAddProduct(product.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {amount[product.id] || 0}
              </div>
              <span>ADD TO CART</span>
            </AddToCartButton>
          </li>
        ))}
      </ProductList>
    );
  }
}

// Proptypes
/*
"id": 1,
"title": "Tênis de Caminhada Leve Confortável",
"price": 179.9,
"image": "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg",
"amount": 1,
"priceFormatted": "R$ 179,90",
"subtotal": "R$ 179,90"
*/
// function Cart({ cart, total, removeFromCart, updateAmountRequest }) {

// Convert Redux actions to properties
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

// first argument is mapStateToProps, the second is mapDispatchToProps
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
