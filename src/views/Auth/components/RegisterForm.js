import { useContext, useState } from 'react';
import classNames from 'classnames/bind';

import { AuthContext } from '~/contexts/auth/AuthContext';

import imgs from '~/assets/img';
import Button from '~/components/Button';
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';

import styles from './Auth.module.scss';
import { Link } from 'react-router-dom';

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
      <div className={cx('wrapper')}>
         <div className={cx('header')}>
            <Link to="/">
               <img className={cx('logo')} src={imgs.logo} alt="logo" />
            </Link>
            <h3 className={cx('title')}>Tạo tài khoản mới</h3>
         </div>
         <form className={cx('frmLogin')}>
            <input className={cx('username')} type="email" placeholder="Email hoặc số điện thoại" />
            <Link className={cx('forget')} to="#">
               Bạn quên địa chỉ email
            </Link>
            <div className={cx('control')}>
               <Button className={cx('btn-register')}>Tạo tài khoản</Button>
               <Button className={cx('btn-submit')} hover type="submit">
                  Tiếp theo
               </Button>
            </div>
         </form>
         <p className={cx('separator-with_text')}>Hoặc</p>
         <div className={cx('list-login')}>
            <div>
               <Button
                  leftIcon={<FcGoogle className={cx('icon')} />}
                  large
                  href={'http://localhost:5000/api/auth/google/'}
                  className={cx('item-with', 'with-google')}
               >
                  Đăng nhập với Google
               </Button>
            </div>
            <div>
               <Button
                  leftIcon={<SiFacebook className={cx('icon')} />}
                  large
                  className={cx('item-with', 'with-facebook')}
               >
                  Đăng nhập với Facebook
               </Button>
            </div>
         </div>
      </div>
   );
};

export default RegisterForm;
