import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useChat } from '../../../../../contexts/Chat';
import { deletedChannelIdSelector } from '../../../../../store/ui/ui.selectors';

const DeleteChannelModal = ({ show, closeModal }) => {
  const deletedChannelId = useSelector(deletedChannelIdSelector);
  const { removeChannel } = useChat();
  const { t } = useTranslation();

  const onSubmit = (e) => {
    e.preventDefault();
    closeModal();
    removeChannel(deletedChannelId);
  };

  return (
    <Modal show={show} onClick={closeModal}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>{t('cancel')}</Button>
          <Button variant="danger" type="submit" autoFocus>{t('channels.removeChannel')}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default DeleteChannelModal;
