import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './Auth.module.scss';
import { AuthContext } from '~/contexts/auth';
import AlertMessage from '~/layout/compoments/AlertMessage';
import imgs from '~/assets/img';
import Button from '~/components/Button';

import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';

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
      <div className={cx('wrapper')}>
         <div className={cx('header')}>
            <Link to="/">
               <img className={cx('logo')} src={imgs.logo} alt="logo" />
            </Link>
            <h3 className={cx('title')}>Đăng nhập với mật khẩu</h3>
         </div>
         <form className={cx('frmLogin')}>
            <input className={cx('username')} type="email" placeholder="Email hoặc số điện thoại" />
            <Link className={cx('forget')} to="#">
               Bạn quên địa chỉ email
            </Link>
            <div className={cx('control')}>
               <Button href="/register" className={cx('btn-register')}>
                  Tạo tài khoản
               </Button>
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

export default LoginForm;
