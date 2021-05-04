import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../state/product';
import { getProductById } from '../state/product.selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.product$ = this.store.select(getProductById);
  }
}
