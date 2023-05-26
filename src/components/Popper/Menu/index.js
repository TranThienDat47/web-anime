import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import { wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, className, onChange = defaultFn }) {
   const [history, setHistory] = useState([{ data: items }]);
   const current = history[history.length - 1];

   const renderItem = () => {
      return current.data.map((item, index) => {
         const isParent = !!item.children;
         return (
            <MenuItem
               key={index}
               data={item}
               onClick={() => {
                  if (isParent) {
                     setHistory((prev) => [...prev, item.children]);
                  } else {
                     onChange(item);
                  }
               }}
            />
         );
      });
   };

   const renderResult = (attrs) => (
      <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
         <PopperWrapper className={cx('menu-wrapper', className)}>
            {history.length > 1 && (
               <Header
                  title={current.title}
                  onBack={() => {
                     setHistory((prev) => prev.slice(0, prev.length - 1));
                  }}
               />
            )}
            <div className={cx('menu-body')}> {renderItem()}</div>
         </PopperWrapper>
      </div>
   );

   const handleResetMenu = () => {
      setHistory((prev) => prev.slice(0, 1));
   };

   return (
      <Tippy
         interactive
         delay={[0, 600]}
         hideOnClick={hideOnClick}
         offset={[12, 8]}
         placement="bottom-end"
         render={renderResult}
         onHide={handleResetMenu}
      >
         {children}
      </Tippy>
   );
}

Menu.propTypes = {
   children: PropTypes.node.isRequired,
   onChange: PropTypes.func,
   hideOnClick: PropTypes.bool,
   items: PropTypes.array,
   className: PropTypes.string,
};

export default Menu;
