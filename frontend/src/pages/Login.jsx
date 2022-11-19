import React, { useEffect, useRef } from 'react';
import {
  Container, Row, Col, Card, Form, Button, Overlay,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import loginSchema from '../validationSchemas/login';
import { useCurrentUser } from '../contexts/CurrentUser';

const Login = () => {
  const errorTipTarget = useRef(null);
  const { logIn, error, currentUser } = useCurrentUser();

  const navigate = useNavigate();

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
    validationSchema: loginSchema,
    validateOnBlur: true,
    onSubmit: logIn,
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
                    value={formik.values.username.trim()}
                    placeholder="Your username"
                    required
                    isInvalid={!!error}
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
                    value={formik.values.password.trim()}
                    ref={errorTipTarget}
                    required
                    isInvalid={!!error}
                  />

                </Form.Group>
                {error && (
                <Overlay target={errorTipTarget.current} show={!!error} placement="bottom">
                  <div
                    style={{
                      position: 'absolute',
                      backgroundColor: 'rgba(255, 100, 100, 0.85)',
                      padding: '2px 10px',
                      color: 'white',
                      borderRadius: 3,
                    }}
                  >
                    {error}
                  </div>
                </Overlay>
                )}
                <Button variant="primary" type="submit">
                  Enter
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Link to="/signup">Registration</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
