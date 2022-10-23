import { io } from 'socket.io-client';
import { useMemo } from 'react';

const useSocket = () => {
  const token = window.localStorage.getItem('token');
  return useMemo(() => io('ws://localhost:5001', {
    transports: ['websocket'],
    path: '',
    auth: { token },
  }), [token]);
};

export default useSocket;
