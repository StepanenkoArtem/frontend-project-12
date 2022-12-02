import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Card, Col, Container, Form, Overlay, Row, FloatingLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '../contexts/CurrentUser';
import signUpSchema from '../validationSchemas/signup';
import Header from '../commonComponents/Header';

const SignUp = () => {
  const errorTarget = useRef(null);
  const navigate = useNavigate();
  const { signUp, currentUser } = useCurrentUser();
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSignUp = async ({ password, username }) => {
    try {
      await signUp({ password, username });
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validateOnMount: false,
    validateOnBlur: true,
    validationSchema: signUpSchema(),
    onSubmit: handleSignUp,
  });

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container fluid className="h-100">
        <Row className="h-100 justify-content-center align-content-center">
          <Col className="col-12 col-md-8">
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Form onSubmit={formik.handleSubmit}>
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.username}
                        value={formik.values.username.trim()}
                      />
                      <Form.Control.Feedback
                        tooltip
                        type="invalid"
                      >
                        {formik.errors.username}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t('placeholders.password')}
                        value={formik.values.password.trim()}
                        required
                        isInvalid={!!formik.errors.password}
                      />
                      <Form.Control.Feedback
                        tooltip
                        type="invalid"
                      >
                        {formik.errors.password}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t('placeholders.passwordConfirmation')}
                        value={formik.values.passwordConfirmation.trim()}
                        ref={errorTarget}
                        required
                        isInvalid={!!formik.errors.passwordConfirmation}
                      />
                      <Form.Control.Feedback
                        tooltip
                        type="invalid"
                      >
                        {formik.errors.passwordConfirmation}
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
