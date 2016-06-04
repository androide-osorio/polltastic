/*
 * Core application logic
 */
import { List, Map } from 'immutable';

/**
 * set the entries of the app's state
 * @param {Immutable.Map}  state   the application's current state
 * @param {Immutable.List} entries the entries to include in the state
 * @return {Immutable.Map}         the new state
 */
export function setEntries(state, entries = []) {
  return state.set('entries', new List(entries));
}

/**
 * extracts the next two entries for vote
 * e.g: the first two entries in the list.
 * @param  {Immutable.Map}   state the application's current state
 * @return {Immutable.Map}         modified state
 */
export function next(state) {
  const entries = state.get('entries');

  return state.merge({
    vote: new Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  });
}
