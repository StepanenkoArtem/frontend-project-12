import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import channelNamesSelector from '../../../../../store/channels/channels.selectors';
import { createNewChannel } from '../../../../../store/channels/channels.slice';
import { useCurrentSocket } from '../../../../../contexts/CurrentSocket';

const AddNewChannelModal = ({ show, closeModal }) => {
  const channelNames = useSelector(channelNamesSelector);
  const dispatch = useDispatch();
  const { socket } = useCurrentSocket();

  const channelSchema = Yup.object({
    channelName: Yup.string().required().ensure().notOneOf(channelNames),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema,
    validateOnBlur: true,
    onSubmit: ({ channelName }) => {
      closeModal();
      dispatch(createNewChannel({ channelName, socket }));
      formik.resetForm();
    },
  });

  return (
    <Modal show={show}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Create new channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            autoFocus
            id="channelName"
            name="channelName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channelName}
            placeholder="Channel Name"
            required
            isInvalid={!formik.isValid}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          <Button variant="primary" type="submit" disabled={!formik.isValid} active={formik.isValid}>Add channel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default AddNewChannelModal;
