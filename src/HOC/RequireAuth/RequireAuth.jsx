import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function RequireAuth({ children, element: Element, ...props }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return children;
}

export default RequireAuth;
