import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchChannels } from '../slices/channelsSlice';
import { CurrentUserContext } from '../contexts/CurrentUser';
import { fetchMessages } from '../slices/messagesSlice';
import Chat from './chat/Chat';
import Header from './Header';

const Home = () => {
  const { client } = useContext(CurrentUserContext);
  const token = window.localStorage.getItem('token');
  const dispatch = useDispatch();

  dispatch(fetchChannels(client));
  dispatch(fetchMessages(client));

  return (token
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
