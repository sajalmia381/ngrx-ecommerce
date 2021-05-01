import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productAdapter, ProductState } from "./product.state";

export const PRODUCT_STATE_NAME = 'product';

export const getProductState = createFeatureSelector<ProductState>(PRODUCT_STATE_NAME);
export const productSelectors = productAdapter.getSelectors();

export const getProducts = createSelector(getProductState, productSelectors.selectAll);
export const getProductEntities = createSelector(getProductState, productSelectors.selectEntities);
export const isLoaded = createSelector(getProductState, (state) => state.loaded)