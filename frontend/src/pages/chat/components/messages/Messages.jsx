import React from 'react';
import ConversationHeader from './components/ConversationHeader';
import Conversation from './components/Conversation';
import NewMessage from './components/NewMessage';

const Messages = () => (
  <div className="col-8 col-md-9 col-lg-10 p-0 h-100">
    <div className="d-flex flex-column h-100">
      <ConversationHeader />
      <Conversation />
      <NewMessage />
    </div>
  </div>
);

export default Messages;
