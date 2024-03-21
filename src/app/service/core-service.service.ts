import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounce, debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { Product } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class CoreServiceService {
  productID: number = 0;

  constructor(private http: HttpClient) { }

  setProductID(productID:number) {
    this.productID = productID ;
  }

  getDataProduct(): Observable<Product[]> {
      return this.http.get<Product[]>('https://dummyjson.com/products')
    }

  // searchgetDataProduct(query:string): Observable<Product[]> {
  //     return this.http.get<Product[]>(`https://dummyjson.com/products?query=${query}`)
  //   }

  // searchProduct(query$: Observable<string>): Observable<Product[]> {
  //   return query$.pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     switchMap(query => this.searchgetDataProduct(query))
  //   )
  // }

  getDataProductID(id : number): Observable<Product> {
      return this.http.get<Product>(`https://dummyjson.com/products/${id}`)
    }
}
