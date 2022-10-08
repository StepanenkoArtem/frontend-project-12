import React from 'react';
import Messages from './components/Messages';
import Channels from './components/Channels';

const Chat = () => (
  <div className="container">
    <div className="row ">
      <div className="col">
        <Channels />
        <Messages />
      </div>
    </div>
  </div>
);

export default Chat;
