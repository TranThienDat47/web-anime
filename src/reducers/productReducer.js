export const initialState = {
   newProducts: [],
   allProducts: [],
   suggestedProducts: [],
   recommendProducts: [],
   searchResultProducts: [],
   searchSuggestedProducts: [],
   pageSuggestedProducts: -1,
   pageRecommendProducts: -1,
   pageSearchResultProducts: -1,
   keySearch: '',
   tempSelectSearchResult: '',
   hasMore: false,
   loading: false,
   loadingMore: false,
   error: null,
};

export const productReducer = (state, action) => {
   const {
      type,
      payload: {
         error,
         hasMore,
         keySearch,
         allProducts,
         newProducts,
         suggestedProducts,
         recommendProducts,
         searchResultProducts,
         searchSuggestedProducts,
         pageSearchResultProducts,
         pageRecommendProducts,
         pageSuggestedProducts,
         tempSelectSearchResult,
      },
   } = action;

   switch (type) {
      case 'SET_TEMP_SELECT_SEARCH_RESULT_REQUEST':
         return {
            ...state,
            tempSelectSearchResult,
         };
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

      case 'FETCH_RECOMMEND_PRODUCTS_REQUEST':
         return {
            ...state,
            loadingMore: true,
            hasMore: true,
         };
      case 'FETCH_RECOMMEND_PRODUCTS_SUCCESS':
         return {
            ...state,
            loadingMore: false,
            recommendProducts: [...state.recommendProducts, ...recommendProducts],
            hasMore,
            pageRecommendProducts,
         };
      case 'FETCH_RECOMMEND_PRODUCTS_FAILURE':
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
