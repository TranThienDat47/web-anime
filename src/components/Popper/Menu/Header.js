import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
   return (
      <header className={cx('header')}>
         <Button transparent className={cx('back-btn')} onClick={onBack}>
            <AiOutlineArrowLeft />
         </Button>
         <h4 className={cx('header-title')}>{title}</h4>
      </header>
   );
}

Header.propTypes = {
   title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
   onBack: PropTypes.func.isRequired,
};

export default Header;
