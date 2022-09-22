import React from 'react';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import * as Yup from 'yup';

import { useFormik } from 'formik';

const validationSchema = Yup.object({
  nickName: Yup.string().min(4).max(25, 'Cannot be longer then 25 symbols').required(),
  password: Yup.string().min(8).required(),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      nickName: '',
      password: '',
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      alert(values.password);
    },
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
                    id="nickName"
                    name="nickName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nickName}
                    placeholder="Your nickname"
                    required
                  />
                  {formik.touched.nickName && formik.errors.nickName ? (
                    <div>{formik.errors.nickName}</div>
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
