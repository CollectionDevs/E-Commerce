import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // images = [].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
  title='Home Page'
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];
  
  constructor(private productSvc:ProductService) {}

  ngOnInit(): void {

    this.productSvc.popularProducts().subscribe((data) => {
      // console.warn('Popular Products',data);
      this.popularProducts = data;
    })

    this.productSvc.trendyProducts().subscribe((data) => {
      // console.warn('Trendy Products',data);
      this.trendyProducts = data;
    })
  }


  

}
