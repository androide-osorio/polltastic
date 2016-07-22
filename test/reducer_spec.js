// app reducer spec
import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

// describe the main reducer behavior
describe('Application Reducer', () => {
  // reducer can handle SET_ENTRIES Action
  it('handles SET_ENTRIES action', () => {
    const initialState = new Map();
    const action = { type: 'SET_ENTRIES', entries: ['Kill Bill'] };
    const nextState = reducer(initialState, action);

    expect(nextState).to.have.property('entries').that.includes('Kill Bill');
  });

  // reducer can handle Next Actions
  it('handles NEXT action', () => {
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
  it('handles VOTE action', () => {
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
