import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../../../slices/messagesSlice';
import Message from './Message';

const Conversation = () => {
  const messages = useSelector(selectors.selectAll);

  return (
    <div className="chat-messages overflow-auto px-5" id="message-box">
      {messages.map((m) => <Message message={m} key={m.id} />)}
    </div>
  );
};

export default Conversation;
