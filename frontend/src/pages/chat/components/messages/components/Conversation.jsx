import React from 'react';
import { useSelector } from 'react-redux';
import { selectMessagesByChannelId } from '../../../../../slices/messagesSlice';
import Message from './Message';
import { useCurrentUser } from '../../../../../contexts/CurrentUser';

const Conversation = () => {
  const { activeChannelId } = useCurrentUser();
  const messages = useSelector((state) => selectMessagesByChannelId(state, activeChannelId));

  return (
    <div className="chat-messages overflow-auto px-5" id="message-box">
      {messages.map((m) => <Message message={m} key={m.id} />)}
    </div>
  );
};

export default Conversation;
