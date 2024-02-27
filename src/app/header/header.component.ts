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
  userName:string = '';
  searchResult: undefined | Product[];
  cartItems = 0;

  constructor(private route:Router, private productSvc:ProductService) {}

  // ngOnInit(): void {
  //   this.route.events.subscribe((route:any) => {
  //     if(route.url) {
  //       // console.warn('Route-',route.url);
  //       if(localStorage.getItem('seller') && route.url.includes('seller')) {
  //         // console.warn('Inside Seller Are');
  //         this.menuType = 'seller';

  //         if(localStorage.getItem('seller')) {
  //           let sellerStore = localStorage.getItem('seller');
  //           let sellerData = sellerStore &&  JSON.parse(sellerStore)[0];
  //           this.sellerName = sellerData.name;
  //         } else if(localStorage.getItem('user')) {
  //           let userStore = localStorage.getItem('user')
  //           let userData = userStore && JSON.parse(userStore)[0];
  //          this.userName = userData.name;

  //         }

  //       }  else {
  //         // console.warn('Inside Default Area ');
  //         this.menuType = 'default';
  //     } 
  //     }
  //   })
  // }

  ngOnInit(): void {
    this.route.events.subscribe((route:any) => {
      if(route.url) {
        if(localStorage.getItem('seller') && route.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user') && route.url.includes('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore[0]);
          let userName = userData.name;
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
    })

    //
    let cartData = localStorage.getItem('localCart')
    if(cartData) {
      this.cartItems = JSON.parse(cartData).length;
      // console.warn('Cart Items -> ',this.cartItems);
      
    }

    //Cart Array Display
    this.productSvc.cartData.subscribe((items:any) => {
      this.cartItems = items.length;
    })

  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  // searchProduct(query:KeyboardEvent) {
  //   if(query) {
  //     const element = query.target as HTMLInputElement;
  //     // console.warn(element.value);
  //     this.productSvc.searchProducts(element.value).subscribe((result) => {
  //       // console.warn(result);
        
  //       if( result. length > 5) {
  //         result.length = 5;
  //       }
        
  //       this.searchResult = result;

  //     })
  //   }
  // }

  searchProduct(query:KeyboardEvent) {
    if(query) {
      const element = query.target as HTMLInputElement;

      this.productSvc.searchProducts(element.value).subscribe((res) => {
        // console.warn(res);
        this.searchResult = res;
        if(res.length > 5) {
          res.length = 5;

        }
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


  //check 2nd nav
  redirectToDetails(id:number) {
    this.route.navigate(['/details/'+id])
  }

  userLogout() {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.route.navigate(['/user-auth'])
    } else {
      // console.warn('User is not logged in yet ');
      
    }
  }

}
