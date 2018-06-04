import {
  SELECT_CURRENCY,
  SELECT_PAYMENT_TYPE
} from '../actions/types';

const INITIAL_STATE = {
  selectedCurrency: 'USD',
  selectedPaymentType:'BTC'
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SELECT_CURRENCY: {
      return {
        ...state,
        selectedCurrency: action.payload
      }
    }
    case SELECT_PAYMENT_TYPE: {
      return {
        ...state,
        selectedPaymentType: action.payload
      }
    }
    default:
      return state;
  }
};
