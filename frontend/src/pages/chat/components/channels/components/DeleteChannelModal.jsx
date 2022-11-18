import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useCurrentSocket } from '../../../../../contexts/CurrentSocket';
import { removeChannel } from '../../../../../store/channels/channels.slice';
import { deletedChannelIdSelector } from '../../../../../store/ui/ui.selectors';

const DeleteChannelModal = ({ show, closeModal }) => {
  const deletedChannelId = useSelector(deletedChannelIdSelector);
  const dispatch = useDispatch();
  const { socket } = useCurrentSocket();

  const onSubmit = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(removeChannel({ deletedChannelId, socket }));
  };

  return (
    <Modal show={show} onClick={closeModal}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Deleted this channel</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          <Button variant="primary" type="submit" autoFocus>Remove channel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default DeleteChannelModal;
