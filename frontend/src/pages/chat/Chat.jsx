import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Messages from './components/messages/Messages';
import Channels from './components/channels/Channels';
import useClient from '../../hooks/useClient';
import ApiPaths from '../../config/ApiPaths';
import { addMessages } from '../../store/messages/messages.slice';
import { addChannels } from '../../store/channels/channels.slice';

const Chat = () => {
  const client = useClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadInitialData = async () => {
      const { data } = await client.get(ApiPaths.data);
      dispatch(addMessages(data.messages));
      dispatch(addChannels(data.channels));
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
