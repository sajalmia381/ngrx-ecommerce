import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from './product';

export interface ProductState extends EntityState<Product> {
  // add extra fields
  loaded: boolean;
}

export const productAdapter = createEntityAdapter<Product>({
  // adds extra
});

export const initialState = productAdapter.getInitialState({
  loaded: false
});
