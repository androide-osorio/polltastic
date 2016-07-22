import { List, Map } from 'immutable';
import { expect } from 'chai';

import makeStore from '../src/store';

/**
 * Store specs
 */
describe('Application Store', () => {
  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(new Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Kill Bill', 'Pulp Fiction']
    });

    expect(store.getState())
      .to.have.property('entries')
      .that.equals(List.of('Kill Bill', 'Pulp Fiction'));
  });
});
