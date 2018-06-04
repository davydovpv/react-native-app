import { combineReducers } from 'redux'
import user from './user';
import buyCoinValues from './buycoin';

export default combineReducers({
  user, buyCoinValues
})
