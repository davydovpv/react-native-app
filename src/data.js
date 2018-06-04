import C from './constants';
import { user, wallet } from './initialState.json';

const data = {
  ...user,
  ...wallet
};

export default data;
