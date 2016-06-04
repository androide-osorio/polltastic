import { expect } from 'chai';
import { List, Map } from 'immutable';

import { setEntries } from '../src/core';

// describe application logic
describe('Application Logic', () => {
  describe('setEntries', () => {
    let state = null;

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
});
