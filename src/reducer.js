import { Map } from 'immutable';
import { next, vote, setEntries } from './core';

/**
 * Application reducer that handles all of the app's actions.
 * @param  {Map}    state   a state to modify
 * @param  {Object} action  an action descriptor
 * @return {Map}            a modified app state
 */
export default function reducer(state, action) {
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
  }
}
