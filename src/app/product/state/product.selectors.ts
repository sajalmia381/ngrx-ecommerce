import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productAdaptar } from "./product.state";

export const PRODUCT_STATE_NAME = 'product';

export const getProductState = createFeatureSelector(PRODUCT_STATE_NAME);
export const productSelectors = productAdaptar.getSelectors();

export const getProducts = createSelector(getProductState, productSelectors.selectAll)
export const getProductEntites = createSelector(getProductState, productSelectors.selectEntities)