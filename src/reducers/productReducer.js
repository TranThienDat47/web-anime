export const initialState = {
   allProducts: [],
   newProducts: [],
   suggestedProducts: [],
   loading: false,
   loadingMore: false,
   error: null,
   hasMore: true,
};

export const productReducer = (state, action) => {
   const {
      type,
      payload: { allProducts, newProducts, suggestedProducts, error },
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
            loading: false,
            suggestedProducts: [...state.suggestedProducts, ...suggestedProducts],
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
