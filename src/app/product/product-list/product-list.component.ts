import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from '../state/product';
import { deleteProduct, loadProducts } from '../state/product.actions';
import { getProducts, isLoaded } from '../state/product.selectors';
import { DeleteConformationComponent } from 'src/app/shared/components/delete-conformation/delete-conformation.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  isLoaded$: Observable<boolean>;
  loading: false;
  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
    this.isLoaded$ = this.store.select(isLoaded);
    this.store.dispatch(loadProducts());
  }
  onProductDelete(product): void {
    const deleteDialogRef = this.dialog.open(DeleteConformationComponent, {
      width: '100%',
      maxWidth: '400px',
      data: {
        message: 'Are you sure! you want to delete ' + product?.title + '?'
      }
    });
    deleteDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(deleteProduct({ id: product?.id }));
      }
    });
  }
}
