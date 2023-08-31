import axios from 'axios';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { memo, useEffect, useRef, useState, useContext } from 'react';

import { useDebounce } from '~/hook';
import styles from './Search.module.scss';
import SearchResult from './SearchResult';
import { apiUrl } from '~/config/constants';
import Headless from '~/components/Headless';
import { MdOutlineClear } from 'react-icons/md';
import { IoSearchOutline } from 'react-icons/io5';
import { ProductContext } from '~/contexts/product';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Search() {
   const {
      productState: { tempSelectSearchResult },
      loadTempSelectSearchResult,
   } = useContext(ProductContext);

   const navigate = useNavigate();

   const [searchResult, setSearchResult] = useState([]);
   const [searchValue, setSearchValue] = useState('');
   const [showResult, setShowResult] = useState(true);

   const searchValueDebound = useDebounce(searchValue, 84);

   const inputRef = useRef();
   const blurRef = useRef(false);
   const btnSearchRef = useRef();

   let mouseDownRef = useRef(false);
   let mouseLeaveRef = useRef(false);

   const checkNode = (parent, children) => {
      let node = children.parentNode;
      while (node !== null) {
         if (node === parent) return true;
         node = node.parentNode;
      }
      return false;
   };

   useEffect(() => {
      if (!searchValueDebound.trim()) {
         setSearchResult([]);
         return;
      } else {
         const loadUser = async () => {
            const response = await axios.get(
               `${apiUrl}/products/search?skip=0&limit=10&key=${searchValueDebound}&recently=true`,
            );
            setSearchResult(response.data.products);
         };
         loadUser();
      }
   }, [searchValueDebound]);

   useEffect(() => {
      btnSearchRef.current.onclick = (event) => {
         if (searchValue.trim() !== '') {
            navigate(`/search?search_query=${searchValue}`);
            inputRef.current.blur();
            setShowResult(false);
         }
      };
   }, [searchValue]);

   useEffect(() => {
      inputRef.current.onkeydown = (event) => {
         if (event.key === 'Enter' && searchValue.trim() !== '') {
            if (!!!tempSelectSearchResult) {
               btnSearchRef.current.click();
               return;
            }

            navigate(`/product?id=${tempSelectSearchResult}`);
            inputRef.current.blur();
            setShowResult(false);
            loadTempSelectSearchResult('');
         }
      };
   }, [searchValue, tempSelectSearchResult]);

   const handleMouseDown = (e) => {
      if (e.button === 0) {
         if (inputRef.current.parentNode.parentNode.children[1]) {
            if (checkNode(inputRef.current.parentNode.parentNode.children[1], e.target)) {
               blurRef.current = true;
            }
            mouseDownRef.current = false;
         }
      } else {
         e.preventDefault();
      }
   };

   const handleMouseUp = (e) => {
      if (e.button === 0) {
         if (!mouseLeaveRef.current) {
            const temp = setTimeout(() => {
               inputRef.current.blur();
               clearTimeout(temp);
            }, 0);
         } else {
            mouseLeaveRef.current = false;
         }
      }
   };

   const handleLeave = () => {
      if (mouseDownRef.current) {
         mouseLeaveRef.current = true;
      } else {
         blurRef.current = true;
      }
   };

   const handleRender = () => (
      <div className={cx('search-result')} tabIndex="-1">
         <PopperWrapper className={cx('search-item')}>
            <h4 className={cx('search-title')}>Results</h4>
            <SearchResult
               result={searchResult}
               onMouseDown={handleMouseDown}
               onMouseUp={handleMouseUp}
               onMouseLeave={handleLeave}
            />
         </PopperWrapper>
      </div>
   );

   const handleChange = (e) => {
      const searchValue = e.target.value;
      if (!searchValue.startsWith(' ')) setSearchValue(searchValue);
   };

   const handleClear = () => {
      inputRef.current.focus();
      setSearchResult([]);
      setSearchValue('');
   };

   return (
      <Headless
         visible={showResult && searchValueDebound.trim().length > 0 && searchResult.length > 0}
         className={cx('wrapper')}
         offset={[9, 0]}
         render={handleRender}
         onMouseLeave={() => {
            blurRef.current = false;
         }}
      >
         <div className={cx('search')}>
            <input
               ref={inputRef}
               placeholder="Search..."
               spellCheck={false}
               value={searchValue}
               onChange={handleChange}
               onFocus={() => {
                  setShowResult(true);
               }}
               onBlur={(e) => {
                  setShowResult(false);
                  if (!blurRef.current) {
                  } else {
                     blurRef.current = false;
                     inputRef.current.focus();
                  }
               }}
            />
            {!!searchValue && (
               <button className={cx('clear')} onClick={handleClear}>
                  <MdOutlineClear />
               </button>
            )}

            <button
               className={cx('search-btn', 'tooltip')}
               name-tooltip={'Search'}
               ref={btnSearchRef}
               onMouseDown={(e) => {
                  e.preventDefault();
                  inputRef.current.blur();
                  setShowResult(false);
               }}
            >
               <IoSearchOutline className={cx('search-color')} />
            </button>
         </div>
      </Headless>
   );
}

export default memo(Search);
