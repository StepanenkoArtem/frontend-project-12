import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => state.messages);
  return (
    <div className="col-8 bg-info">
      <ul>
        { messages.ids.map((id) => <li key={id}>{messages.entities[id].text}</li>)}
      </ul>
    </div>
  );
};

export default Messages;
