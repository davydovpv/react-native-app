import {
  SELECT_CURRENCY,
  SELECT_PAYMENT_TYPE
} from '.types';

export const selectCurrency = payload => ({ type: SELECT_CURRENCY, payload });
export const selectPaymentType = payload => ({ type: SELECT_PAYMENT_TYPE, payload });
