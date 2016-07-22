import { createStore } from 'redux';
import reducer from './reducer';

/**
 * create a new redux store for managing application this.this.state
 * @return {redux.Store}  a new redux store
 */
export default function makeStore() {
  return createStore(reducer);
}
