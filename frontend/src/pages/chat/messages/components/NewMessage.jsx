import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import RightArrowIcon from '../../../../icons/RightArrowIcon';
import useSocket from '../../../../hooks/useSocket';
import { addMessage } from '../../../../slices/messagesSlice';
import { useCurrentUser } from '../../../../contexts/CurrentUser';

const NewMessage = () => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { currentUser } = useCurrentUser();

  const socket = useSocket();

  useEffect(() => {
    socket.connect();
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    setIsSending(true);
    socket.emit('newMessage', { body: newMessage, channelId: 1, username: currentUser?.username }, () => {
      setNewMessage('');
      setIsSending(false);
    });
  };

  socket.on('newMessage', (args) => {
    dispatch(addMessage(args));
  });
  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={sendMessage}>
        <Form.Group controlId="formAddMessage" className="input-group">
          <Form.Control
            type="text"
            className="border-0 p-0 ps-2 form-control"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isSending}
          />
          <Button type="submit" className="btn btn-group-vertical bg-white border-0" disabled={isSending}>
            <RightArrowIcon className="text-secondary" />
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewMessage;
