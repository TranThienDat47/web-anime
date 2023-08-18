const fetchSuggestedProductsRequest = () => ({
   type: 'FETCH_SUGGESTED_PRODUCTS_REQUEST',
   payload: {},
});

const fetchSuggestedProductsSuccess = ({ suggestedProducts, hasMore, pageSuggestedProducts }) => ({
   type: 'FETCH_SUGGESTED_PRODUCTS_SUCCESS',
   payload: { suggestedProducts, hasMore, pageSuggestedProducts },
});

const fetchSuggestedProductsFailure = ({ error }) => ({
   type: 'FETCH_SUGGESTED_PRODUCTS_FAILURE',
   payload: { error },
});

const fetchNewProductsSuccess = ({ newProducts }) => ({
   type: 'FETCH_NEW_PRODUCTS_SUCCESS',
   payload: {
      newProducts,
   },
});

export {
   fetchSuggestedProductsRequest,
   fetchSuggestedProductsSuccess,
   fetchSuggestedProductsFailure,
   fetchNewProductsSuccess,
};
