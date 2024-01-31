import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  constructor(private productSvc:ProductService) {}

  productList:undefined | Product[]

  ngOnInit(): void {

    this.productSvc.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result
    }) 

  }

  

}
