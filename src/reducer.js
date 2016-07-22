import { setEntries, next, vote, INITIAL_STATE } from './core';

/**
 * Application reducer that handles all of the app's actions.
 * it is called a reducer because it fullfills the contract
 * of a reduce callback funtion (of arrays)
 * @param  {Map}    state   a state to modify
 * @param  {Object} action  an action descriptor
 * @return {Map}            a modified app state
 */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_ENTRIES':
    return setEntries(state, action.entries);
  case 'NEXT':
    return next(state);
  case 'VOTE':
    return state.update('vote', voteState => vote(voteState, action.entry));
  }
  return state;
}
