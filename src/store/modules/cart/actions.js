// changed to support saga
// export function addToCart(product) {
export function addToCartRequest(id) {
  // Saga will intercept this action and them manipulate the data and call addToCartSuccess
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

export function removeFromCart(id) {
  return { type: '@cart/REMOVE', id };
}

// Splited in two for Saga
/*
export function updateAmount(id, amount) {
  return { type: '@cart/UPDATE_AMOUNT', id, amount };
}
*/

export function updateAmountRequest(id, amount) {
  return { type: '@cart/UPDATE_AMOUNT_REQUEST', id, amount };
}

export function updateAmountSuccess(id, amount) {
  return { type: '@cart/UPDATE_AMOUNT_SUCCESS', id, amount };
}
