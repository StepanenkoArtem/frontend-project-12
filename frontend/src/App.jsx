import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import SignUp from './pages/SignUp/SignUp';
import { useCurrentUser } from './contexts/CurrentUser';

const App = () => {
  const { currentUser } = useCurrentUser();

  return (
    <Router>
      <Routes>
        <Route path="/" element={currentUser ? <Home /> : <Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={currentUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
