import React from 'react';
import { Spinner } from 'react-bootstrap';

const InitSpinner = () => (
  <div className="d-flex w-100 h-100 justify-content-center align-items-center">
    <Spinner animation="border" variant="primary" />
  </div>
);

export default InitSpinner;
