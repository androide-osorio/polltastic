import Server from 'socket.io';

/**
 * create a new web socket server
 * for handling real-time client connections
 * @return {Server}  a socket.io server
 */
export default function startServer(store) {
  const socketServer = new Server().attach(8090);

  // broadcast state changes to connected clients
  store.subscribe( () => socketServer.emit('state', store.getState().toJS()) );

  // send the current state to new clien connections
  socketServer.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());

    // listen to action events on the socket and modify the store
    socket.on('action', store.dispatch.bind(store));
  });

  return socketServer;
}
