// app reducer spec
import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

// describe the main reducer behavior
describe('Application Reducer', () => {
  // reducer can handle the case when the state is not provided
  it('returns an initial state if none is initially provided', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Kill Bill'] };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Kill Bill']
    }));
  });

  // reducer can handle the case where the action is not recognized
  it('returns the state unchanged when the action is not recognized', () => {
    const initialState = fromJS({ entries: [] });
    const action = { type: 'UNSUPPORTED_ACTION' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(initialState);
  });

  describe('handle Application Actions', () => {
    // reducer can handle SET_ENTRIES Action
    it('handles SET_ENTRIES', () => {
      const initialState = new Map();
      const action = { type: 'SET_ENTRIES', entries: ['Kill Bill'] };
      const nextState = reducer(initialState, action);

      expect(nextState).to.have.property('entries').that.includes('Kill Bill');
    });

    // reducer can handle Next Actions
    it('handles NEXT', () => {
      const initialState = fromJS({ entries: ['Kill Bill', 'Pulp Fiction', 'Grindhouse'] });
      const action = { type: 'NEXT' };
      const nextState = reducer(initialState, action);

      expect(nextState)
        .to.have.property('entries')
        .that.equals(List.of('Grindhouse'));
      expect(nextState)
        .to.have.deep.property('vote.pair')
        .that.includes('Kill Bill', 'Pulp Fiction');
    });

    // reducer can handle VOTE actions
    it('handles VOTE', () => {
      const initialState = fromJS({ vote: { pair: ['Kill Bill', 'Pulp Fiction'] }, entries: [] });
      const action = { type: 'VOTE', entry: 'Kill Bill' };
      const nextState = reducer(initialState, action);

      expect(nextState)
        .to.have.deep.property('vote.tally')
        .that.includes.keys('Kill Bill');
      expect(nextState)
        .to.have.deep.property(['vote', 'tally', 'Kill Bill'])
        .that.equals(1);
    });
  });
});
