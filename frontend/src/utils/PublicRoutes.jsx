import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUser';

const PublicRoutes = () => {
  const { currentUser } = useCurrentUser();
  return (!currentUser ? <Outlet /> : <Navigate to="/" />);
};

export default PublicRoutes;
