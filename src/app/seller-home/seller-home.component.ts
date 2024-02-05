import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  
  productList:undefined | Product[]
  productMessage:undefined | string;
  deleteIcn = faTrash;
  editIcn = faEdit;  


  constructor(private productSvc:ProductService) {}

  ngOnInit(): void {
                                              
    this.list();

  }

  deleteProduct(id:number) {
    console.warn('Selected Product: ',id);
    this.productSvc.deleteProduct(id) 
      .subscribe((result) => {
        if(result) {
          this.productMessage = "Product is Deleted!"
          this.list();
        }
        setTimeout(() => (this.productMessage = undefined),3000)
      })
  }
  
  list() {
    this.productSvc.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result
    }) 
  }

  editProduct() {
    
  }

}
