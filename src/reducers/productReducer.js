export const initialState = {
   allProducts: [],
   newProducts: [],
   suggestedProducts: [],
   pageSuggestedProducts: -1,
   loading: false,
   loadingMore: true,
   error: null,
   hasMore: true,
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
      },
   } = action;

   switch (type) {
      case 'FETCH_PRODUCTS_REQUEST':
         return {
            ...state,
            loading: true,
         };
      case 'FETCH_PRODUCTS_SUCCESS':
         return {
            ...state,
            loading: false,
            allProducts,
         };
      case 'FETCH_PRODUCTS_FAILURE':
         return {
            ...state,
            loading: false,
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
