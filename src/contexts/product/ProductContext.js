import axios from 'axios';
import { createContext, useReducer, useEffect, useState } from 'react';

import { apiUrl } from '../../config/constants';

import { productReducer, initialState } from '~/reducers/productReducer';

const ProductContext = createContext();

export { ProductContext };

const LENGTH_PAGE = 12;

const ProductContextProvider = ({ children }) => {
   const [productState, dispatch] = useReducer(productReducer, initialState);

   const loadHomeSuggested = async (page) => {
      const response = await axios.get(
         `${apiUrl}/products/search?skip=${page * LENGTH_PAGE}&limit=${LENGTH_PAGE}`,
      );

      if (response.data.success) {
         if (response.data.products.length >= 12) {
            dispatch({
               type: 'FETCH_SUGGESTED_PRODUCTS_SUCCESS',
               payload: {
                  suggestedProducts: response.data.products,
                  hasMore: true,
                  pageSuggestedProducts: page,
               },
            });
         } else if (response.data.products.length > 0 && response.data.products.length < 12) {
            dispatch({
               type: 'FETCH_SUGGESTED_PRODUCTS_SUCCESS',
               payload: {
                  suggestedProducts: response.data.products,
                  hasMore: false,
                  pageSuggestedProducts: page,
               },
            });
         } else if (response.data.products.length < 0) {
            dispatch({
               type: 'FETCH_SUGGESTED_PRODUCTS_SUCCESS',
               payload: {
                  suggestedProducts: response.data.products,
                  hasMore: false,
                  pageSuggestedProducts: page - 1,
               },
            });
         }
      } else {
         dispatch({
            type: 'FETCH_SUGGESTED_PRODUCTS_FAILURE',
            payload: { error: null },
         });
      }
   };

   const beforeLoadHomeSuggested = async (page) => {
      dispatch({
         type: 'FETCH_SUGGESTED_PRODUCTS_REQUEST',
         payload: {},
      });
   };

   const loadNewHome = async () => {
      const response = await axios.get(
         `${apiUrl}/products/search?skip=0&limit=${LENGTH_PAGE}&recently=true`,
      );

      if (response.data.success) {
         dispatch({
            type: 'FETCH_NEW_PRODUCTS_SUCCESS',
            payload: {
               newProducts: response.data.products,
            },
         });
      }
   };

   const productContextData = {
      loadNewHome,
      loadHomeSuggested,
      beforeLoadHomeSuggested,
      productState,
   };

   return <ProductContext.Provider value={productContextData}>{children}</ProductContext.Provider>;
};

export default ProductContextProvider;
