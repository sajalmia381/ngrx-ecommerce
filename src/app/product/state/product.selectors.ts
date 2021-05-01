import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { RouterStateUrl } from 'src/app/store/router/router.serializer';
import { productAdapter, ProductState } from './product.state';

export const PRODUCT_STATE_NAME = 'product';

export const getProductState = createFeatureSelector<ProductState>(PRODUCT_STATE_NAME);
export const productSelectors = productAdapter.getSelectors();

// products
export const getProducts = createSelector(getProductState, productSelectors.selectAll);
export const getProductEntities = createSelector(getProductState, productSelectors.selectEntities);
export const isLoaded = createSelector(getProductState, state => state.loaded);

// product
export const getProductById = createSelector(
  getProductEntities,
  getCurrentRoute,
  (products, route: RouterStateUrl) => {
    return products ? products[route?.params?.id] : null;
  }
);
