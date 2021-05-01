import { createReducer, on } from '@ngrx/store';
import { loadProducts } from './product.actions';
import { initialState, productAdaptar } from './product.state';

const _productReducer = createReducer(
  initialState,
  on(loadProducts, (state, action) => {
    return productAdaptar.setAll(action.products, {
      ...state
    });
  })
);

export const productReducer = (state, action) => {
  return _productReducer(state, action);
};
