import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelNamesSelector } from '../../../../../store/channels/channels.selectors';
import { useChat } from '../../../../../contexts/Chat';
import useProfanity from '../../../../../hooks/useProfanity';
import channelSchema from '../../../../../validationSchemas/channel';

const AddNewChannelModal = ({ show, closeModal }) => {
  const channelNames = useSelector(channelNamesSelector);
  const { createNewChannel } = useChat();
  const { t } = useTranslation();
  const profanity = useProfanity();

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema(channelNames),
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: async ({ channelName }) => {
      closeModal();
      const sanitizedName = profanity.clean(channelName);
      await createNewChannel(sanitizedName);
      formik.resetForm();
    },
  });

  return (
    <Modal show={show}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton onClick={closeModal}>
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
            autoFocus={show}
          />
          <Form.Control.Feedback
            type="invalid"
          >
            {formik.errors.channelName}
          </Form.Control.Feedback>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>{t('cancel')}</Button>
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
