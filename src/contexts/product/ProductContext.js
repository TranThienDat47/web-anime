import axios from 'axios';
import { createContext, useReducer, useEffect, useState } from 'react';

import { apiUrl } from '../constants';

import { productReducer, initialState } from '~/reducers/productReducer';

const ProductContext = createContext();

export { ProductContext };

const LENGTH_PAGE = 12;

const ProductContextProvider = ({ children }) => {
   const [productState, dispatch] = useReducer(productReducer, initialState);

   const [pageSuggested, setPageSuggested] = useState(0);

   const loadHomeSuggested = async () => {
      const response = await axios.get(
         `${apiUrl}/products/search?skip=${pageSuggested}&limit=${LENGTH_PAGE}`,
      );

      if (response.data.success) {
         dispatch({
            type: 'FETCH_SUGGESTED_PRODUCTS_SUCCESS',
            payload: {
               suggestedProducts: response.data.products,
            },
         });
      }

      setPageSuggested((prev) => prev + LENGTH_PAGE);
   };

   useEffect(() => {
      loadHomeSuggested();
   }, []);

   const loginUser = async (userForm) => {};

   const registerUser = async (userForm) => {};
   const productContextData = {
      loginUser,
      loadHomeSuggested,
      registerUser,
      productState,
   };

   return <ProductContext.Provider value={productContextData}>{children}</ProductContext.Provider>;
};

export default ProductContextProvider;
