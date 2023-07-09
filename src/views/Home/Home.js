import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import { ListProductHome } from '~/components/ListProduct';
import { ProductContext } from '~/contexts/product';

const cx = classNames.bind(styles);

function Home() {
   const {
      productState: { suggestedProducts },
   } = useContext(ProductContext);

   // const [newResult, setNewResult] = useState(Array(12).fill(0));
   const [newResult, setNewResult] = useState(Array(12).fill(0));

   console.log(suggestedProducts);

   useEffect(() => {
      if (suggestedProducts.length === 0) {
         setNewResult(Array(12).fill(0));
      } else setNewResult(suggestedProducts);
   }, [suggestedProducts]);

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
