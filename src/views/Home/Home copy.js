import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './Home.module.scss';
import { ListProductHome } from '~/components/ListProduct';
import { apiUrl } from '~/contexts/constants';

const cx = classNames.bind(styles);

function Home() {
   const [newResult, setNewResult] = useState(Array(12).fill(0));

   useEffect(() => {
      const loadUser = async () => {
         const response = await axios.get(`${apiUrl}/products`);
         setNewResult(response.data.products);
      };
      loadUser();
   }, []);

   return (
      <div className={cx('wrapper')}>
         <div className={cx('inner')}>
            <div className={cx('new-products')}>
               <div className={cx('header')}>
                  <span className={cx('title')}>News</span>
               </div>
               <ListProductHome data={newResult} />
               <div className={cx('sperator')}></div>
            </div>
            <div className={cx('products')}>
               <ListProductHome data={newResult} />
            </div>
         </div>
      </div>
   );
}

export default Home;
