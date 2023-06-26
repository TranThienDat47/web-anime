import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';

import Auth from '~/views/Auth/index.js';
import AuthContextProvider from '~/contexts/auth/AuthContext';
import ProtectedRoute from '~/route/routing/ProtectedRoute';
import Account from '~/route/routing/Account';
import Verify from '~/route/routing/Verify';
import { publicRoutes, privateRoutes } from '~/route/routes';
import DefaultLayout from '~/layout/DefaultLayout';

function App() {
   return (
      <AuthContextProvider>
         <Router>
            <Routes>
               <Route exact path="/verify" element={<Verify />} />

               {publicRoutes.map((route, index) => {
                  const Page = route.compnent;
                  let Layout = DefaultLayout;
                  if (route.layout) Layout = route.layout;
                  else if (route.layout === null) Layout = Fragment;
                  return (
                     <Route
                        key={index}
                        path={route.path}
                        element={
                           <Layout>
                              <Page />
                           </Layout>
                        }
                     />
                  );
               })}

               <Route element={<Account />}>
                  <Route exact path="/register" element={<Auth authRoute="register" />} />
                  <Route path="/login" element={<Auth authRoute="login" />} />
               </Route>

               <Route element={<ProtectedRoute />}>
                  {privateRoutes.map((route, index) => {
                     const Page = route.compnent;
                     let Layout = DefaultLayout;
                     if (route.layout) Layout = route.layout;
                     else if (route.layout === null) Layout = Fragment;
                     return (
                        <Route
                           key={index}
                           path={route.path}
                           element={
                              <Layout>
                                 <Page />
                              </Layout>
                           }
                        />
                     );
                  })}
               </Route>

               <Route path="*" element={<Navigate to="/" />} />
            </Routes>
         </Router>
      </AuthContextProvider>
   );
}

export default App;
