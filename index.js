import makeStore from './src/store';
import startServer from './src/server';

/**
 * create and export the main application store
 */
export const store = makeStore();

// start a web sockets server
startServer(store);

// load mock info
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./data/mock_entries.json')
});
