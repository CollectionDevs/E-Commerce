import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  title = 'Naviagation'
  menuType:string = ''
  sellerName:string = '';
  searchResult: undefined | Product[];

  constructor(private route:Router, private productSvc:ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((route:any) => {
      if(route.url) {
        // console.warn('Route-',route.url);
        
        if(localStorage.getItem('seller') && route.url.includes('seller')) {
          // console.warn('Inside Seller Are');
          this.menuType = 'seller';

          if(localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore &&  JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }

        }  else {
          // console.warn('Inside Default Area ');
          this.menuType = 'default';
      } 
      }
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  searchProduct(query:KeyboardEvent) {
    if(query) {
      const element = query.target as HTMLInputElement;
      // console.warn(element.value);
      this.productSvc.searchProducts(element.value).subscribe((result) => {
        // console.warn(result);
        
        if( result. length > 5) {
          result.length = 5;
        }
        
        this.searchResult = result;

      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  onSearch(val:string) {
    console.warn('Searching Entity ',val);
    this.route.navigate([`search/${val}`])
  }

  redirectToDetails(id:number) {
    
    // this.route.navigate(['/details/'+id])
  }

}
