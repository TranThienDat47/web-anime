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

   // const [newResult, setNewResult] = useState(Array(12).fill(0));

   // const wrapperRef = useRef();

   // const handleScroll = useCallback(() => {
   //    if (
   //       Math.floor(wrapperRef.current.offsetHeight + wrapperRef.current.scrollTop) >=
   //       wrapperRef.current.scrollHeight - 1
   //    ) {
   //       if (hasMore) beforeLoadHomeSuggested();
   //    }
   // }, [hasMore]);

   // useEffect(() => {
   //    loadNewHome();

   //    if (pageSuggestedProducts === -1) beforeLoadHomeSuggested();
   // }, []);

   // useEffect(() => {
   //    if (!loadingMore || !hasMore) return;

   //    loadHomeSuggested(pageSuggestedProducts + 1);
   // }, [loadingMore, hasMore]);

   // useEffect(() => {
   //    wrapperRef.current.onscroll = handleScroll;
   // }, [hasMore]);

   useEffect(() => {
      if (newProducts?.length === 0) {
         setNewResult(Array(12).fill(0));
      } else setNewResult(newProducts);
   }, [newProducts]);

   return (
      <div ref={wrapperRef} className={cx('wrapper')}>
         <div className={cx('inner')}>
            <div className={cx('heading_of_block')}>
               <span className={cx('title')}>Mới</span>
            </div>
            <div className={cx('wrapper_of_block', 'wrapper-product', 'new')}>
               <ListProductHome data={newResult} />
            </div>

            <div className={cx('heading_of_block')}>
               <span className={cx('title')}>Đề xuất</span>
            </div>
            <div className={cx('wrapper_of_block', 'wrapper-product', 'recommend-products')}>
               <ListProductHome
                  data={suggestedProducts.length > 0 ? suggestedProducts : Array(10).fill(0)}
               />
            </div>

            {loadingMore ? (
               <div className={cx('loading-more')}>Loading more...</div>
            ) : (
               <div className={cx('footer_pseudo')}></div>
            )}
         </div>
      </div>
   );
}

export default React.memo(Home);