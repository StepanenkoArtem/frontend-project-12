import React from 'react';
import { Button, Form } from 'react-bootstrap';

const NewMessage = () => {
  const addNewMessage = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <Form className="mt-auto px-5 py-3" onSubmit={addNewMessage}>
      <Form.Text />
      <Button type="submit">
        Add
      </Button>
    </Form>
  );
};

export default NewMessage;
