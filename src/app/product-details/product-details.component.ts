import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart = false;


  constructor(private activateRoute: ActivatedRoute, private productSvc: ProductService) { }

  ngOnInit(): void {
    //Get Product ID
    let productId = this.activateRoute.snapshot.paramMap.get('productId')
    console.warn("Product ID - ",productId);

    //Check ProductIDwise Cart Data
    productId && this.productSvc.getProduct(productId).subscribe((result) => {
      this.productData = result;
      // console.warn('Product Data -> ',this.productData);
    })

    //Show Remove Cart Option if Current Item Already Added
    //Bug
    let localCart = localStorage.getItem('localCart');
    if(productId && localCart) {
      let items = JSON.parse(localCart);
      items = items.filter((item:Product) => productId == item.id.toString())
      if(items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }

  }

  handleQuantity(value: string) {
    console.log('Values ', value);

    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity = this.productQuantity + 1;
    } else if (this.productQuantity > 1 && value === 'min') {
      // this.productQuantity -= 1;

      this.productQuantity = this.productQuantity - 1;
    }
  }

  addToCart() {
    if(this.productData) {
      this.productData.quantity = this.productQuantity;
      // console.warn(this.productData);
      if(!localStorage.getItem('user')) { 
        // console.warn(this.productData);
        this.productSvc.localAddToCart(this.productData)
        this.removeCart = true;

      } else {
        console.warn('User is Logged in');
        

      }
      
    }
  }

  
  // addToCart() {
  //   if(this.productData) {
  //     this.productData.quantity = this.productQuantity;
  //     if(!localStorage.getItem('user')) {
  //       // console.warn(this.productData);
  //       this.productSvc.localAddToCart(this.productData)
  //       this.removeCart = true;
  //     }
  //     console.warn(this.productData,"+++++++++++++++++++++++++++++");
      
  //   }
  // }


  removeToCart(productId:number) {
    this.productSvc.removeFromCart(productId);
    this.removeCart = false; 
  }
}
