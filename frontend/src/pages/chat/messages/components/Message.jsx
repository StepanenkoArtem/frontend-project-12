import React from 'react';

const Message = ({ message }) => {
  const { username, body } = message;

  return (
    <div>
      <span className="px-2 fw-bold">
        {username}
        :
      </span>
      <span>{body}</span>
    </div>
  );
};

export default Message;
