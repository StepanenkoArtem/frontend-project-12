import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import channelNamesSelector from '../../../../../store/channels/channels.selectors';
import { useCurrentSocket } from '../../../../../contexts/CurrentSocket';
import { renameChannel } from '../../../../../store/channels/channels.slice';
import {
  renamedChannelIdSelector,
} from '../../../../../store/ui/ui.selectors';
import useProfanity from '../../../../../hooks/useProfanity';
import channelSchema from '../../../../../validationSchemas/channel';

const RenameChannelModal = ({ show, closeModal }) => {
  const channelNames = useSelector(channelNamesSelector);
  const channelId = useSelector(renamedChannelIdSelector);
  const dispatch = useDispatch();
  const { socket } = useCurrentSocket();
  const { t } = useTranslation();
  const profanity = useProfanity();

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema(channelNames),
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: ({ channelName }) => {
      closeModal();
      dispatch(renameChannel({ channelName: profanity.clean(channelName), channelId, socket }));
      formik.resetForm();
    },
  });

  return (
    <Modal show={show}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          <Button
            variant="primary"
            type="submit"
            disabled={!formik.isValid}
            active={formik.isValid}
          >
            {t('channels.renameChannel')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default RenameChannelModal;
