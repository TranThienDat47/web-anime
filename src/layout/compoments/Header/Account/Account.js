import { forwardRef, memo, useState } from 'react';
import classNames from 'classnames/bind';

import { BiUserCircle } from 'react-icons/bi';
import {
   AiOutlineLogout,
   AiOutlineExclamationCircle,
   AiOutlineQuestionCircle,
   AiOutlineThunderbolt,
   AiOutlineRight,
} from 'react-icons/ai';
import { IoLanguageOutline } from 'react-icons/io5';
import { RiSettingsLine } from 'react-icons/ri';

import { Wrapper } from '~/components/Popper';
import MenuItem from '~/components/Popper/Menu/MenuItem';

import styles from './Account.module.scss';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const Account = forwardRef((props, ref) => {
   const dataInit = [
      {
         title: <div className={cx('title')}>hi</div>,
         left_icon: <BiUserCircle className={cx('icon')} />,
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
               { title: <div className={cx('title')}>Giao diện sáng</div> },
               { title: <div className={cx('title')}>Giao diện tối</div> },
            ],
         },
         separate: true,
      },
      {
         title: <div className={cx('title')}>Ngôn ngữ: Tiếng việt (VN)</div>,
         left_icon: <IoLanguageOutline className={cx('icon')} />,
         right_icon: <AiOutlineRight className={cx('icon')} />,
      },
      {
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
   ];

   const [historiesData, setHistoriesData] = useState(dataInit);

   return (
      <div ref={ref}>
         <Menu items={dataInit} hideOnClick className={cx('wrapper-account')}></Menu>
      </div>
   );

   // return (
   //    <div ref={ref}>
   //       <Wrapper className={cx('wrapper-account')}>
   //          {historiesData.map((element, index) => (
   //             <MenuItem key={index} data={element}></MenuItem>
   //          ))}
   //       </Wrapper>
   //    </div>
   // );
});

export default memo(Account);
