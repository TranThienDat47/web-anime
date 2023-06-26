import { forwardRef } from 'react';

import classNames from 'classnames/bind';
import { memo, useState } from 'react';

import styles from './Notification.module.scss';
import NotificationItem from './NotificationItem';

const cx = classNames.bind(styles);

const Notification = forwardRef((props, ref) => {
   const [notifications, setNotifications] = useState([
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
      {
         image: 'https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg',
         title: 'Ai đó đã thích bình luận của bạn: Phim hay quá',
         time: 'Vừa xong',
      },
   ]);

   return (
      <div ref={ref} className={cx('wrapper')}>
         <div className={cx('header')}>
            <h4 className={cx('header-title')}>Thông báo</h4>
         </div>
         <div className={cx('notifications-list')}>
            {notifications.map((element, index) => (
               <NotificationItem key={index} data={element}></NotificationItem>
            ))}
         </div>
      </div>
   );
});

export default memo(Notification);
