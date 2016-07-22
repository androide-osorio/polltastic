// app reducer spec
import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

// describe the main reducer behavior
describe('Application Reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = new Map();
    const action = { type: 'SET_ENTRIES', entries: ['Kill Bill'] };
    const nextState = reducer(initialState, action);

    expect(nextState).to.have.property('entries').that.includes('Kill Bill');
  });
});
