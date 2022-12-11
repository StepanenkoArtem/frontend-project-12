import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelNamesSelector } from '../store/channels/channels.selectors';
import { useChat } from '../contexts/Chat';
import useProfanity from '../hooks/useProfanity';
import channelSchema from '../validationSchemas/channel';
import { closeModal } from '../store/modal/modal.slice';

const AddNewChannelModal = () => {
  const channelNames = useSelector(channelNamesSelector);
  const { createNewChannel } = useChat();
  const { t } = useTranslation();
  const profanity = useProfanity();
  const dispatch = useDispatch();
  console.log('render add new modal');

  const close = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema(channelNames),
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: ({ channelName }) => {
      close();
      const sanitizedName = profanity.clean(channelName);
      createNewChannel(sanitizedName);
      formik.resetForm();
    },
  });

  return (
    <Modal show>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>{t('channels.createNewChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label
            className="visually-hidden"
            htmlFor="channelName"
          >
            {t('placeholders.Channel name')}
          </Form.Label>
          <Form.Control
            type="text"
            id="channelName"
            name="channelName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channelName}
            placeholder={t('placeholders.Channel name')}
            required
            isInvalid={!formik.isValid}
            autoFocus
          />
          <Form.Control.Feedback
            type="invalid"
          >
            {formik.errors.channelName}
          </Form.Control.Feedback>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>{t('cancel')}</Button>
          <Button
            variant="primary"
            type="submit"
            disabled={!formik.isValid}
            active={formik.isValid}
          >
            {t('channels.createNewChannel')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default AddNewChannelModal;
