import { useEffect, useRef, useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { AuthContext } from '~/contexts/auth';

import config from '~/config';
import imgs from '~/assets/img';
import Search from '~/components/Search';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import HeaderSidebar from './HeaderSidebar';
import Notification from './Notification';
import Menu from '~/components/Popper/Menu';

import { BiUserCircle } from 'react-icons/bi';
import {
   AiOutlineLogout,
   AiOutlineExclamationCircle,
   AiOutlineQuestionCircle,
   AiOutlineThunderbolt,
   AiOutlineRight,
   AiOutlineCheck,
   AiOutlineMenu,
   AiOutlineBell,
} from 'react-icons/ai';
import { IoLanguageOutline } from 'react-icons/io5';
import { RiSettingsLine } from 'react-icons/ri';

const cx = classNames.bind(styles);

function Header() {
   const {
      authState: { isAuthenticated, isVerify, user },
   } = useContext(AuthContext);

   const [showNotification, setShowNotification] = useState(false);
   const [dataInit, setDataInit] = useState([
      {
         title: <div className={cx('title')}>Cài đặt</div>,
         left_icon: <RiSettingsLine className={cx('icon')} />,
         right_icon: <AiOutlineRight className={cx('icon')} />,
      },
      {
         title: <div className={cx('title')}>Giao diện: Giao diện sáng</div>,
         left_icon: <AiOutlineThunderbolt className={cx('icon')} />,
         right_icon: <AiOutlineRight className={cx('icon')} />,
         children: {
            title: <div className={cx('title')}>Giao diện</div>,
            data: [
               {
                  title: <div className={cx('title')}>Giao diện sáng</div>,
                  left_icon: <AiOutlineCheck className={cx('icon')} />,
               },
               {
                  title: <div className={cx('title')}>Giao diện tối</div>,
                  left_icon: <div className={cx('icon')}></div>,
               },
            ],
         },
         separate: true,
      },
      {
         title: <div className={cx('title')}>Ngôn ngữ: Tiếng Việt (VN)</div>,
         left_icon: <IoLanguageOutline className={cx('icon')} />,
         right_icon: <AiOutlineRight className={cx('icon')} />,
         children: {
            title: <div className={cx('title')}>Ngôn ngữ</div>,
            data: [
               {
                  title: <div className={cx('title')}>Tiếng Việt (VN)</div>,
                  left_icon: <AiOutlineCheck className={cx('icon')} />,
               },
            ],
         },
      },
      {
         title: <div className={cx('title')}>Trợ giúp</div>,
         left_icon: <AiOutlineQuestionCircle className={cx('icon')} />,
         separate: true,
      },
      {
         title: <div className={cx('title')}>Đóng góp ý kiến</div>,
         left_icon: <AiOutlineExclamationCircle className={cx('icon')} />,
      },
   ]);

   // const dataInitRef = useRef([
   //       {
   //          title: (
   //             <div className={cx('title')}>
   //                <p className={cx('account-name')}>Trần Văn Nam</p>
   //                <p className={cx('account-email')}>tranthiendat220102@gmail.com</p>
   //             </div>
   //          ),
   //          left_icon: (
   //             <img
   //                className={cx('avt', 'account-avt')}
   //                src={imgs.noImage}
   //                onError={(e) => {
   //                   e.target.onerror = null;
   //                   e.target.src = imgs.noImage;
   //                }}
   //                alt=""
   //             />
   //          ),
   //       },
   //       {
   //          title: <div className={cx('title')}>Tài khoản của bạn</div>,
   //          left_icon: <BiUserCircle className={cx('icon')} />,
   //          separate: true,
   //       },
   //       {
   //          title: <div className={cx('title')}>Cài đặt</div>,
   //          left_icon: <RiSettingsLine className={cx('icon')} />,
   //          right_icon: <AiOutlineRight className={cx('icon')} />,
   //       },
   //       {
   //          title: <div className={cx('title')}>Giao diện: Giao diện sáng</div>,
   //          left_icon: <AiOutlineThunderbolt className={cx('icon')} />,
   //          right_icon: <AiOutlineRight className={cx('icon')} />,
   //          children: {
   //             title: <div className={cx('title')}>Giao diện</div>,
   //             data: [
   //                {
   //                   title: <div className={cx('title')}>Giao diện sáng</div>,
   //                   left_icon: <AiOutlineCheck className={cx('icon')} />,
   //                },
   //                {
   //                   title: <div className={cx('title')}>Giao diện tối</div>,
   //                   left_icon: <div className={cx('icon')}></div>,
   //                },
   //             ],
   //          },
   //          separate: true,
   //       },
   //       {
   //          title: <div className={cx('title')}>Ngôn ngữ: Tiếng Việt (VN)</div>,
   //          left_icon: <IoLanguageOutline className={cx('icon')} />,
   //          right_icon: <AiOutlineRight className={cx('icon')} />,
   //          children: {
   //             title: <div className={cx('title')}>Ngôn ngữ</div>,
   //             data: [
   //                {
   //                   title: <div className={cx('title')}>Tiếng Việt (VN)</div>,
   //                   left_icon: <AiOutlineCheck className={cx('icon')} />,
   //                },
   //             ],
   //          },
   //       },
   //       {
   //          to: '/logout',
   //          title: <div className={cx('title')}>Đăng xuất</div>,
   //          left_icon: <AiOutlineLogout className={cx('icon')} />,
   //          separate: true,
   //       },
   //       {
   //          title: <div className={cx('title')}>Trợ giúp</div>,
   //          left_icon: <AiOutlineQuestionCircle className={cx('icon')} />,
   //          separate: true,
   //       },
   //       {
   //          title: <div className={cx('title')}>Đóng góp ý kiến</div>,
   //          left_icon: <AiOutlineExclamationCircle className={cx('icon')} />,
   //       },
   //   ]);

   const notificationResultRef = useRef();

   const childRef = useRef(null);

   useEffect(() => {
      if (user) {
         setDataInit([
            {
               title: (
                  <div className={cx('title')}>
                     <p className={cx('account-name')}>{user._name}</p>
                     <p className={cx('account-email')}>{user.username}</p>
                  </div>
               ),
               left_icon: (
                  <img
                     className={cx('avt', 'account-avt')}
                     src={user.img || imgs.noImage}
                     onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = imgs.noImage;
                     }}
                     alt=""
                  />
               ),
            },
            {
               title: <div className={cx('title')}>Tài khoản của bạn</div>,
               left_icon: <BiUserCircle className={cx('icon')} />,
               separate: true,
            },
            {
               title: <div className={cx('title')}>Cài đặt</div>,
               left_icon: <RiSettingsLine className={cx('icon')} />,
               right_icon: <AiOutlineRight className={cx('icon')} />,
            },
            {
               title: <div className={cx('title')}>Giao diện: Giao diện sáng</div>,
               left_icon: <AiOutlineThunderbolt className={cx('icon')} />,
               right_icon: <AiOutlineRight className={cx('icon')} />,
               children: {
                  title: <div className={cx('title')}>Giao diện</div>,
                  data: [
                     {
                        title: <div className={cx('title')}>Giao diện sáng</div>,
                        left_icon: <AiOutlineCheck className={cx('icon')} />,
                     },
                     {
                        title: <div className={cx('title')}>Giao diện tối</div>,
                        left_icon: <div className={cx('icon')}></div>,
                     },
                  ],
               },
               separate: true,
            },
            {
               title: <div className={cx('title')}>Ngôn ngữ: Tiếng Việt (VN)</div>,
               left_icon: <IoLanguageOutline className={cx('icon')} />,
               right_icon: <AiOutlineRight className={cx('icon')} />,
               children: {
                  title: <div className={cx('title')}>Ngôn ngữ</div>,
                  data: [
                     {
                        title: <div className={cx('title')}>Tiếng Việt (VN)</div>,
                        left_icon: <AiOutlineCheck className={cx('icon')} />,
                     },
                  ],
               },
            },
            {
               to: '/logout',
               title: <div className={cx('title')}>Đăng xuất</div>,
               left_icon: <AiOutlineLogout className={cx('icon')} />,
               separate: true,
            },
            {
               title: <div className={cx('title')}>Trợ giúp</div>,
               left_icon: <AiOutlineQuestionCircle className={cx('icon')} />,
               separate: true,
            },
            {
               title: <div className={cx('title')}>Đóng góp ý kiến</div>,
               left_icon: <AiOutlineExclamationCircle className={cx('icon')} />,
            },
         ]);
      }
   }, [user]);

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (
            notificationResultRef.current &&
            !notificationResultRef.current.parentNode.contains(e.target)
         ) {
            setShowNotification(false);
         }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, [notificationResultRef]);

   return (
      <>
         <header className={cx('wrapper')}>
            <div className={cx('nav')}>
               <AiOutlineMenu
                  className={cx('nav-icon')}
                  onClick={(e) => {
                     childRef.current.showAndHide();
                  }}
               />
               <a href={config.routes.home} className={cx('logo-link')}>
                  <img src={imgs.logo} alt="Blog" />
               </a>
            </div>

            <div className={cx('search')}>
               <Search />
            </div>

            <div className={cx('infor')}>
               <div className={cx('infor-icon')}>
                  {isAuthenticated ? (
                     <>
                        <Button
                           transparent
                           className={cx('header__icon', 'notification', 'tooltip')}
                           name-tooltip="Thông báo"
                           hover
                           onClick={() => {
                              setShowNotification((prev) => !prev);
                           }}
                        >
                           <AiOutlineBell />
                        </Button>
                        {showNotification && <Notification ref={notificationResultRef} />}
                     </>
                  ) : (
                     <>
                        <Button
                           to="/login"
                           className={cx('header__icon', 'login', 'tooltip')}
                           name-tooltip="Đăng nhập"
                           leftIcon={<BiUserCircle />}
                           rounded
                        >
                           <p>Đăng nhập</p>
                        </Button>
                     </>
                  )}
               </div>
               <div className={cx('infor-icon')}>
                  {isAuthenticated && user ? (
                     <Menu
                        items={dataInit}
                        key={dataInit}
                        hideOnClick={true}
                        className={cx('wrapper-account')}
                     >
                        <button className={cx('user')}>
                           <img
                              src={user.img || imgs.noImage}
                              onError={(e) => {
                                 e.target.onerror = null;
                                 e.target.src = imgs.noImage;
                              }}
                              alt="Logo"
                              className={cx('avt')}
                           />
                        </button>
                     </Menu>
                  ) : (
                     <Menu
                        items={dataInit}
                        key={dataInit}
                        hideOnClick={true}
                        className={cx('wrapper-account')}
                     >
                        <Button
                           className={cx('header__icon', 'option', 'menu', 'tooltip')}
                           transparent
                           name-tooltip="Cài đặt"
                           backgroundColor="rgba(255, 255, 255, 0.94)"
                        >
                           <RiSettingsLine />
                        </Button>
                     </Menu>
                  )}
               </div>
            </div>
         </header>
         <HeaderSidebar ref={childRef} />
      </>
   );
}

export default Header;
