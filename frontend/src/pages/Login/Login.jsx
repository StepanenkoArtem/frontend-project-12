import React, { useEffect, useRef, useState } from 'react';
import {
  Container, Row, Col, Card, Form, Button, Overlay, FloatingLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import loginSchema from '../../validationSchemas/login';
import { useCurrentUser } from '../../contexts/CurrentUser';
import Header from '../../commonComponents/Header';

const Login = () => {
  const errorTipTarget = useRef(null);
  const [error, setError] = useState();
  const { logIn, currentUser } = useCurrentUser();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleLogin = async ({ password, username }) => {
    try {
      await logIn({ password, username });
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema(),
    validateOnBlur: true,
    onSubmit: handleLogin,
  });

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
                      label={t('label.nickname')}
                      className="mb-3 text-muted"
                      controlId="username"
                    >
                      <Form.Control
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username.trim()}
                        placeholder={t('placeholders.username')}
                        required
                        isInvalid={!!error}
                      />
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
                        ref={errorTipTarget}
                        required
                        isInvalid={!!error}
                      />
                    </FloatingLabel>

                  </Form.Group>
                  {error && (
                  <Overlay target={errorTipTarget.current} show={!!error} placement="bottom-start">
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
                    {t('signIn')}
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Link to="/signup">{t('registration')}</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
