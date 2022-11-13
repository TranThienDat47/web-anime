import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classNames from 'classnames/bind';

import styles from './Auth.module.scss';
import { AuthContext } from '~/contexts/auth';
import AlertMessage from '~/layout/compoments/AlertMessage';

const cx = classNames.bind(styles);

const LoginForm = () => {
   const { loginUser } = useContext(AuthContext);

   const [loginForm, setLoginForm] = useState({
      username: '',
      password: '',
   });
   const [alert, setAlert] = useState(null);

   const { username, password } = loginForm;

   const onChangeLoginForm = (event) => {
      setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
   };

   const login = async (event) => {
      event.preventDefault();

      try {
         const loginData = await loginUser(loginForm);
         if (!loginData.success) {
            setAlert({ type: 'danger', message: loginData.message });
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <Form onSubmit={login} className={cx('wrapper')}>
            <AlertMessage info={alert} />
            <Form.Group className={cx('input-wrapper', 'mb-4 mt-2')}>
               <Form.Control
                  className={cx('input')}
                  type="text"
                  placeholder="Email"
                  name="username"
                  value={username}
                  onChange={onChangeLoginForm}
                  required
               />
            </Form.Group>
            <Form.Group className={cx('input-wrapper', 'mb-4')}>
               <Form.Control
                  className={cx('input')}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChangeLoginForm}
                  required
               />
            </Form.Group>
            <Button variant="success" type="submit" className={cx('button', 'mb-4 mt-4')}>
               Login
            </Button>
         </Form>
         <p>
            <span>Don't have an account?</span>
            <Link to="/register">
               <Button variant="info" size="sm" className={cx('button', 'ms-3')}>
                  Register
               </Button>
            </Link>
         </p>
      </>
   );
};

export default LoginForm;
