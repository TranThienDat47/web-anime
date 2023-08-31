import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import styles from './Search.module.scss';
import { ListProductSearch } from '~/components/ListProduct';
import { ProductContext } from '~/contexts/product';
import LazyLoading from '~/components/loading/LazyLoading';

const cx = classNames.bind(styles);

const Search = () => {
   const {
      productState: {
         searchResultProducts,
         pageSearchResultProducts,
         hasMore,
         loadingMore,
         keySearch,
      },
      beforeLoadSearchResult,
      loadSearchResult,
      loadKeySearch,
   } = useContext(ProductContext);

   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const search_query = params.get('search_query');

   useEffect(() => {
      loadKeySearch(search_query);

      if (keySearch.trim() !== '') beforeLoadSearchResult();
   }, [keySearch, search_query]);

   return (
      <div className={cx('wrapper')}>
         <div className={cx('inner')}>
            <div className={cx('header')}>
               <p className={cx('string-formatted')}>
                  Kết quả tìm kiếm cho từ khóa: "
                  <span className={cx('string-formatted strong')}>{search_query}</span>"
               </p>
            </div>
            <div className={cx('result')}>
               <LazyLoading
                  hasMore={hasMore}
                  loadingMore={loadingMore}
                  pageCurrent={pageSearchResultProducts}
                  beforeLoad={beforeLoadSearchResult}
                  loadProductMore={loadSearchResult}
               >
                  <ListProductSearch data={searchResultProducts} />
               </LazyLoading>
            </div>
         </div>
      </div>
   );
};

export default Search;
