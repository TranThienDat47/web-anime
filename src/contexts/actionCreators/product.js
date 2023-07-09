export const fetchSuggestedProductsRequest = () => ({
   type: 'FETCH_SUGGESTED_PRODUCTS_REQUEST',
});

export const fetchSuggestedProductsSuccess = (products) => ({
   type: 'FETCH_SUGGESTED_PRODUCTS_SUCCESS',
   payload: { products },
});

export const fetchSuggestedProductsFailure = (error) => ({
   type: 'FETCH_SUGGESTED_PRODUCTS_FAILURE',
   payload: { error },
});
