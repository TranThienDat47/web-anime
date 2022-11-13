import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind';
import Form from 'react-bootstrap/Form';

import { AuthContext } from '~/contexts/auth/AuthContext';
import AlertMessage from '~/layout/compoments/AlertMessage';
import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

const RegisterForm = () => {
   const { registerUser } = useContext(AuthContext);

   const [alert, setAlert] = useState(null);
   const [registerForm, setRegisterForm] = useState({
      username: '',
      password: '',
      confirmpassword: '',
   });

   const { username, password, confirmpassword } = registerForm;

   const onChangeregisterForm = (event) =>
      setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });

   const register = async (event) => {
      event.preventDefault();

      if (password !== confirmpassword) {
         setAlert({ type: 'danger', message: 'Password do not match' });
         return;
      }

      try {
         const registerData = await registerUser(registerForm);
         if (!registerData.success) setAlert({ type: 'danger', message: registerData.message });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <Form className={cx('wrapper')} onSubmit={register}>
            <AlertMessage info={alert} />
            <Form.Group className={cx('input-wrapper', 'mb-4 mt-2')}>
               <Form.Control
                  className={cx('input')}
                  type="text"
                  placeholder="Username"
                  name="username"
                  required
                  value={username}
                  onChange={onChangeregisterForm}
               />
            </Form.Group>
            <Form.Group className={cx('input-wrapper', 'mb-4')}>
               <Form.Control
                  className={cx('input')}
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={password}
                  onChange={onChangeregisterForm}
               />
            </Form.Group>
            <Form.Group className={cx('input-wrapper', 'mb-4')}>
               <Form.Control
                  className={cx('input')}
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  required
                  value={confirmpassword}
                  onChange={onChangeregisterForm}
               />
            </Form.Group>
            <Button variant="success" type="submit" className={cx('button', 'mb-4 mt-4')}>
               Register
            </Button>
         </Form>
         <p>
            <span>Already have an account?</span>
            <Link to="/login">
               <Button variant="info" size="sm" className={cx('button', 'ms-3')}>
                  Login
               </Button>
            </Link>
         </p>
      </>
   );
};

export default RegisterForm;
