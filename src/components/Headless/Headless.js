import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Headless.module.scss';
import { memo, useRef } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Headless({
   children,
   className,
   render = defaultFn,
   visible = false,
   placement = 'top-left',
   onClick,
   // onClickOutside = defaultFn,
   offset = [],
   ...passProp
}) {
   let props = {
      onClick,
      ...passProp,
   };
   const wrapperRef = useRef();

   // const checkNode = (parent, children) => {
   //    let node = children.parentNode;
   //    while (node !== null) {
   //       if (node === parent) return true;
   //       node = node.parentNode;
   //    }
   //    return false;
   // };

   // useEffect(() => {
   //    window.addEventListener('click', (e) => {
   //       if (!checkNode(wrapperRef.current, e.target)) {
   //          return onClickOutside(e);
   //       }
   //    });
   // }, []);

   const classes = cx('wrapper', {
      [className]: className,
      [className]: placement,
   });

   return (
      <div ref={wrapperRef} className={classes} {...props}>
         {children}
         {!visible || (
            <div
               style={{ top: `calc(100% + ${offset[0]}px)`, left: `${offset[1]}px` }}
               className={cx('headless')}
            >
               {render()}
            </div>
         )}
      </div>
   );
}

Headless.propTypes = {
   children: PropTypes.node.isRequired,
};

export default memo(Headless);
