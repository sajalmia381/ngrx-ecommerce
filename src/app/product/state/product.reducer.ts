import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess } from './product.actions';
import { initialState, productAdapter } from './product.state';

const _productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return productAdapter.setAll(action.products, {
      ...state,
      loaded: true
    });
  })
);

export const productReducer = (state, action) => {
  return _productReducer(state, action);
};
