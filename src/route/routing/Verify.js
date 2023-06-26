import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '~/contexts/auth/AuthContext';

const Verify = () => {
   const { verify } = useContext(AuthContext);

   const email = window.location.href.split('Dat@Dat')[1];
   const token = window.location.href.split('Dat@Dat')[3];
   const accessToken = window.location.href.split('Dat@Dat')[5];
   const verifyForm = {
      email,
      token,
      accessToken,
   };

   const verifyProgress = async () => {
      await verify(verifyForm);
   };

   verifyProgress();

   return <Navigate to="/dashboard" />;
};

export default Verify;
