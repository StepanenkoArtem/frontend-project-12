import React from 'react';
import { Button, Nav } from 'react-bootstrap';

const Header = () => {
  const navbarTitle = 'Hexlet Chat';
  const exitButton = 'Exit';
  return (
    <Nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{navbarTitle}</a>
        <Button variant="primary" type="button" className="btn btn-primary">{exitButton}</Button>
      </div>
    </Nav>
  );
};

export default Header;
