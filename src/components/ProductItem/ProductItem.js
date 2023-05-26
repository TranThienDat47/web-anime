import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import images from '~/assets/img';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import styles from './ProductItem.module.scss';
import { useEffect, useRef } from 'react';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductItem({ onClick, extraLarge = false, data, ...passProp }) {
   const animationRef = useRef();
   const itemRef = useRef();
   const click = useRef(false);
   const hoverOption = useRef(false);
   const itemWrapperRef = useRef();
   const optionRef = useRef();
   let props = {
      onClick,
      ...passProp,
   };

   const checkNode = (parent, children) => {
      let node = children.parentNode;
      while (node !== null) {
         if (node === parent) return true;
         node = node.parentNode;
      }
      return false;
   };

   useEffect(() => {
      document.addEventListener('click', (e) => {
         if (optionRef.current) {
            if (checkNode(optionRef.current, e.target) && !click.current) {
               optionRef.current.style.display = 'block';
               click.current = true;
               hoverOption.current = true;
            } else if (checkNode(optionRef.current, e.target) && click.current === true) {
               click.current = false;
               if (!hoverOption.current) {
                  optionRef.current.style.display = 'none';
               }
            } else if (!checkNode(optionRef.current, e.target) && click.current === true) {
               optionRef.current.style.display = 'none';
               click.current = false;
            }
         }
      });
   }, []);

   useEffect(() => {
      let start = false;

      itemWrapperRef.current.addEventListener('mousemove', (e) => {
         if (!click.current) {
            optionRef.current.style.display = 'block';
            hoverOption.current = true;
         }
      });

      itemWrapperRef.current.addEventListener('mouseout', (e) => {
         if (!click.current) {
            optionRef.current.style.display = 'none';
            hoverOption.current = false;
         }
      });

      document.addEventListener('mouseup', (e) => {
         if (start) {
            animationRef.current.style.transition = 'all 0.3s cubic-bezier(0.75, 1, 0.25, 0)';
            animationRef.current.style.border = '1px solid rgba(22, 24, 35, 0.6)';
            animationRef.current.style.backgroundColor = 'transparent';
            const temp = setTimeout(() => {
               animationRef.current.style.border = '1px solid rgba(22, 24, 35, 0.6)';
               clearTimeout(temp);
            }, 40);
            const temp1 = setTimeout(() => {
               animationRef.current.style.border = '1px solid rgba(22, 24, 35, 0.2)';
               clearTimeout(temp1);
            }, 80);
            const temp2 = setTimeout(() => {
               animationRef.current.style.border = '1px solid transparent';
               clearTimeout(temp2);
            }, 120);
            start = false;
         }
      });

      itemRef.current.addEventListener('dragend', (e) => {
         if (start) {
            animationRef.current.style.transition = 'all 0.3s cubic-bezier(0.75, 1, 0.25, 0)';
            animationRef.current.style.border = '1px solid rgba(22, 24, 35, 0.6)';
            animationRef.current.style.backgroundColor = 'transparent';
            const temp = setTimeout(() => {
               animationRef.current.style.border = '1px solid rgba(22, 24, 35, 0.6)';
               clearTimeout(temp);
            }, 40);
            const temp1 = setTimeout(() => {
               animationRef.current.style.border = '1px solid rgba(22, 24, 35, 0.2)';
               clearTimeout(temp1);
            }, 80);
            const temp2 = setTimeout(() => {
               animationRef.current.style.border = '1px solid transparent';
               clearTimeout(temp2);
            }, 120);
            start = false;
         }
      });

      itemRef.current.addEventListener('mousedown', (e) => {
         if (e.which === 1) {
            animationRef.current.style.backgroundColor = 'rgba(22, 24, 35, 0.1)';
            animationRef.current.style.transition = '0s';
            start = true;
         }
      });
   });

   const classes = cx('wrapper', {
      extraLarge,
   });

   return (
      <div ref={itemWrapperRef} className={cx('item-wrapper', { extraLarge })}>
         <Link to={`/product?id=${data._id}`} ref={itemRef} className={classes} {...props}>
            <div className={cx('wrapper-avt')}>
               <img
                  className={cx('avatar')}
                  alt="ok"
                  src={data.img || images.noImage}
                  onError={(e) => {
                     e.target.onerror = null;
                     e.target.src = images.noImage;
                  }}
               />
            </div>
            <div className={cx('info-wrapper')}>
               <div ref={animationRef} className={cx('animation')}></div>
               <div className={cx('info')}>
                  <h4 className={cx('name')}>
                     <div>{data.name}</div>
                  </h4>
                  <div className={cx('productname')}>{data.anotherName}</div>
                  <div className={cx('view')}>
                     {data.view && (
                        <>
                           <div className={cx('quantity')}>142.6N lượt xem</div>
                           {extraLarge || <span className={cx('sperator')}>|</span>}
                           <div className={cx('date')}>2 tháng trước</div>
                        </>
                     )}
                  </div>

                  {data.episodes ? (
                     <div className={cx('episode')}>
                        <span className={cx('current')}>12</span> /
                        <span className={cx('episodes')}>12</span>
                     </div>
                  ) : (
                     <></>
                  )}
               </div>
            </div>
         </Link>

         <div ref={optionRef} className={cx('show-option')}>
            <Button
               className={cx('option', 'menu')}
               transparent
               backgroundColor="rgba(255, 255, 255, 0.94)"
            >
               <HiOutlineDotsVertical />
            </Button>
         </div>
      </div>
   );
}

ProductItem.propTypes = {
   to: PropTypes.string,
   small: PropTypes.bool,
   large: PropTypes.string,
   onClick: PropTypes.func,
};

export default ProductItem;
