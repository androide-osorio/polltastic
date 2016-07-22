import { Map } from 'immutable';
import { setEntries, next, vote, INITIAL_STATE } from './core';

/**
 * Application reducer that handles all of the app's actions.
 * @param  {Map}    state   a state to modify
 * @param  {Object} action  an action descriptor
 * @return {Map}            a modified app state
 */
export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return vote(state, action.entry);
  }
  return state;
}
