import React, {
  createContext, useMemo, useState, useContext, useEffect,
} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ApiPaths from '../config/ApiPaths';
import { setAlert } from '../store/ui/ui.slice';
import { ALERT_TYPES } from '../config/constants';

export const CurrentUserContext = createContext({
  currentUser: null,
  logIn: () => {},
  logOut: () => {},
  signUp: () => {},
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();

  const setCurrentSession = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    setCurrentUser({ username: data.username });
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setCurrentUser({ username });
    }
  }, []);

  const memoizedUserContext = useMemo(
    () => {
      const logIn = async ({ password, username }) => {
        const body = { password, username };
        const config = { responseType: 'json' };

        try {
          const { data } = await axios.post(ApiPaths.login, body, config);
          setCurrentSession(data);
        } catch (e) {
          if (e.response.status === 401) {
            throw e;
          }
          dispatch(setAlert({ type: ALERT_TYPES.ERROR, message: `error.${e.message}` }));
        }
      };

      const signUp = async ({ password, username }) => {
        const body = { password, username };
        const config = { responseType: 'json' };
        try {
          const { data } = await axios.post(ApiPaths.signUp, body, config);
          setCurrentSession(data);
        } catch (e) {
          if (e.response.status === 409) {
            throw e;
          }
          dispatch(setAlert({ type: ALERT_TYPES.ERROR, message: `error.${e.message}` }));
        }
      };

      return {
        currentUser, logIn, logOut, signUp,
      };
    },
    [currentUser],
  );

  return (
    <CurrentUserContext.Provider value={memoizedUserContext}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
