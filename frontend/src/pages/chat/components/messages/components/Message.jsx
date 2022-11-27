import React from 'react';

const Message = ({ message }) => {
  const { username, body } = message;

  return (
    <div className="text-break">
      <b>
        {username}
        :&nbsp;
      </b>
      {body}
    </div>
  );
};

export default Message;
