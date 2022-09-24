import React from 'react';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';

import { useFormik } from 'formik';

const validationSchema = Yup.object({
  nickname: Yup.string().min(4).max(25, 'Cannot be longer then 25 symbols').required(),
  password: Yup.string().required(),
});

const handleLogin = async ({ password, nickname }) => {
  const body = { password, nickname };
  // const baseUrl = 'http://localhost:5001';
  // const loginUrl = new URL('api/v1/login', baseUrl).toString();
  const config = {
    responseType: 'json',
  };

  const response = await axios.post('api/v1/login', body, config);
  const { token } = response.data;
  console.log(token);
  // window.localStorage.setItem({ ...token });
};

const Login = () => {
  const formik = useFormik({
    initialValues: {
      nickname: '',
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
                    id="nickname"
                    name="nickname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nickname}
                    placeholder="Your nickname"
                    required
                  />
                  {formik.touched.nickname && formik.errors.nickname ? (
                    <div>{formik.errors.nickname}</div>
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
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </Form.Group>
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
