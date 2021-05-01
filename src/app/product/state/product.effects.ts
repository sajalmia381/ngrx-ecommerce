import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as productAction from './product.actions';
import { getProducts } from './product.selectors';
@Injectable()
export class ProductEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private productService: ProductService
  ) {}
  loadProducts$ = createEffect(() => {
    console.log('loading products effects');
    return this.action$.pipe(
      ofType(productAction.loadProducts),
      withLatestFrom(this.store.select(getProducts)),
      mergeMap(([action, products]) => {
        console.log('effect mergeMap', action);
        return this.productService.getProducts().pipe(
          map(products => {
            console.log(products);
            return productAction.loadProducts({ products });
          })
        );
      })
    );
  });
}
