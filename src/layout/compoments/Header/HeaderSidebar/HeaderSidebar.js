import classNames from 'classnames/bind';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import imgs from '~/assets/img';
import config from '~/config';
import styles from './HeaderSidebar.module.scss';

const cx = classNames.bind(styles);

const HeaderSidebar = forwardRef((prop, ref) => {
   const navRef = useRef();
   const pseudoRef = useRef();
   let drag = useRef(false);
   let clientX_temp = 0,
      right,
      width;

   const [showNav, setShowNav] = useState(false);

   const handleMouseDownNav = (e) => {
      if (e.which === 1) {
         drag.current = true;
         if (pseudoRef.current.style.display === 'none' || !pseudoRef.current.style.display) {
            pseudoRef.current.style.opacity = 0;
         }
         pseudoRef.current.style.display = 'block';

         const clientX = e.clientX;
         right = navRef.current.getBoundingClientRect().right;
         width = navRef.current.getBoundingClientRect().width;
         clientX_temp = right - clientX;
      }
   };

   const handleMouseMoveNav = (e) => {
      if (drag.current && e.which === 1) {
         navRef.current.style.transition = '';
         const clientX = e.clientX;
         let x = clientX + clientX_temp - width;
         let y = (clientX + clientX_temp) / 240;

         if (x < -240) navRef.current.style.left = -240 + 'px';
         else if (x > 0) navRef.current.style.left = 0 + 'px';
         else navRef.current.style.left = x + 'px';

         if (y * 0.4 <= 0.4) pseudoRef.current.style.opacity = y * 0.4;
         else pseudoRef.current.style.opacity = 0.4;
      }
   };

   const handleMouseUpNav = (e) => {
      if (drag.current && e.which === 1) {
         drag.current = false;
         const right = navRef.current.getBoundingClientRect().right;

         if (right >= (width * 1) / 2) {
            navRef.current.style.left = 0 + 'px';
            navRef.current.style.transition = '0.15s cubic-bezier(0.25, 0.55, 0, 0)';
         } else if (right < (width * 1) / 2) {
            navRef.current.style.transition = '0.2s cubic-bezier(0, 0, 0, 1)';
            navRef.current.style.left = -240 + 'px';
            pseudoRef.current.style.display = 'none';
         }
      }
   };

   useEffect(() => {
      const temp = navRef.current;
      if (temp) temp.addEventListener('mousedown', handleMouseDownNav);
      document.addEventListener('mousemove', handleMouseMoveNav);
      document.addEventListener('mouseup', handleMouseUpNav);

      return () => {
         temp.removeEventListener('mousedown', handleMouseDownNav);
         document.removeEventListener('mousemove', handleMouseMoveNav);
         document.removeEventListener('mouseup', handleMouseUpNav);
      };
   });

   const handleShowNav = () => {
      navRef.current.style.left = 0 + 'px';

      pseudoRef.current.style.display = 'block';
      pseudoRef.current.style.opacity = 0.4;
   };

   const handleHideNav = () => {
      pseudoRef.current.style.display = 'none';
      navRef.current.style.left = -240 + 'px';
   };

   useEffect(() => {
      if (showNav) {
         handleShowNav();
      } else handleHideNav();
   }, [showNav]);

   useImperativeHandle(ref, () => ({
      showAndHide() {
         setShowNav((prev) => !prev);
      },
   }));

   return (
      <>
         <div className={cx('nav')} ref={navRef}>
            <div className={cx('header-wrapper')}>
               <AiOutlineMenu
                  className={cx('icon')}
                  onClick={() => {
                     setShowNav((prev) => !prev);
                  }}
               />
               <Link to={config.routes.home} className={cx('logo-link')}>
                  <img src={imgs.logo} alt="Blog" />
               </Link>
            </div>
            <div className={cx('item')}></div>
         </div>
         <div className={cx('pseudo')} ref={pseudoRef} onClick={handleHideNav}></div>
      </>
   );
});

export default HeaderSidebar;
