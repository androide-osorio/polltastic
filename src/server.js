import Server from 'socket.io';

/**
 * create a new web socket server
 * for handling real-time client connections
 * @return {Server}  a socket.io server
 */
export default function startServer() {
  return new Server().attach(8090);
}
