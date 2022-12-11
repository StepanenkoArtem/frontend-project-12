import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../Chat/Chat';
import Header from '../../commonComponents/Header';
import { channelErrorSelector } from '../../store/channels/channels.selectors';
import InitSpinner from '../../commonComponents/InitSpinner';
import { initChat } from '../../store/channels/channels.slice';
import { useCurrentUser } from '../../contexts/CurrentUser';

const Home = () => {
  const error = useSelector(channelErrorSelector);
  const { client } = useCurrentUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadInitialData = () => {
      dispatch(initChat(client));
    };
    loadInitialData();
  }, [client, dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      {error ? <InitSpinner /> : <Chat />}
    </div>
  );
};

export default Home;
