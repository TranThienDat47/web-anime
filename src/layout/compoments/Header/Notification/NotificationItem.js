import classNames from 'classnames/bind';
import { memo } from 'react';

import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

function NotificationItem({ data }) {
   return (
      <a href="#" className={cx('notification-item')}>
         <div className={cx('notification-item__image')}>
            <img src={data.image} alt="" />
         </div>
         <div className={cx('notification-item__content')}>
            <p className={cx('notification-item__title')}>{data.title}</p>
            <p className={cx('notification-item__time')}>{data.time}</p>
         </div>
      </a>
   );
}

export default memo(NotificationItem);
