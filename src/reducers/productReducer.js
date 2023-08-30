export const initialState = {
   allProducts: [],
   searchSuggestedProducts: [],
   searchResultProducts: [],
   newProducts: [],
   suggestedProducts: [],
   pageSuggestedProducts: -1,
   pageSearchResultProducts: -1,
   keySearch: '',
   loading: false,
   loadingMore: false,
   error: null,
   hasMore: false,
};

export const productReducer = (state, action) => {
   const {
      type,
      payload: {
         allProducts,
         newProducts,
         suggestedProducts,
         error,
         hasMore,
         loadingMore,
         pageSuggestedProducts,
         searchSuggestedProducts,
         searchResultProducts,
         pageSearchResultProducts,
         keySearch,
      },
   } = action;

   switch (type) {
      case 'FETCH_SEARCH_SUGGESTED_PRODUCTS_REQUEST':
         return {
            ...state,
            loading: true,
         };
      case 'FETCH_SEARCH_SUGGESTED_PRODUCTS_SUCCESS':
         return {
            ...state,
            loading: false,
            searchSuggestedProducts,
         };
      case 'FETCH_SEARCH_SUGGESTED_PRODUCTS_FAILURE':
         return {
            ...state,
            loading: false,
            error,
         };
      case 'FETCH_KEY_SEARCH_PRODUCTS_REQUEST':
         return {
            ...state,
            pageSearchResultProducts: -1,
            searchResultProducts: [],
            keySearch,
         };
      case 'FETCH_SEARCH_RESULT_PRODUCTS_REQUEST':
         return {
            ...state,
            loadingMore: true,
            hasMore: true,
         };
      case 'FETCH_SEARCH_RESULT_PRODUCTS_SUCCESS':
         return {
            ...state,
            loadingMore: false,
            searchResultProducts: [...state.searchResultProducts, ...searchResultProducts],
            hasMore,
            pageSearchResultProducts,
         };
      case 'FETCH_SEARCH_RESULT_PRODUCTS_FAILURE':
         return {
            ...state,
            loadingMore: false,
            error,
         };

      case 'FETCH_NEW_PRODUCTS_SUCCESS':
         return {
            ...state,
            loading: false,
            newProducts,
         };
      case 'FETCH_SUGGESTED_PRODUCTS_REQUEST':
         return {
            ...state,
            loadingMore: true,
            hasMore: true,
         };
      case 'FETCH_SUGGESTED_PRODUCTS_SUCCESS':
         return {
            ...state,
            loadingMore: false,
            suggestedProducts: [...state.suggestedProducts, ...suggestedProducts],
            hasMore,
            pageSuggestedProducts,
         };
      case 'FETCH_SUGGESTED_PRODUCTS_FAILURE':
         return {
            ...state,
            loadingMore: false,
            error,
         };
      case 'FETCH_ALL_PRODUCTS_SUCCESS':
         return {
            ...state,
            allProducts,
         };
      default:
         return state;
   }
};
