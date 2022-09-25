import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CurrentUser from './providers/CurrentUser';

const App = () => (
  <CurrentUser>
    <Router>
      {!localStorage.getItem('token') && <Navigate to="/login" />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </CurrentUser>
);

export default App;
