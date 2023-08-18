import { createContext, useReducer, useEffect, useState } from 'react';

import { productReducer, initialState } from '~/reducers/productReducer';

import ProductServices from '~/services/ProductServices';

import {
   fetchNewProductsSuccess,
   fetchSuggestedProductsFailure,
   fetchSuggestedProductsRequest,
   fetchSuggestedProductsSuccess,
} from '../actionCreators/product';

const ProductContext = createContext();

export { ProductContext };

const LENGTH_PAGE = 12;

const ProductContextProvider = ({ children }) => {
   const [productState, dispatch] = useReducer(productReducer, initialState);

   const loadHomeSuggested = async (page) => {
      const response = await ProductServices.search(page * LENGTH_PAGE, LENGTH_PAGE);

      if (response.success) {
         if (response.products.length >= 12) {
            dispatch(
               fetchSuggestedProductsSuccess({
                  suggestedProducts: response.products,
                  hasMore: true,
                  pageSuggestedProducts: page,
               }),
            );
         } else if (response.products.length > 0 && response.products.length < 12) {
            dispatch(
               fetchSuggestedProductsSuccess({
                  suggestedProducts: response.products,
                  hasMore: false,
                  pageSuggestedProducts: page,
               }),
            );
         } else if (response.products.length < 0) {
            dispatch(
               fetchSuggestedProductsSuccess({
                  suggestedProducts: response.products,
                  hasMore: false,
                  pageSuggestedProducts: page - 1,
               }),
            );
         }
      } else {
         dispatch(fetchSuggestedProductsFailure({ error: null }));
      }
   };

   const beforeLoadHomeSuggested = async (page) => {
      dispatch(fetchSuggestedProductsRequest());
   };

   const loadNewHome = async () => {
      const response = await ProductServices.search(0, LENGTH_PAGE, true);

      if (response.success) {
         dispatch(
            fetchNewProductsSuccess({
               newProducts: response.products,
            }),
         );
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
