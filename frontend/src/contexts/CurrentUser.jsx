import React, {
  createContext, useMemo, useState, useContext,
} from 'react';

export const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [activeChannelId, setActiveChannelId] = useState(null);

  const memoizedUserContext = useMemo(
    () => ({
      currentUser, setCurrentUser, activeChannelId, setActiveChannelId,
    }),
    [currentUser, activeChannelId],
  );

  return (
    <CurrentUserContext.Provider value={memoizedUserContext}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
