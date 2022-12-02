import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import { useCurrentUser } from './contexts/CurrentUser';

const App = () => {
  const { currentUser } = useCurrentUser();

  return (
    <Router>
      <Routes>
        <Route path="/" element={currentUser ? <Home /> : <Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
