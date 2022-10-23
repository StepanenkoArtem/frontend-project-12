import React from 'react';
import { useDispatch } from 'react-redux';
import ConversationHeader from './components/ConversationHeader';
import Conversation from './components/Conversation';
import NewMessage from './components/NewMessage';
import useClient from '../../../hooks/useClient';
import { fetchMessages } from '../../../slices/messagesSlice';

const Messages = () => {
  const client = useClient();
  const dispatch = useDispatch();

  dispatch(fetchMessages(client));
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ConversationHeader />
        <Conversation />
        <NewMessage />
      </div>
    </div>
  );
};

export default Messages;
