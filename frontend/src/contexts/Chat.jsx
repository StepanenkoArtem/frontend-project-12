import React, { createContext, useContext, useMemo } from 'react';

import {
  sendNewMessage, createNewChannel, removeChannel, renameChannel,
} from '../socket';

export const Chat = createContext({});

export const ChatProvider = ({ children }) => {
  const memoizedSocket = useMemo(() => (
    {
      sendNewMessage,
      createNewChannel,
      removeChannel,
      renameChannel,
    }
  ), [
    sendNewMessage,
    createNewChannel,
    removeChannel,
    renameChannel,
  ]);

  return (
    <Chat.Provider value={memoizedSocket}>
      {children}
    </Chat.Provider>
  );
};

export const useChat = () => useContext(Chat);
