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

  constructor(private activateRoute: ActivatedRoute, private productSvc: ProductService) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId')
    console.warn(productId);

    productId && this.productSvc.getProduct(productId).subscribe((result) => {
      console.warn(result);
      this.productData = result;
    })

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

  // addToCart() {
  //   if(this.productData) {
  //     this.productData.quantity = this.productQuantity;
  //     console.warn(this.productData);
  //     if(!localStorage.getItem('user')) { 
  //       console.warn(this.productData);
  //       this.productSvc.localAddToCart(this.productData)
  //     } else {
  //       console.warn('Filled');
        
  //     }
      
  //   }
  // }

  
  addToCart() {
    if(this.productData) {
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')) {
        // console.warn(this.productData);
        this.productSvc.localAddToCart(this.productData)
      }
      console.warn(this.productData);
      
    }
  }

}
