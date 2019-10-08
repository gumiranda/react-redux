import React, { useState, useEffect } from 'react';
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
function Home({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([]); // Replace the state, need to be done for each element in the state

  // Replace the componentDidMount
  useEffect(() => {
    // Declare an async function
    async function loadProducts() {
      const response = await api.get('products');

      // Avoit to call function inside the render, it is better to do like this way inside the componentDidMount
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    // Run the declared function
    loadProducts();
  }, []);

  // useEffect(() => {}, []) -> run only once, just like DidMount did;
  // useEffect(() => {}, [products]) -> run only when there is a change in the products;

  // Function handleAddProduct receives the product as argument
  // Every component connected to redux receives a property called "this.props.dispatch"
  // it basically works to do actions to redux

  // Only use "useCallback" hooks when the function handle some state or dynamic properties
  // handleAddProduct = id => {
  function handleAddProduct(id) {
    // const { addToCartRequest } = this.props; -> Removed after added the hooks
    addToCartRequest(id);
  }

  // render() {
  // const { products } = this.state; -> variable created in the function init
  // const { amount } = this.props; -> moved to function parameters
  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <AddToCartButton onClick={() => handleAddProduct(product.id)}>
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

Home.propTypes = {
  addToCartRequest: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  amount: PropTypes.number.isRequired,
};

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
