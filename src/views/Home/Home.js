import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './Home.module.scss';
import ListProduct from '~/components/ListProduct';
import { apiUrl } from '~/contexts/constants';

const cx = classNames.bind(styles);

function Home() {
   const [searchResult, setSearchResult] = useState([]);

   useEffect(() => {
      const loadUser = async () => {
         const response = await axios.get(`${apiUrl}/products`);
         setSearchResult(response.data.products);
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
               <ListProduct data={searchResult} />
               <div className={cx('sperator')}></div>
            </div>
            <div className={cx('products')}>
               <ListProduct data={searchResult} />
            </div>
         </div>
      </div>
   );
}

export default Home;
