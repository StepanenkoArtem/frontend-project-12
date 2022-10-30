import React from 'react';
import Messages from './messages/Messages';
import Channels from './channels/Channels';

const Chat = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-row">
      <Channels />
      <Messages />
    </div>
  </div>
);

export default Chat;
