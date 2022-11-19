import React, {
  createContext, useMemo, useState, useContext,
} from 'react';
import axios from 'axios';
import ApiPaths from '../config/ApiPaths';

export const CurrentUserContext = createContext({
  currentUser: null,
  logIn: () => {},
  logOut: () => {},
  signUp: () => {},
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const setCurrentSession = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    setCurrentUser({ username: data.username });
  };

  const logIn = async ({ password, username }) => {
    const body = { password, username };
    const config = { responseType: 'json' };
    const { data } = await axios.post(ApiPaths.login, body, config);
    setCurrentSession(data);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setCurrentUser(null);
  };

  const signUp = async ({ password, username }) => {
    const body = { password, username };
    const config = { responseType: 'json' };
    const { data } = await axios.post(ApiPaths.signUp, body, config);
    setCurrentSession(data);
  };

  const memoizedUserContext = useMemo(
    () => ({
      currentUser, logIn, logOut, signUp,
    }),
    [currentUser],
  );

  return (
    <CurrentUserContext.Provider value={memoizedUserContext}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
