import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchChannels } from '../slices/channelsSlice';
import { CurrentUserContext } from '../contexts/CurrentUser';
import { fetchMessages } from '../slices/messagesSlice';

const Home = () => {
  const token = localStorage.getItem('token');
  const { client } = useContext(CurrentUserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels(client));
    dispatch(fetchMessages(client));
  }, []);

  return (token
    ? (
      <div>
        <div>CHAT</div>
        <div />
      </div>
    )
    : <Navigate to="login" />
  );
};

export default Home;
