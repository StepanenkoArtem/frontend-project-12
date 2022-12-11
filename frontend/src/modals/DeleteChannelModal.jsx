import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useChat } from '../contexts/Chat';
import { deletedChannelIdSelector } from '../store/ui/ui.selectors';
import { closeModal } from '../store/modal/modal.slice';

const DeleteChannelModal = () => {
  const deletedChannelId = useSelector(deletedChannelIdSelector);
  const { removeChannel } = useChat();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeModal());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    close();
    removeChannel(deletedChannelId);
  };

  return (
    <Modal show>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>{t('cancel')}</Button>
          <Button variant="danger" type="submit" autoFocus>{t('channels.removeChannel')}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default DeleteChannelModal;
