import React, { useContext, useState, useRef } from 'react';
import {
  Container, Row, Col, Card, Form, Button, Overlay,
} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUser';

const validationSchema = Yup.object({
  username: Yup.string().min(4).max(25, 'Cannot be longer then 25 symbols').required(),
  password: Yup.string().required(),
});

const Login = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [authError, setAuthError] = useState(null);
  const errorTipTarget = useRef(null);

  const navigate = useNavigate();
  const handleLogin = async ({ password, username }) => {
    const body = { password, username };
    const config = {
      responseType: 'json',
    };
    try {
      const response = await axios.post('api/v1/login', body, config);
      localStorage.setItem('token', response.data.token);
      setCurrentUser({ username: response.data.username });
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
                  {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}
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
                    isInvalid={!!authError}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
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
