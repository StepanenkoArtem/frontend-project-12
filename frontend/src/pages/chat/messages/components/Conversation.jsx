import React from 'react';
import { useSelector } from 'react-redux';

const Conversation = () => {
  const messages = useSelector((state) => state.messages);

  return (
    <div className="chat-messages overflow-auto px-5" id="message-box">
      {messages.ids.map((id) => (
        <div key={id}>{messages.entities[id].text}</div>))}
    </div>
  );
};

export default Conversation;
