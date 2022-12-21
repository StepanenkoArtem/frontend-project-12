import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectMessagesByChannelId } from '../../../../../store/messages/messages.slice';
import Message from './Message';
import { currentChannelSelector } from '../../../../../store/channels/channels.selectors';

const Conversation = () => {
  const currentChannel = useSelector(currentChannelSelector);
  const messages = useSelector(selectMessagesByChannelId(currentChannel?.id));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  return (
    <div className="chat-messages overflow-auto px-5" id="message-box">
      {messages.map((m) => <Message message={m} key={m.id} />)}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Conversation;
