import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../shared/services/http.service';
import { Product } from './state/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpService) {}

  getProducts(): Observable<Product[]> {
    return this.http.get('/products').pipe(
      map(data => {
        return data;
      })
    );
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get('/products/' + id);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put('/products/' + product?.id, product);
  }
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete('/products/' + id).pipe(map(res => {
      console.log('delete product', res)
      return res
    }))
  }
}
