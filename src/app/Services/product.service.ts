import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<Product[] | []>()

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

  updateProduct(product: Product) {
    console.log(product);
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`, product)
  }

  popularProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=3`)
  }

  trendyProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=8`)

  }

  searchProducts(query: string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`)
  }

  // localAddToCart(data:Product) {
  //   let cartData = [];
  //   let localCart = localStorage.getItem('localCart');
  //   if(!localCart) {
  //     console.warn('Local Cart ');
  //     localStorage.setItem('localCart',JSON.stringify([data]))

  //   } else {
  //     cartData = JSON.parse(localCart)
  //     cartData.push(data)
  //     localStorage.setItem('localcart',JSON.stringify(cartData))
  //   }
  // }


  // data = CartData
  // cartData = cartItemElement

  // localAddToCart(data:Product) {
  //   let cartData = [];
  //   let localCart = localStorage.getItem('localCart');
  //   if(!localCart) {
  //     console.warn('Local Cart ');
  //     localStorage.setItem('localCart',JSON.stringify([data]))

  //   } else {
  //     cartData = JSON.parse(localCart);
  //     cartData.push(data);
  //     localStorage.setItem('localCart',JSON.stringify(cartData))
  //   }
  // }

  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      // console.warn('User is not present / Localcart is Empty ');
      localStorage.setItem('localCart', JSON.stringify([data]))
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }

    //Update Header Cart() After Adding Item
    this.cartData.emit(cartData)
  }


  //bug
  removeFromCart(productId: number) {
    let localCart = localStorage.getItem('localCart');
    if (localCart) {
      let items: Product[] = JSON.parse(localCart);
      items = items.filter((item:Product) => productId !== item.id);
      // console.warn(items);
      localStorage.setItem('localCart', JSON.stringify(items));

      //Update Header Cart() After Removing Item
      this.cartData.emit(items)   
    }
  }

}
