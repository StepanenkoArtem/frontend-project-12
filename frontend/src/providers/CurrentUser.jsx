import React, { useMemo, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUser';

const CurrentUser = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const memoizedContext = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
  return (
    <CurrentUserContext.Provider value={memoizedContext}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUser;
