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


  constructor(private route:Router) {}

  ngOnInit(): void {
    this.route.events.subscribe((route:any) => {
      if(route.url) {
        console.warn('Route-',route.url);
        
        if(localStorage.getItem('seller') && route.url.includes('seller')) {
          console.warn('Inside Seller Are');
          this.menuType = 'seller';

        }  else {
          console.warn('Inside Default Area ');
          this.menuType = 'default';
      } 
      }
    })
  }




}
