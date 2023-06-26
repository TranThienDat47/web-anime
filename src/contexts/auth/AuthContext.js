import { createContext, useReducer, useEffect } from 'react';
import { authReducer, init } from '~/reducers';
import axios from 'axios';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../constants';
import setAuthToken from '../../utils/setAuthToken';
const AuthContext = createContext();

export { AuthContext };

const AuthContextProvider = ({ children }) => {
   const [authState, dispatch] = useReducer(authReducer, init);

   // Authenticate user
   const loadUser = async () => {
      if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
         setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
      }

      if (axios.defaults.headers.common['Authorization'])
         try {
            const response = await axios.get(`${apiUrl}/auth`);
            if (response.data.success) {
               if (response.data.isverify) {
                  dispatch({
                     type: 'SET_AUTH',
                     payload: { isAuthenticated: true, isVerify: true, user: response.data.user },
                  });
               } else if (!response.data.isverify) {
                  dispatch({
                     type: 'SET_AUTH',
                     payload: { isAuthenticated: true, isVerify: false, user: response.data.user },
                  });
               }
            } else if (!response.data.success && !response.data.isverify) {
               dispatch({
                  type: 'SET_AUTH',
                  payload: { isAuthenticated: false, user: null },
               });
            }
         } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
               type: 'SET_AUTH',
               payload: { isAuthenticated: false, user: null },
            });
         }
      else {
         dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null },
         });
      }
   };

   useEffect(() => {
      loadUser();
   }, []);

   const loginUser = async (userForm) => {
      try {
         const response = await axios.post(`${apiUrl}/auth/login`, userForm);
         if (response.data.success) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            await loadUser();
         }

         return response.data;
      } catch (error) {
         if (error.response.data) return error.response.data;
         else return { success: false, message: error.message.message };
      }
   };

   const registerUser = async (userForm) => {
      try {
         const response = await axios.post(`${apiUrl}/auth/register`, userForm);

         if (response.data.success) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            await loadUser();
         }

         return response.data;
      } catch (error) {
         if (error.response.data) return error.response.data;
         else return { success: false, message: error.message.message };
      }
   };

   const verify = async (verifyForm) => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, verifyForm.accessToken);
      try {
         const response = await axios.get(`${apiUrl}/auth/verify`, {
            params: {
               email: verifyForm.email,
               token: verifyForm.token,
            },
         });
         if (response.data.success) {
            return { success: false, message: 'Verify invalid' };
         }
      } catch (error) {
         if (error.response.data) return error.response.data;
         else return { success: false, message: error.message.message };
      }
   };

   const authContextData = { loginUser, registerUser, authState, verify };

   return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
