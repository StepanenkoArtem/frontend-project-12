import React, { createContext, useContext, useMemo } from 'react';

export const Chat = createContext({});

export const ChatProvider = ({ children, socket }) => {
  const memoizedSocket = useMemo(() => (
    { ...socket }
  ), [socket]);

  return (
    <Chat.Provider value={memoizedSocket}>
      {children}
    </Chat.Provider>
  );
};

export const useChat = () => useContext(Chat);
