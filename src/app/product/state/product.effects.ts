import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { Product } from './product';
import * as productAction from './product.actions';
import { getProductById, getProducts, isLoaded } from './product.selectors';
@Injectable()
export class ProductEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private productService: ProductService
  ) {}
  loadProducts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(productAction.loadProducts),
      withLatestFrom(this.store.select(isLoaded)),
      mergeMap(([action, loaded]) => {
        if (!loaded) {
          return this.productService.getProducts().pipe(
            map(products => {
              return productAction.loadProductsSuccess({ products });
            })
          );
        }
        return of(productAction.dummyAction());
      })
    );
  });
  loadSingleProduct$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        console.log('router event', r);
        return r.payload.routerState.url.startsWith('/products/');
      }),
      map((r: RouterNavigatedAction) => {
        console.log('router event inner', r);
        return r.payload.routerState['params']['id'];
      }),
      withLatestFrom(this.store.select(getProducts)),
      switchMap(([id, products]) => {
        console.log(products.length);
        if (id && !products.length) {
          return this.productService.getProduct(id).pipe(
            map(product => {
              const postData = [{ ...product, id }];
              return productAction.loadProductsSuccess({ products: postData });
            })
          );
        }
        return of(productAction.dummyAction());
      })
    );
  });
  updateProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(productAction.updateProduct),
      switchMap(action => {
        return this.productService.updateProduct(action.product).pipe(
          map(product => {
            const updatedProduct: Update<Product> = {
              id: action.product.id,
              changes: {
                ...action.product
              }
            };
            return productAction.updateProductSuccess({ product: updatedProduct });
          })
        );
      })
    )
  );
  deleteProduct$ = createEffect(() => {
    return this.action$.pipe(
      ofType(productAction.deleteProduct),
      switchMap(action => {
<<<<<<< HEAD
        console.log(action)
        return this.productService.deleteProduct(action.id).pipe(
          map(data => {
            console.log('res', data)
            return productAction.deleteProductSuccess({id: action.id})
          }
        ))
      })
    )
  })
=======
        return this.productService.deleteProduct(action?.id).pipe(
          map(data => {
            console.log(data);
            return productAction.deleteProductSuccess({ id: action.id });
          })
        );
      })
    );
  });
>>>>>>> 09aa78f40013dc420eeae34bd0e4ba4f9ab34373
}
