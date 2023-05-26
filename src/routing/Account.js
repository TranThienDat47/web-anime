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
            <Spinner style={{ width: '34px', height: '34px' }} animation="border" variant="info" />
         </div>
      );
   if (!isAuthenticated || !isVerify) {
      return <Outlet />;
   }
   return <Navigate to="/dashboard" />;
};
export default ProtectedRoute;
