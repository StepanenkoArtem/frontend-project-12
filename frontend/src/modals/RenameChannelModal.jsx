import React, { useEffect, useRef } from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelNamesSelector } from '../store/channels/channels.selectors';
import { useChat } from '../contexts/Chat';
import {
  renamedChannelIdSelector,
} from '../store/ui/ui.selectors';
import useProfanity from '../hooks/useProfanity';
import channelSchema from '../validationSchemas/channel';
import { closeModal } from '../store/modal/modal.slice';

const RenameChannelModal = () => {
  const channelNames = useSelector(channelNamesSelector);
  const channelId = useSelector(renamedChannelIdSelector);
  const { renameChannel } = useChat();
  const { t } = useTranslation();
  const profanity = useProfanity();
  const dispatch = useDispatch();
  const input = useRef(null);

  const close = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <Modal show>
      <Formik
        initialValues={{
          channelName: '',
        }}
        onSubmit={(values, actions) => {
          close();
          renameChannel(profanity.clean(values.channelName), channelId);
          actions.resetForm();
        }}
        validateOnMount={false}
        validateOnBlur={false}
        validationSchema={channelSchema(channelNames)}
      >
        {({
          values,
          errors,
          isValid,
          handleChange,
          handleSubmit,
          handleBlur,

        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton onClick={close}>
              <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label
                className="visually-hidden"
                htmlFor="channelName"
              >
                {t('placeholders.Channel name')}
              </Form.Label>
              <Form.Control
                ref={input}
                type="text"
                id="channelName"
                name="channelName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.channelName}
                placeholder={t('placeholders.Channel name')}
                required
                isInvalid={!isValid}
              />
              <Form.Control.Feedback
                type="invalid"
              >
                {t(errors.channelName)}
              </Form.Control.Feedback>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={close}>{t('cancel')}</Button>
              <Button
                variant="primary"
                type="submit"
                disabled={!isValid}
                active={isValid}
              >
                {t('channels.renameChannel')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default RenameChannelModal;
