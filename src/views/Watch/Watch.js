import classNames from 'classnames/bind';
import styles from './Watch.module.scss';

import Video from '~/components/Video/index';

const cx = classNames.bind(styles);

const Watch = () => {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('inner')}>
            <Video />
         </div>
      </div>
   );
};

export default Watch;
