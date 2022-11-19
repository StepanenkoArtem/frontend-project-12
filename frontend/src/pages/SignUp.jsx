import React, { useEffect, useRef } from 'react';
import {
  Button, Card, Col, Container, Form, Overlay, Row,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Header from './Header';
import { useCurrentUser } from '../contexts/CurrentUser';

const signUpSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
  passwordConfirmation: Yup.string()
    .when(
      'password',
      (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field),
    ),
});

const SignUp = () => {
  const errorTipTarget = useRef(null);
  const navigate = useNavigate();
  const { signUp, currentUser, error } = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validateOnMount: false,
    validateOnBlur: true,
    validationSchema: signUpSchema,
    onSubmit: signUp,
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

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Your password"
                      value={formik.values.passwordConfirmation.trim()}
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
                  <Button variant="primary" type="submit" disabled={!formik.isValid}>
                    Registration
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Link to="/login">Sign In</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
