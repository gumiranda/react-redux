import { combineReducers } from 'redux';

import cart from './cart/reducer';

// if you want to have more data (reducers) you can combine them here
export default combineReducers({
  cart,
});
