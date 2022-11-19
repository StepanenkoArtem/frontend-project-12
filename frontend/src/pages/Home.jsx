import React from 'react';
import { Navigate } from 'react-router-dom';
import Chat from './chat/Chat';
import Header from './Header';
import { useCurrentUser } from '../contexts/CurrentUser';

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
