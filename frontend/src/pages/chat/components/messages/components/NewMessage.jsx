import React, { useState, useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import RightArrowIcon from '../../../../../icons/RightArrowIcon';
import { useCurrentUser } from '../../../../../contexts/CurrentUser';
import { useCurrentSocket } from '../../../../../contexts/CurrentSocket';
import { activeChannelIdSelector } from '../../../../../store/ui/ui.selectors';
import useProfanity from '../../../../../hooks/useProfanity';

const NewMessage = () => {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { currentUser } = useCurrentUser();
  const activeChannelId = useSelector(activeChannelIdSelector);
  const profanity = useProfanity();
  const { t } = useTranslation();
  const newMessageInput = useRef(null);

  const { socket } = useCurrentSocket();

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return;
    }
    setIsSending(true);
    socket.emit('newMessage', { body: profanity.clean(newMessage), channelId: activeChannelId, username: currentUser?.username }, () => {
      setNewMessage('');
      setIsSending(false);
    });
  };

  useEffect(() => {
    if (newMessageInput) {
      newMessageInput.current.focus();
    }
  }, [activeChannelId, isSending]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={sendMessage}>
        <Form.Group controlId="formAddMessage" className="input-group">
          <Form.Control
            ref={newMessageInput}
            type="text"
            className="border-0 p-0 ps-2 form-control"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isSending}
            aria-label={t('conversation.New message')}
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
