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
   const moveNavRef = useRef(false);
   const drag = useRef(false);
   // let clientX_temp = 0,
   //    right,
   //    width;

   const [showNav, setShowNav] = useState(false);

   const withTempRef = useRef(0);
   const rightRef = useRef(0);
   const widthRef = useRef(0);

   const handleMouseDownNav = (e) => {
      if (e.which === 1) {
         drag.current = true;
         if (pseudoRef.current.style.display === 'none' || !pseudoRef.current.style.display) {
            pseudoRef.current.style.opacity = 0;
         }

         rightRef.current = navRef.current.getBoundingClientRect().right;
         widthRef.current = navRef.current.getBoundingClientRect().width;
         withTempRef.current = rightRef.current - e.clientX;
      }
   };

   const handleMouseMoveNav = (e) => {
      if (drag.current && e.which === 1) {
         if (!moveNavRef.current) {
            pseudoRef.current.style.display = 'block';
            navRef.current.style.transition = 'none';
            moveNavRef.current = true;
         }

         if (e.clientX + withTempRef.current - widthRef.current < -240)
            navRef.current.style.left = -240 + 'px';
         else if (e.clientX + withTempRef.current - widthRef.current > 0)
            navRef.current.style.left = 0 + 'px';
         else {
            navRef.current.style.left = e.clientX + withTempRef.current - widthRef.current + 'px';

            pseudoRef.current.style.opacity = ((e.clientX + withTempRef.current) / 240) * 0.4;
         }
      }
   };

   const handleMouseUpNav = (e) => {
      if (drag.current) {
         drag.current = false;
         if (moveNavRef.current && e.which === 1) {
            const right = navRef.current.getBoundingClientRect().right;
            if (right >= (widthRef.current * 1) / 2) {
               navRef.current.style.left = 0 + 'px';
               navRef.current.style.transition = '0.15s cubic-bezier(0.25, 0.55, 0, 0)';
               moveNavRef.current = false;

               setShowNav(true);
            } else if (right < (widthRef.current * 1) / 2) {
               navRef.current.style.transition = '0.2s cubic-bezier(0, 0, 0, 1)';
               navRef.current.style.left = -240 + 'px';
               moveNavRef.current = false;

               // setShowNav(false);

               setShowNav(false);
               handleHideNav();
            }
         }
      }

      moveNavRef.current = false;
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
   }, [moveNavRef.current]);

   const handleShowNav = () => {
      navRef.current.style.left = 0 + 'px';

      pseudoRef.current.style.display = 'block';
      pseudoRef.current.style.opacity = 0.4;
   };

   const handleHideNav = () => {
      drag.current = false;
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
         <div
            className={cx('pseudo')}
            ref={pseudoRef}
            onClick={() => {
               setShowNav((prev) => !prev);
            }}
         ></div>
      </>
   );
});

export default HeaderSidebar;
