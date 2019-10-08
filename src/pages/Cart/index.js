import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import * as CartActions from '../../store/modules/cart/actions'; // importing both functions by using *

import { Container, ProductTable, Total } from './styles';
import { formatPrice } from '../../util/format';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  console.tron.log(cart);

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    // Let Redux handle this kind of stuff:
    // if (product.amount === 1) {
    // removeFromCart(product.id);
    // } else {
    updateAmountRequest(product.id, product.amount - 1);
    // }
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUCT</th>
            <th>QTY</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finish order</button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
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
Cart.propTypes = {
  cart: PropTypes.arrayOf({
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      priceFormatted: PropTypes.string,
      subtotal: PropTypes.string,
    }),
  }).isRequired,
  total: PropTypes.string.isRequired,
  removeFromCart: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  updateAmountRequest: PropTypes.shape({
    id: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

// Convert Redux actions to properties
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

// This function converts states to properties
const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  // Reduce is used when you want to take a single array and reduce to single value
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
