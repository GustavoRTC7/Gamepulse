import { io } from 'socket.io-client';

const SOCKET_URL = 'https://gamepulser.netlify.app';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket'],
  path: '/socket.io'
});

export const connectSocket = (userId: string) => {
  socket.auth = { userId };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};