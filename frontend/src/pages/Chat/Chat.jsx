import React from 'react';
import Messages from './components/messages/Messages';
import Channels from './components/channels/Channels';
import ModalWindow from '../../commonComponents/ModalWindow';

const Chat = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-row">
      <Channels />
      <Messages />
      <ModalWindow />
    </div>
  </div>
);

export default Chat;
