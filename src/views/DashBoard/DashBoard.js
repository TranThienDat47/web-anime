import classNames from 'classnames/bind';
import styles from './DashBoard.module.scss';

const cx = classNames.bind(styles);

const DashBoard = () => {
   return <div className={cx('wrapper')}></div>;
};

export default DashBoard;
