import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  title = 'Naviagation'
  menuType:string = ''
  sellerName:string = '';

  constructor(private route:Router) {}

  ngOnInit(): void {
    this.route.events.subscribe((route:any) => {
      if(route.url) {
        console.warn('Route-',route.url);
        
        if(localStorage.getItem('seller') && route.url.includes('seller')) {
          console.warn('Inside Seller Are');
          this.menuType = 'seller';

          if(localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore &&  JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }

        }  else {
          console.warn('Inside Default Area ');
          this.menuType = 'default';
      } 
      }
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }


}
