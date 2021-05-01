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
    console.log('service');
    return this.http.get('/products').pipe(
      map(data => {
        console.log('service data', data);
        return [];
      })
    );
  }
}
