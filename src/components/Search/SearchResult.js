import { memo, useCallback, useEffect, useRef, useState, useContext } from 'react';
import { ProductItemSmall } from '~/components/ProductItem';
import { ProductContext } from '~/contexts/product';

function SearchResult({ result = [], ...passProp }) {
   const { loadTempSelectSearchResult } = useContext(ProductContext);
   const [hover, setHover] = useState(-1);
   const resultRef = useRef();
   let tempRef = useRef('');
   let tempHover = useRef(-1);

   const checkNode = (parent, children) => {
      let node = children.parentNode;
      while (node !== null) {
         if (node === parent) return true;
         tempRef = node;
         node = node.parentNode;
      }
      return false;
   };

   const handleMouseOver = useCallback((e) => {
      if (resultRef.current) {
         if (checkNode(resultRef.current, e.target)) {
            if (tempHover.current !== +tempRef.children[0].id) {
               setHover(+tempRef.children[0].id);
               tempHover.current = +tempRef.children[0].id;
            }
         }
      }
   }, []);

   const handleKey = useCallback(
      (e) => {
         if (resultRef.current) {
            if (e.key === 'ArrowDown') {
               setHover((prev) => {
                  if (prev + 1 > result.length - 1) {
                     resultRef.current.parentNode.parentNode.parentNode.parentNode.children[0].children[0].value =
                        document.getElementById(0).children[1].children[0].children[0].textContent;

                     return 0;
                  } else {
                     resultRef.current.parentNode.parentNode.parentNode.parentNode.children[0].children[0].value =
                        document.getElementById(
                           prev + 1,
                        ).children[1].children[0].children[0].textContent;

                     return prev + 1;
                  }
               });
            } else if (e.key === 'ArrowUp') {
               e.preventDefault();
               setHover((prev) => {
                  if (prev - 1 < 0) {
                     resultRef.current.parentNode.parentNode.parentNode.parentNode.children[0].children[0].value =
                        document.getElementById(
                           result.length - 1,
                        ).children[1].children[0].children[0].textContent;
                     return result.length - 1;
                  } else {
                     resultRef.current.parentNode.parentNode.parentNode.parentNode.children[0].children[0].value =
                        document.getElementById(
                           prev - 1,
                        ).children[1].children[0].children[0].textContent;
                     return prev - 1;
                  }
               });
            }
         }
      },
      [result.length],
   );

   useEffect(() => {
      if (hover > -1)
         loadTempSelectSearchResult(document.getElementById(hover).href.split('id=')[1]);
   }, [hover]);

   useEffect(() => {
      // window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('keydown', handleKey);

      return () => {
         // window.removeEventListener('mouseover', handleMouseOver);
         window.removeEventListener('keydown', handleKey);
      };
   }, [handleKey, handleMouseOver]);

   return (
      <div
         ref={resultRef}
         style={{ display: 'flex', flexDirection: 'column' }}
         onMouseLeave={() => {
            setHover(-1);
            tempHover.current = -1;
         }}
         onMouseOver={handleMouseOver}
      >
         {result.map((res, index) => (
            <ProductItemSmall
               hover={hover === index ? true : false}
               data={res}
               small
               key={index}
               id={index}
               {...passProp}
            />
         ))}
      </div>
   );
}

export default memo(SearchResult);
