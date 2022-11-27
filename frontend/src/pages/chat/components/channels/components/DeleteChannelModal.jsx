import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCurrentSocket } from '../../../../../contexts/CurrentSocket';
import { removeChannel } from '../../../../../store/channels/channels.slice';
import { deletedChannelIdSelector } from '../../../../../store/ui/ui.selectors';

const DeleteChannelModal = ({ show, closeModal }) => {
  const deletedChannelId = useSelector(deletedChannelIdSelector);
  const dispatch = useDispatch();
  const { socket } = useCurrentSocket();
  const { t } = useTranslation();

  const onSubmit = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(removeChannel({ deletedChannelId, socket }));
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
