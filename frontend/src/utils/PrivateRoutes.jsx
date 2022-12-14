import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUser';

const PrivateRoutes = () => {
  const { currentUser } = useCurrentUser();
  return (currentUser ? <Outlet /> : <Navigate to="login" />);
};

export default PrivateRoutes;
