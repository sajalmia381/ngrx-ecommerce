import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as productAction from './product.actions';
import { isLoaded } from './product.selectors';
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
        console.log(action, loaded)
        if(!loaded) {
          return this.productService.getProducts().pipe(
            map(products => {
              return productAction.loadProductsSuccess({ products });
            })
          );
        }
        return of(productAction.dummyAction())
      })
    );
  });
}
