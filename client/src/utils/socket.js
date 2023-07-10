import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://10.35.0.70:4001';

export const socket = io(URL, { autoConnect: true });