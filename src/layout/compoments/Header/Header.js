import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import imgs from '~/assets/img';
import config from '~/config';
import styles from './Header.module.scss';
import { AiOutlineMenu, AiOutlineBell } from 'react-icons/ai';
import HeaderSidebar from './HeaderSidebar';
import { useState } from 'react';
import Search from '~/components/Search';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Header() {
   const [showNav, setShowNav] = useState(true);
   return (
      <>
         <header className={cx('wrapper')}>
            <div className={cx('nav')}>
               <AiOutlineMenu
                  className={cx('nav-icon')}
                  onClick={(e) => {
                     e.preventDefault();
                     setShowNav(showNav ? false : true);
                  }}
               />
               <Link to={config.routes.home} className={cx('logo-link')}>
                  <img src={imgs.logo} alt="Blog" />
               </Link>
            </div>

            <div className={cx('search')}>
               <Search />
            </div>

            <div className={cx('infor')}>
               <div className={cx('infor-icon')}>
                  <Button transparent className={cx('notification')}>
                     <AiOutlineBell />
                  </Button>
               </div>
               <div className={cx('infor-icon')}>
                  <button className={cx('user')}>
                     <img src={imgs.noImage} alt="ok" className={cx('avt')} />
                  </button>
               </div>
            </div>
         </header>
         <HeaderSidebar showNav={showNav} />
      </>
   );
}

export default Header;
