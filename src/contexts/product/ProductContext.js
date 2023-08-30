import { createContext, useReducer, useEffect, useState } from 'react';

import { productReducer, initialState } from '~/reducers/productReducer';

import ProductServices from '~/services/ProductServices';

import {
   fetchNewProductsSuccess,
   fetchSuggestedProductsFailure,
   fetchSuggestedProductsRequest,
   fetchSuggestedProductsSuccess,
   fetchSearchResultProductsRequest,
   fetchSearchResultProductsSuccess,
   fetchSearchResultProductsFailure,
   setKeySearchProduct,
} from '../actionCreators/product';

const ProductContext = createContext();

export { ProductContext };

const LENGTH_PAGE = 12;

const ProductContextProvider = ({ children }) => {
   const [productState, dispatch] = useReducer(productReducer, initialState);

   const loadKeySearch = async (keySearch) => {
      dispatch(setKeySearchProduct({ keySearch }));
   };

   const beforeLoadSearchResult = async () => {
      dispatch(fetchSearchResultProductsRequest());
   };

   const loadSearchResult = async (page) => {
      const response = await ProductServices.search({
         skip: page * LENGTH_PAGE,
         limit: LENGTH_PAGE,
         key: productState.keySearch,
      });
      console.log(productState.keySearch);

      if (response.success) {
         console.log(response);
         if (response.products.length >= 12) {
            dispatch(
               fetchSearchResultProductsSuccess({
                  searchResultProducts: response.products,
                  hasMore: true,
                  pageSearchResultProducts: page,
               }),
            );
         } else if (response.products.length > 0 && response.products.length < 12) {
            dispatch(
               fetchSearchResultProductsSuccess({
                  searchResultProducts: response.products,
                  hasMore: false,
                  pageSearchResultProducts: page,
               }),
            );
         } else if (response.products.length <= 0) {
            dispatch(
               fetchSearchResultProductsSuccess({
                  searchResultProducts: response.products,
                  hasMore: false,
                  pageSearchResultProducts: page - 1,
               }),
            );
         }
      } else {
         dispatch(fetchSearchResultProductsFailure({ error: null }));
      }
   };

   const loadHomeSuggested = async (page) => {
      const response = await ProductServices.search({
         skip: page * LENGTH_PAGE,
         limit: LENGTH_PAGE,
      });

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
         } else if (response.products.length <= 0) {
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

   const beforeLoadHomeSuggested = async () => {
      dispatch(fetchSuggestedProductsRequest());
   };

   const loadNewHome = async () => {
      const response = await ProductServices.search({
         skip: 0,
         limit: LENGTH_PAGE,
         recently: true,
      });

      if (response.success) {
         dispatch(
            fetchNewProductsSuccess({
               newProducts: response.products,
            }),
         );
      }
   };

   const productContextData = {
      productState,
      loadNewHome,
      loadHomeSuggested,
      beforeLoadHomeSuggested,
      loadSearchResult,
      beforeLoadSearchResult,
      loadKeySearch,
   };

   return <ProductContext.Provider value={productContextData}>{children}</ProductContext.Provider>;
};

export default ProductContextProvider;
