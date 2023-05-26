import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind';
import axios from 'axios';

import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '~/contexts/constants';
import RegisterForm from '~/components/auth/RegisterForm';
import LoginForm from '~/components/auth/LoginForm';
import { AuthContext } from '~/contexts/auth';
import imgs from '~/assets/img';
import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

const Auth = ({ authRoute }) => {
   const {
      authState: { isAuthenticated, isVerify, user },
   } = useContext(AuthContext);

   const [content, setContent] = useState('Vui lòng truy cập gmail để xác nhận email...');

   const onClickReSend = async (e) => {
      setContent('Đã gửi lại link xác nhận! vui lòng truy cập gmail để xác nhận email...');
      const email = user.username;
      const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);

      try {
         await axios.post(`${apiUrl}/auth/login/resend`, { email, accessToken });
      } catch (error) {
         if (error.response.data) return error.response.data;
         else return { success: false, message: error.message };
      }
   };

   const onClickLogOut = (e) => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      window.location.reload();
   };

   let body;

   if (isAuthenticated && !isVerify) {
      body = (
         <div className={cx('confirm')}>
            <h3 style={{ color: 'red' }}>{content}</h3>
            <Button type="submit" className={cx('button')} onClick={(e) => onClickReSend(e)}>
               Gửi lại gmail xác nhận!
            </Button>
            <Button variant="danger" className={cx('button', 'danger')} onClick={onClickLogOut}>
               Đăng xuất!
            </Button>
         </div>
      );
   } else {
      body = (
         <>
            {authRoute === 'login' && <LoginForm />}
            {authRoute === 'register' && <RegisterForm />}
         </>
      );
   }

   return (
      <div className={cx('wrapper')}>
         <div className={cx('inner-wrapper')}>
            <div className={cx('inner')}>
               <h1>My blog</h1>
               <img src={imgs.logo} alt="logo" />
               <h4>Share knowledge and experience!</h4>
               {body}
            </div>
         </div>
      </div>
   );
};

export default Auth;
