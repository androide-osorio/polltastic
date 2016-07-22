import makeStore from './src/store';
import startServer from './src/server';

/**
 * create and export the main application store
 */
export const store = makeStore();

// start a web sockets server
const socketServer = startServer();
