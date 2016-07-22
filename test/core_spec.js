import { expect } from 'chai';
import { List, Map } from 'immutable';

import { setEntries, next, vote } from '../src/core';

// describe application logic
describe('Application Logic', () => {
  let state = null;

  //----------------------------------------------------------
  /* ---------------------------- *
   * entries modifier function
   * ---------------------------- */
  describe('#setEntries', () => {
    beforeEach(() => {
      // runs before each test in this block
      state = new Map();
    });

    // test that this reducer actually adds entries to the state
    it('adds entries to the application state', () => {
      const entries = List.of('Kill bill', 'Pulp Fiction');
      const nextState = setEntries(state, entries);

      expect(nextState).to.have.property('entries').that.equals(entries);
    });

    // test that this reducer converts mutable data structures
    // into immutable equivalents
    it('converts entries to immutable data', () => {
      const entries = ['Kill Bill', 'Pulp Fiction'];
      const nextState = setEntries(state, entries);

      expect(nextState)
        .to.have.property('entries')
        .that.is.an.instanceof(List)
        .that.equals(List.of(...entries));
    });
  });

  //---------------------------------------------------------------------------
  /* ------------------------ *
   * Vote manager function
   * ------------------------ */
  describe('#next', () => {
    beforeEach(() => {
      // set initial state here
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
      expect(nextState).to.have.property('vote').that.includes.key('pair');
      expect(nextState)
        .to.have.deep.property('vote.pair')
        .that.has.sizeOf(2)
        .and.equals(List.of('Kill Bill', 'Pulp Fiction'));
    });

    //----------------------------------------------------------
    /* ------------------------ *
     * Winners handling
     * ------------------------ */
    describe('handle vote winners', () => {
      beforeEach(() => {
        // set initial state with a predefined vote and tally
        state = new Map({
          vote: new Map({
            pair: List.of('Kill Bill', 'Pulp Fiction'),
            tally: new Map({
              'Kill Bill': 4,
              'Pulp Fiction': 2
            })
          }),
          entries: List.of('Unglorious Bastards', 'Reservoir Dogs', 'Django Unchained')
        });
      });

      // assert that the next() function correctly handles
      // the winner of a currently held vote
      it('puts the winner of current vote back to the entries list', () => {
        const nextState = next(state);

        expect(nextState).to.not.have.deep.property('vote.tally');
        expect(nextState)
          .to.have.deep.property('vote.pair')
          .that.includes('Unglorious Bastards', 'Reservoir Dogs');
        expect(nextState)
          .to.have.property('entries')
          .that.equals(List.of('Django Unchained', 'Kill Bill'));
      });

      // assert that the next() function can handle ties
      it('puts both entries from tied vote back to the entries list', () => {
        const tiedState = state.setIn(['vote', 'tally', 'Pulp Fiction'], 4);
        const nextState = next(tiedState);

        expect(nextState)
          .to.have.deep.property('vote.pair')
          .that.includes('Unglorious Bastards', 'Reservoir Dogs');
        expect(nextState)
          .to.have.property('entries')
          .that.equals(List.of('Django Unchained', 'Kill Bill', 'Pulp Fiction'));
      });

      // assert that the next() function can mark the
      // final winner of the current entry list
      it('marks winner when just one entry is left', () => {
        const noEntriesLeftState = state.set('entries', new List([]));
        const nextState = next(noEntriesLeftState);

        expect(nextState).to.have.property('winner').that.equals('Kill Bill');
      });
    });
  });

  //---------------------------------------------------------------------------
  /* ------------------------ *
   * Voting entry function
   * ------------------------ */
  describe('#vote', () => {
    beforeEach(() => {
      // set initial state here
      state = new Map({
        vote: new Map({
          pair: List.of('Kill Bill', 'Pulp Fiction')
        }),
        entries: List.of('Reservoir Dogs', 'Unglorious Bastards')
      });
    });

    // create a new tally for the currently voted entries
    // and manage the votes accordingly
    it('creates a tally for the voted entry', () => {
      const nextState = vote(state, 'Kill Bill');

      expect(nextState)
        .to.have.deep.property('vote.tally')
        .that.has.property('Kill Bill')
        .and.equals(1);
    });

    // increment the votes on a specified entry in the tally
    it('adds to existing tally for the voted entry', () => {
      const stateWithTally = state.setIn(['vote', 'tally', 'Kill Bill'], 4)
        .setIn(['vote', 'tally', 'Pulp Fiction'], 2);

      const nextState = vote(stateWithTally, 'Kill Bill');

      expect(nextState)
        .to.have.deep.property('vote.tally')
        .that.has.property('Kill Bill')
        .and.equals(5);
    });
  });
});
