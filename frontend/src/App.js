import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <Navbar
        className="shadow-sm navbar navbar-expand-lg navbar-light bg-white"
      >
        Hexlet Chat
      </Navbar>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  </div>
);

export default App;
