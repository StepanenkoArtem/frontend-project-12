import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Messages from './components/messages/Messages';
import Channels from './components/channels/Channels';
import { initChat } from '../../store/channels/channels.slice';
import { useCurrentUser } from '../../contexts/CurrentUser';

const Chat = () => {
  const { client } = useCurrentUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadInitialData = () => {
      dispatch(initChat(client));
    };
    loadInitialData();
  }, [client, dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default Chat;
