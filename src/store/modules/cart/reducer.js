import { produce } from 'immer'; // aid to manage states

// Every reducer receives two argments: state and action
// the default value was defined as an empty array "state = []"
export default function cart(state = [], action) {
  switch (action.type) {
    // case '@cart/ADD':
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);

        /* Moved this block to Saga
        // verify if the products already exist
        const productIndex = draft.findIndex(p => p.id === action.product.id);

        // if exist add one to amount
        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({
            ...action.product,
            amount: 1,
          });
        }
        */
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        // verify if the products already exist
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      /* Moved to Saga
      if (action.amount <= 0) {
        return state;
      }
      */
      return produce(state, draft => {
        // verify if the products already exist
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }

    /*
    This is how it was manage before immer
      return [
        ...state,
        {
          ...action.product,
          amount: 1,
        },
      ];
    */
    default:
      return state;
  }
}
