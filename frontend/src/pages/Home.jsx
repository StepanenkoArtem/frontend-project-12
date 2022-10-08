import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchChannels } from '../slices/channelsSlice';
import { CurrentUserContext } from '../contexts/CurrentUser';
import { fetchMessages } from '../slices/messagesSlice';
import Chat from './chat/Chat';

const Home = () => {
  const { client } = useContext(CurrentUserContext);
  const token = window.localStorage.getItem('token');
  const dispatch = useDispatch();

  dispatch(fetchChannels(client));
  dispatch(fetchMessages(client));

  return (token
    ? <Chat />
    : <Navigate to="login" />
  );
};

export default Home;
