import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResult: undefined | Product[];

  constructor(private activeRoute:ActivatedRoute, private productSvc:ProductService) {

  }
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query')
    console.warn(query);
       
    // query && this.productSvc.searchProducts(query).subscribe((result) => {
    //   this.searchResult = result
    // })

    query && this.productSvc.searchProducts(query).subscribe((res) => {
      this.searchResult = res
    })

  }



}
