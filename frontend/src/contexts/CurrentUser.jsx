import axios from 'axios';
import React, {
  createContext, useMemo, useState, useContext,
} from 'react';

export const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const CurrentUserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const client = axios.create();
  const token = localStorage.getItem('token');
  client.defaults.headers.common.Authorization = `Bearer ${token}`;

  const memoizedUserContext = useMemo(
    () => ({ loggedIn, setLoggedIn, client }),
    [loggedIn, client],
  );

  return (
    <CurrentUserContext.Provider value={memoizedUserContext}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
