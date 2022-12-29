/* eslint-disable default-case */
// eslint-disable-next-line no-unused-vars
import { actionChannel } from '@redux-saga/core/effects';
import produce from 'immer';


const INITIAL_AMOUNT = {
  amount: [],
}

const INITIAL_CART = {
  cart: []
}


const reducer = produce((draft, action) => {
  switch (action.type) {

    case '@cart/addSuccess':
      const {product} = action;
      draft.cart[product[0].id] = product;
      break;

    case '@cart/removeItem':
      draft.cart.splice(draft.cart.indexOf(draft.cart[action.id]), 1);  
      break;

    case '@cart/clear':
      draft.cart.splice(0, draft.cart.length);
  }
}, INITIAL_CART)


const reducerAmountCart = produce((draft, action) => {
  switch (action.type) {

    case '@cart/amountSuccess':
      if(typeof draft.amount[action.id] === 'undefined')
        draft.amount[action.id] = 1;
      else
        draft.amount[action.id]++;
      break;

    case '@cart/incremented':
        draft.amount[action.id]++;
      break;

    case '@cart/decremented':
      if(draft.amount[action.id] > 0)
        draft.amount[action.id]--;
      break;
      
    case '@cart/removeAmount':
      delete draft.amount[action.id];
      break;

    case '@cart/clearAmount':
      draft.amount.splice(0, draft.amount.length);
  }
}, INITIAL_AMOUNT)

export {reducer, reducerAmountCart};