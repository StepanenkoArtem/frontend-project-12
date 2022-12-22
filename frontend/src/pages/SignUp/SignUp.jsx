import React, { useRef, useState } from 'react';
import {
  Button, Card, Col, Container, Form, Overlay, Row, FloatingLabel,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '../../contexts/CurrentUser';
import signUpSchema from '../../validationSchemas/signup';
import Header from '../../commonComponents/Header';
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../../config/constants';

const SignUp = () => {
  const errorTarget = useRef(null);
  const { signUp } = useCurrentUser();
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSignUp = async ({ password, username }) => {
    try {
      await signUp({ password, username });
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container fluid className="h-100">
        <Row className="h-100 justify-content-center align-content-center">
          <Col className="col-12 col-md-8">
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Formik
                  initialValues={{
                    username: '',
                    password: '',
                    passwordConfirmation: '',
                  }}
                  validateOnMount={false}
                  validateOnBlur
                  onSubmit={handleSignUp}
                  validationSchema={signUpSchema}
                >
                  {({
                    errors, values, handleSubmit, handleChange, handleBlur,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <FloatingLabel
                          label={t('label.username')}
                          className="mb-3 text-muted"
                          htmlFor="username"
                          controlId="username"
                        >
                          <Form.Control
                            placeholder={t('placeholders.username')}
                            name="username"
                            autoComplete="username"
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.username}
                            value={values.username.trim()}
                          />
                          <Form.Control.Feedback
                            tooltip
                            type="invalid"
                          >
                            {t(
                              errors.username,
                              { min: USERNAME_MIN_LENGTH, max: USERNAME_MAX_LENGTH },
                            )}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <FloatingLabel
                          label={t('placeholders.password')}
                          className="mb-3 text-muted"
                          controlId="password"
                        >
                          <Form.Control
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('placeholders.password')}
                            value={values.password.trim()}
                            required
                            isInvalid={!!errors.password}
                          />
                          <Form.Control.Feedback
                            tooltip
                            type="invalid"
                          >
                            {t(errors.password, { min: PASSWORD_MIN_LENGTH })}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <FloatingLabel
                          label={t('placeholders.passwordConfirmation')}
                          className="mb-3 text-muted"
                          controlId="passwordConfirmation"
                        >
                          <Form.Control
                            type="password"
                            name="passwordConfirmation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={t('placeholders.passwordConfirmation')}
                            value={values.passwordConfirmation.trim()}
                            ref={errorTarget}
                            required
                            isInvalid={!!errors.passwordConfirmation}
                          />
                          <Form.Control.Feedback
                            tooltip
                            type="invalid"
                          >
                            {t(errors?.passwordConfirmation)}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                      {error && (
                      <Overlay
                        target={errorTarget.current}
                        show={!!error}
                        placement="bottom-start"
                      >
                        <div
                          style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(255, 100, 100, 0.85)',
                            padding: '2px 10px',
                            color: 'white',
                            borderRadius: 3,
                          }}
                        >
                          {t(`error.${error}`)}
                        </div>
                      </Overlay>
                      )}
                      <Button variant="primary" type="submit">
                        {t('registration')}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
              <Card.Footer>
                <Link to="/login">{t('signIn')}</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
