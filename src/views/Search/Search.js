import axios from 'axios';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { apiUrl } from '~/contexts/constants';
import styles from './Search.module.scss';
import { ListProductSearch } from '~/components/ListProduct';

const cx = classNames.bind(styles);

const Search = () => {
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
            <div className={cx('header')}>
               <h3>Result</h3>
            </div>
            <div className={cx('result')}>
               <ListProductSearch data={newResult} />
            </div>
         </div>
      </div>
   );
};

export default Search;
