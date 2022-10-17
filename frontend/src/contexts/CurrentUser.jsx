import React, {
  createContext, useMemo, useState, useContext,
} from 'react';

export const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const CurrentUserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const memoizedUserContext = useMemo(
    () => ({ loggedIn, setLoggedIn }),
    [loggedIn],
  );

  return (
    <CurrentUserContext.Provider value={memoizedUserContext}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
