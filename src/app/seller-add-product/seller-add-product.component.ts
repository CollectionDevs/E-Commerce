import { Component } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

    constructor(private productSvc:ProductService) {}
    // addProduct(data:object) {
    //   console.warn('data',data);
      
    // }
  
    addProductMessage:string | undefined;


    addProduct() {
      console.warn('data');

    }

    onSubmit(data:Product) {
      console.log('Adding Product Process started.........',data);
      this.productSvc.addProduct(data)
        .subscribe((result) => {
          if(result) {
            
            this.addProductMessage = "Product Added Successfully!"
          }
          setTimeout(() => (this.addProductMessage = undefined),3000)
        })


    }


}
