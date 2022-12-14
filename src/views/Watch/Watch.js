import classNames from 'classnames/bind';
import styles from './Watch.module.scss';

import Video from '~/views/Watch/components/Video/index';

const cx = classNames.bind(styles);

const Watch = () => {
   return (
      <div className={cx('wrapper')}>
         <Video />
      </div>
   );
};

export default Watch;
