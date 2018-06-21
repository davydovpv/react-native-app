//import C from './constants';
import { user, wallet, rates } from './initialState.json';

const data = {
  ...user,
  ...wallet,
  ...rates
};

export default data;
