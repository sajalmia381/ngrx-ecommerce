import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Product } from './product';

export const LOAD_PRODUCTS = '[product] load products';
export const ADD_PRODUCTS = '[product] add products';
export const DELETE_PRODUCT = '[product] delete product';
export const DELETE_PRODUCT_SUCCESS = '[product] delete product SUCCESS';
export const UPDATE_PRODUCT = '[product] update product';
export const UPDATE_PRODUCT_SUCCESS = '[product] update product Success';

export const loadProducts = createAction(LOAD_PRODUCTS);
export const loadProductsSuccess = createAction(ADD_PRODUCTS, props<{ products: Product[] }>());
export const updateProduct = createAction(UPDATE_PRODUCT, props<{ product: Product }>());
export const updateProductSuccess = createAction(
  UPDATE_PRODUCT_SUCCESS,
  props<{ product: Update<Product> }>()
);
export const deleteProduct = createAction(DELETE_PRODUCT, props<{ id: number | string }>());
export const deleteProductSuccess = createAction(DELETE_PRODUCT_SUCCESS, props<{ id: number }>());

export const dummyAction = createAction('[product] dummy action');
