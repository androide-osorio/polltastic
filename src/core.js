/*
 * Core application logic
 */
import { List, Map } from 'immutable';

// initial app state
export const INITIAL_STATE = new Map();

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
 * determine the winner of the provided vote tally.
 *
 * @param  {Map} vote the current entries under vote
 * @return {string|Array}  the vote's winner or an array of the entries if it's a tie
 */
function getWinners(vote) {
  if(!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  if      (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else                      return [a, b];
}

/**
 * extracts the next two entries for vote
 * e.g: the first two entries in the list.
 * @param  {Immutable.Map}   state the application's current state
 * @return {Immutable.Map}         modified state
 */
export function next(state) {
  const winners = getWinners(state.get('vote'));
  const entries = state.get('entries').concat(winners);

  if(entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  }

  return state.merge({
    vote: new Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  });
}

/**
 * Perform a vote on the specified entry.
 * This method creates a new property in the 'vote'
 * property on the state, and increments the vote count
 * of the specified entry (creates it if it does not exists).
 *
 * @param  {Map}    state the application state.
 * @param  {string} entry the netry to vote on
 * @return {Map}       the updated state
 */
export function vote(state, entry) {
  return state.updateIn(['vote', 'tally', entry], 0, tally => tally + 1);
}
