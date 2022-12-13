import React, { createContext, useContext, useMemo } from 'react';

export const Chat = createContext({});

export const ChatProvider = ({ children, socket }) => {
  const {
    sendNewMessage,
    createNewChannel,
    removeChannel,
    renameChannel,
  } = socket;
  const memoizedSocket = useMemo(() => (
    {
      sendNewMessage,
      createNewChannel,
      removeChannel,
      renameChannel,
    }
  ), []);

  return (
    <Chat.Provider value={memoizedSocket}>
      {children}
    </Chat.Provider>
  );
};

export const useChat = () => useContext(Chat);
