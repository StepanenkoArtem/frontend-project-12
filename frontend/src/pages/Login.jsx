import React, { useState, useRef } from 'react';
import {
  Container, Row, Col, Card, Form, Button, Overlay,
} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUser';
import ApiPaths from '../config/ApiPaths';

const validationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const { setLoggedIn } = useCurrentUser();
  const [authError, setAuthError] = useState(null);
  const errorTipTarget = useRef(null);

  const navigate = useNavigate();
  const handleLogin = async ({ password, username }) => {
    const body = { password, username };
    const config = {
      responseType: 'json',
    };
    try {
      const response = await axios.post(ApiPaths.login, body, config);
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
      navigate('/');
    } catch (e) {
      await setAuthError(e.response);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: handleLogin,
  });

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-content-center">
        <Col className="col-12 col-md-8">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="Your username"
                    required
                    isInvalid={!!authError}
                  />

                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Your password"
                    value={formik.values.password}
                    ref={errorTipTarget}
                    required
                    isInvalid={!!authError}
                  />

                </Form.Group>
                <Overlay target={errorTipTarget.current} show={!!authError} placement="bottom">
                  {authError && (
                  <div
                    style={{
                      position: 'absolute',
                      backgroundColor: 'rgba(255, 100, 100, 0.85)',
                      padding: '2px 10px',
                      color: 'white',
                      borderRadius: 3,
                    }}
                  >
                    {authError.data.message}
                  </div>
                  )}
                </Overlay>
                <Button variant="primary" type="submit">
                  Enter
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer>Registration</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
