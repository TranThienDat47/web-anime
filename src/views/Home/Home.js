import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import { ListProductHome } from '~/components/ListProduct';

const cx = classNames.bind(styles);

function Home() {
   const [newResult, setNewResult] = useState(Array(12).fill(0));

   return (
      <div className={cx('wrapper')}>
         <div className={cx('inner')}>
            <div className={cx('wrapper-product new')}>
               <div className={cx('header')}>
                  <span className={cx('title')}>Mới</span>
               </div>

               <ListProductHome data={newResult} />

               <div className={cx('sperator')}></div>
            </div>
            <div className={cx('recommend-products')}>
               <div className={cx('header')}>
                  <span className={cx('title')}>Đề xuất</span>
               </div>

               <ListProductHome data={newResult} />
            </div>
         </div>
      </div>
   );
}

export default Home;
