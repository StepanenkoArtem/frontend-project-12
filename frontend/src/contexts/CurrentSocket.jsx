import React, {
  createContext, useContext, useEffect, useMemo,
} from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/messages/messages.slice';
import { addChannel, deleteChannel, updateChannel } from '../store/channels/channels.slice';
import { setAlert } from '../store/ui/ui.slice';
import { ALERT_TYPES } from '../config/constants';

export const CurrentSocket = createContext({
  socket: {},
});

export const CurrentSocketProvider = ({ children }) => {
  const token = window.localStorage.getItem('token');
  const dispatch = useDispatch();

  const socket = io(
    'ws://localhost:5001',
    {
      transports: ['websocket', 'polling'],
      path: '',
      auth: { token },
      timeout: 10000,
    },
  );

  useEffect(() => {
    socket.connect();
  }, [socket]);

  const memoizedSocket = useMemo(() => (
    { socket }), [socket]);

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(deleteChannel(id));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(updateChannel(channel));
  });

  socket.on('connect_error', (reason) => {
    dispatch(setAlert({ type: ALERT_TYPES.ERROR, message: reason }));
  });

  socket.on();

  return (
    <CurrentSocket.Provider value={memoizedSocket}>
      {children}
    </CurrentSocket.Provider>
  );
};

export const useCurrentSocket = () => useContext(CurrentSocket);
