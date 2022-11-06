import React, {
  createContext, useContext, useMemo,
} from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/messages/messages.slice';
import { addChannel } from '../store/channels/channels.slice';

export const CurrentSocket = createContext({
  socket: {},
});

export const CurrentSocketProvider = ({ children }) => {
  const token = window.localStorage.getItem('token');
  const dispatch = useDispatch();

  const socket = io(
    'ws://localhost:5001',
    {
      transports: ['websocket'],
      path: '',
      auth: { token },
    },
  );

  const memoizedSocket = useMemo(() => (
    { socket }), [socket]);

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  return (
    <CurrentSocket.Provider value={memoizedSocket}>
      {children}
    </CurrentSocket.Provider>
  );
};

export const useCurrentSocket = () => useContext(CurrentSocket);
