import { io, Socket } from 'socket.io-client';

const socket: Socket = io('https://library-backend-y0o3.onrender.com');

export { socket };
