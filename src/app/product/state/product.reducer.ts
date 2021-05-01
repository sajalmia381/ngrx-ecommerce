import { createReducer, on } from '@ngrx/store';
import { deleteProductSucess, loadProductsSuccess, updateProductSucess } from './product.actions';
import { initialState, productAdapter } from './product.state';

const _productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return productAdapter.setAll(action.products, {
      ...state,
      loaded: true
    });
  }),
  on(updateProductSucess, (state, action) => {
    return productAdapter.updateOne(action.product, state);
  }),
  on(deleteProductSucess, (state, action) => {
    return productAdapter.removeOne(action.id, state);
  })
);

export const productReducer = (state, action) => {
  return _productReducer(state, action);
};
