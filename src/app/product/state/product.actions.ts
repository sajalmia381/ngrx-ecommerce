import { createAction, props } from '@ngrx/store';
import { Product } from './product';

export const LOAD_PRODUCTS = '[product] load products';
export const ADD_PRODUCTS = '[product] add products';

export const loadProducts = createAction(LOAD_PRODUCTS);
export const loadProductsSuccess = createAction(ADD_PRODUCTS, props<{ products: Product[] }>());


export const dummyAction = createAction('[product] dummy action')