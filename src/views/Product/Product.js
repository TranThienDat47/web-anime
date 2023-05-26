import classNames from 'classnames/bind';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);

const Product = () => {
   return <div className={cx('wrapper')}>Product</div>;
};

export default Product;
