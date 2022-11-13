import { AuthContext } from '../contexts/auth/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';

const ProtectedRoute = ({ curPath }) => {
   const {
      authState: { authLoading, isAuthenticated, isVerify },
   } = useContext(AuthContext);

   if (authLoading)
      return (
         <div className="spinner-container">
            <Spinner animation="border" variant="info" />
         </div>
      );
   return isAuthenticated && isVerify ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
