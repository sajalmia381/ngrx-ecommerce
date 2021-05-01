import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../state/product';
import { loadProducts } from '../state/product.actions';
import { getProducts } from '../state/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
    this.store.select(getProducts).subscribe(data => {
      console.log(data);
    });
    this.store.dispatch(loadProducts());
  }
}
