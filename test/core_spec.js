import { expect } from 'chai';
import { List, Map } from 'immutable';

import { setEntries, next } from '../src/core';

// describe application logic
describe('Application Logic', () => {
  let state = null;

  describe('setEntries', () => {
    beforeEach(() => {
      // runs before each test in this block
      state = new Map();
    });

    // test that this reducer actually adds entries to the state
    it('adds entries to the application state', () => {
      const entries = List.of('Kill bill', 'Pulp Fiction');
      const nextState = setEntries(state, entries);

      expect(nextState).to.have.property('entries');
      expect(nextState.get('entries')).to.equal(entries);
    });

    // test that this reducer converts mutable data structures
    // into immutable equivalents
    it('converts entries to immutable data', () => {
      const entries = ['Kill Bill', 'Pulp Fiction'];
      const nextState = setEntries(state, entries);

      expect(nextState.get('entries')).to.be.an.instanceof(List);
      expect(nextState.get('entries')).to.equal(List.of(...entries));
    });
  });

  describe('next', () => {
    beforeEach(() => {
      state = new Map({
        entries: List.of('Kill Bill', 'Pulp Fiction', 'Reservoir Dogs')
      });
    });

    // the next vote reducer should take the next two entries
    // in the state and put them under vote. it should also remove
    // those voting entries from the 'entries' map in the state.
    it('takes the next two entries under vote', () => {
      const nextState = next(state);

      expect(nextState).to.include.key('vote');
      expect(nextState.get('vote')).to.include.key('pair');
      expect(nextState.get('vote').get('pair')).to.have.sizeOf(2);
      expect(nextState.get('vote').get('pair')).to.equal(List.of('Kill Bill', 'Pulp Fiction'));
    });
  });
});
