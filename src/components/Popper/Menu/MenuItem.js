import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick, small }) {
   const classes = cx('menu-item', {
      separate: data.separate,
      small,
   });
   return (
      <Button
         className={classes}
         to={data.to}
         leftIcon={data.left_icon}
         rightIcon={data.right_icon}
         onClick={onClick}
      >
         {data.title}
      </Button>
   );
}

MenuItem.propTypes = {
   data: PropTypes.object.isRequired,
   onClick: PropTypes.func,
};

export default MenuItem;
