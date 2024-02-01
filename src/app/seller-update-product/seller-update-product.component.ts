import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{

  editProductMessage:undefined | string ;
  productData: undefined | Product;
  productMesage:string = 'Product is Updated';

  constructor(private route:ActivatedRoute, private prouctSvc:ProductService) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId,'PID ');
    
    productId && 
    this.prouctSvc.getProduct(productId).subscribe((data) => {
      this.productData = data;

    
    })

  }

  onSubmit(data:Product) {
      console.warn(data);

      if(this.productData) {
        data.id = this.productData.id;
        
      }

      this.prouctSvc.updateProduct(data).subscribe((result) => {
        if(result) {
         this.editProductMessage = 'Product is Updated';
          
        }
      })
        setTimeout(() => {
          this.editProductMessage = undefined;
        }, 3000);

  }

}
