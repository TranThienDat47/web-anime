import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import { AiOutlineDownload, AiOutlineFire, AiOutlineBarChart, AiFillHome } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Sidebar() {
   return (
      <div className={cx('wrapper')}>
         <Button transparent className={cx('button')}>
            <div className={cx('content')}>
               <AiFillHome className={cx('icon')} />
               <div>Trang chủ</div>
            </div>
         </Button>
         <Button transparent className={cx('button')}>
            <div className={cx('content')}>
               <AiOutlineBarChart className={cx('icon')} />
               <div>Xếp hạng</div>
            </div>
         </Button>
         <Button transparent className={cx('button')}>
            <div className={cx('content')}>
               <AiOutlineFire className={cx('icon')} />
               <div>Thịnh hành</div>
            </div>
         </Button>
         <Button transparent className={cx('button')}>
            <div className={cx('content')}>
               <BsClockHistory className={cx('icon')} />
               <div>Gần đây</div>
            </div>
         </Button>
         <Button transparent className={cx('button')}>
            <div className={cx('content')}>
               <AiOutlineDownload className={cx('icon')} />
               <div>Đã lưu</div>
            </div>
         </Button>
      </div>
   );
}

export default Sidebar;
