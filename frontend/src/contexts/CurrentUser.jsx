import React, {
  createContext, useState, useContext, useMemo, useCallback,
} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ApiPaths from '../config/ApiPaths';
import { setAlert } from '../store/ui/ui.slice';
import { ALERT_TYPES } from '../config/constants';

export const CurrentUserContext = createContext({
  currentUser: null,
  client: {},
  logIn: () => {},
  logOut: () => {},
  signUp: () => {},
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.token && localStorage.username
      ? { username: localStorage.username, token: localStorage.token }
      : null,
  );

  const client = axios.create();
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;

  const dispatch = useDispatch();

  const setCurrentSession = (data) => {
    const { token, username } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setCurrentUser({ username, token });
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    setCurrentUser(null);
  };

  const logIn = useCallback(async ({ password, username }) => {
    const body = { password, username };

    try {
      const { data } = await axios.post(ApiPaths.login, body);
      setCurrentSession(data);
    } catch (e) {
      if (e.response.status === 401) {
        throw e;
      }
      dispatch(setAlert({ type: ALERT_TYPES.ERROR, message: `error.${e.message}` }));
    }
  }, [dispatch]);

  const signUp = useCallback(async ({ password, username }) => {
    const body = { password, username };
    try {
      const { data } = await axios.post(ApiPaths.signUp, body);
      setCurrentSession(data);
    } catch (e) {
      if (e.response.status === 409) {
        throw e;
      }
      dispatch(setAlert({ type: ALERT_TYPES.ERROR, message: `error.${e.message}` }));
    }
  }, [dispatch]);

  const context = useMemo(() => ({
    currentUser, client, logIn, logOut, signUp,
  }), [currentUser, client, logIn, signUp]);

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
