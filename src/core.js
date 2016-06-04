/*
 * Core application logic
 */
import { List } from 'immutable';

/**
 * set the entries of the app's state
 * @param {Immutable.Map}  state   the application's current state
 * @param {Immutable.List} entries the entries to include in the state
 * @return {Immutable.Map}         the new state
 */
export function setEntries(state, entries = []) {
  return state.set('entries', new List(entries));
}
