import React from 'react';
import { useSelector } from 'react-redux';
import Chat from '../Chat/Chat';
import Header from '../../commonComponents/Header';
import { channelErrorSelector } from '../../store/channels/channels.selectors';

const Home = () => {
  const error = useSelector(channelErrorSelector);
  console.log(error);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Chat />
    </div>
  );
};

export default Home;
