import classNames from 'classnames/bind';
import styles from './ListProducts.module.scss';

import { ProductItem } from '~/components/ProductItem';

const cx = classNames.bind(styles);

function ListProducts({ data = [], ...props }) {
   return (
      <div className={cx('wrapper')}>
         <ul className={cx('list')}>
            {data.map((res, index) => (
               <li key={index} className={cx('item')}>
                  <ProductItem extraLarge data={res} />
               </li>
            ))}
         </ul>
      </div>
   );
}

export default ListProducts;
