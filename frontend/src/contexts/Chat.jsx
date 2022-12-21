import React, { createContext, useContext, useMemo } from 'react';

export const Chat = createContext({});

export const ChatProvider = ({ children, socket }) => {
  const memoized = useMemo(() => (
    { ...socket }
  ), [socket]);

  return (
    <Chat.Provider value={memoized}>
      {children}
    </Chat.Provider>
  );
};

export const useChat = () => useContext(Chat);
