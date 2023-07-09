import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';

import AuthContextProvider from '~/contexts/auth/AuthContext';

import { publicRoutes, privateRoutes } from '~/route/routes';
import Logout from '~/route/routing/Logout';
import Verify from '~/route/routing/Verify';
import Account from '~/route/routing/Account';
import PassportGoogle from '~/route/routing/PassportGoogle';
import ProtectedRoute from '~/route/routing/ProtectedRoute';

import Auth from '~/views/Auth/index.js';
import DefaultLayout from '~/layout/DefaultLayout';
import ProductContextProvider from './contexts/product/ProductContext';

function App() {
   return (
      <ProductContextProvider>
         <AuthContextProvider>
            <Router>
               <Routes>
                  <Route exact path="/verify" element={<Verify />} />
                  <Route exact path="/passport/google" element={<PassportGoogle />} />
                  <Route exact path="/logout" element={<Logout />} />

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
      </ProductContextProvider>
   );
}

export default App;
