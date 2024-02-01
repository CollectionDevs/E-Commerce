import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    console.log('Service Is Called');

    return this.http.post(`http://localhost:3000/products/`, data)


  }


  productList() {
    return this.http.get<Product[]>(`http://localhost:3000/products/`)

  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product:Product) {
    console.log(product);
    
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`,product)
  }

  popularProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=4`)

  }
  trendyProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products?q={query}`)

  }

  searchProducts(query:string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`)

  }


}
