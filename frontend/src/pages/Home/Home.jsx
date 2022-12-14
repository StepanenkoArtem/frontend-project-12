import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../commonComponents/Header';
import { channelErrorSelector } from '../../store/channels/channels.selectors';
import { useCurrentUser } from '../../contexts/CurrentUser';
import Channels from './components/channels/Channels';
import Messages from './components/messages/Messages';
import ModalWindow from '../../commonComponents/ModalWindow';

const Home = () => {
  const error = useSelector(channelErrorSelector);
  const { logOut } = useCurrentUser();

  useEffect(() => {
    if (error) {
      logOut();
    }
  });

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-row">
          <Channels />
          <Messages />
          <ModalWindow />
        </div>
      </div>
    </div>
  );
};
export default Home;
