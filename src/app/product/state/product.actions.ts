import { createAction, props } from '@ngrx/store';
import { Product } from './product';

export const ADD_PRODUCTS = '[product] load products';

export const loadProducts = createAction(ADD_PRODUCTS, props<{ products: Product[] }>());
