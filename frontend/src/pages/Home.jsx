import React from 'react';
import { Navigate } from 'react-router-dom';
import Chat from './chat/Chat';
import { useCurrentUser } from '../contexts/CurrentUser';
import Header from './Header';

const Home = () => {
  const { currentUser } = useCurrentUser();

  return (currentUser
    ? (
      <div className="d-flex flex-column h-100">
        <Header />
        <Chat />
      </div>
    )
    : <Navigate to="login" />
  );
};

export default Home;
