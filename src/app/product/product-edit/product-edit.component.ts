import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { Product } from '../state/product';
import { updateProduct } from '../state/product.actions';
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
  constructor(private store: Store, private router: Router, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    });
    this.store
      .select(getProductById)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(data => {
        this.product = data;
        if (data) {
          this.productForm.patchValue({
            title: data?.title,
            description: data?.description,
            price: data?.price
          });
        }
      });
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }
  onFormSubmit(): void {
    if (this.productForm.invalid) {
      this.snackbar.open('Form is not valid', 'close');
      return;
    }
    const formData = this.productForm.value;
    const newFormData = { ...this.product };
    Object.keys(formData).map(key => {
      if (newFormData[key] !== formData[key]) {
        newFormData[key] = formData[key];
      }
    });
    // console.log(newFormData)
    this.store.dispatch(updateProduct({ product: newFormData }));
    this.router.navigate(['/products']);
  }
}
