import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { Product } from '../state/product';
import { getProductById } from '../state/product.selectors';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  isAlive = true;
  productForm: FormGroup;
  product: Product;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
    this.store
      .select(getProductById)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(data => {
        this.product = data;
      });
    this.productForm.patchValue({
      title: this.product?.title,
      description: this.product?.description
    });
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }
  onFormSubmit(): void {}
}
