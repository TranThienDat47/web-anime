import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import { ListProductHome } from '~/components/ListProduct';
import { ProductContext } from '~/contexts/product';

const cx = classNames.bind(styles);

function Home() {
   const {
      productState: {
         suggestedProducts,
         pageSuggestedProducts,
         newProducts,
         hasMore,
         loading,
         loadingMore,
         error,
      },
      loadHomeSuggested,
      loadNewHome,
      beforeLoadHomeSuggested,
   } = useContext(ProductContext);

   const [newResult, setNewResult] = useState(Array(12).fill(0));

   const handleScroll = useCallback(() => {
      if (
         Math.floor(window.innerHeight + document.documentElement.scrollTop) >=
         document.documentElement.offsetHeight - 1
      ) {
         beforeLoadHomeSuggested();
      }
   }, []);

   useEffect(() => {
      loadNewHome();
   }, []);

   useEffect(() => {
      if (!loadingMore || !hasMore) return;

      loadHomeSuggested(pageSuggestedProducts + 1);
   }, [loadingMore, hasMore]);

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   useEffect(() => {
      if (newProducts?.length === 0) {
         setNewResult(Array(12).fill(0));
      } else setNewResult(newProducts);
   }, [newProducts]);

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

               <ListProductHome
                  data={suggestedProducts.length > 0 ? suggestedProducts : Array(10).fill(0)}
               />
            </div>
            {loadingMore || <div className={cx('loading-more')}>Loading more...</div>}
         </div>
      </div>
   );
}

export default React.memo(Home);
