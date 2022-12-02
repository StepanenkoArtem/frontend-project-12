import React, {
  createContext, useContext, useEffect, useMemo,
} from 'react';

import { useDispatch } from 'react-redux';
import { addMessage } from '../store/messages/messages.slice';
import {
  deleteChannel,
  updateChannel,
  addChannel,
} from '../store/channels/channels.slice';
import { setAlert } from '../store/ui/ui.slice';
import { ALERT_TYPES } from '../config/constants';

export const Chat = createContext({
  socket: {},
});

export const ChatProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();
  }, [socket]);

  const createNewChannel = async (channelName) => {
    await socket.emit('newChannel', { name: channelName });
  };

  const sendNewMessage = async (message, channelId, username) => {
    await socket.emit('newMessage', { body: message, channelId, username });
  };

  const removeChannel = async (channelId) => {
    await socket.emit('removeChannel', { id: channelId });
  };

  const renameChannel = async (channelName, channelId) => {
    await socket.emit('renameChannel', { name: channelName, id: channelId });
  };

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

  const memoizedSocket = useMemo(() => (
    {
      sendNewMessage,
      createNewChannel,
      removeChannel,
      renameChannel,
    }), [socket, sendNewMessage, createNewChannel, removeChannel, renameChannel]);

  return (
    <Chat.Provider value={memoizedSocket}>
      {children}
    </Chat.Provider>
  );
};

export const useChat = () => useContext(Chat);
