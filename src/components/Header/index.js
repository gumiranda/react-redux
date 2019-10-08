import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

// export default function Header() {
// removed the export default in order to add connect
function Header({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>My cart</strong>
          <span>
            {cartSize} {cartSize !== 1 ? 'items' : 'item'}
          </span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}

// Proptype
Header.propTypes = {
  cartSize: PropTypes.number.isRequired,
};

// connect receives a function
export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
