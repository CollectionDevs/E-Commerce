import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../data-type';
import { compileNgModule } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isLoggedIn = new BehaviorSubject<boolean>(false)

  constructor(private http:HttpClient, private route:Router) { }

  // userSignUp(data:SignUp) {
  //   let result = this.http.post('http://localhost:3000/seller',
  //   data,
  //   {observe:'response'}).subscribe((result) => {
  //     this.isSellerLoggedIn.next(true);
  //     console.warn("result",result);
  //   })
  //    return false;   
    
  // }
 
  userSignUp(data:SignUp) {
   this.http.post(`http://localhost:3000/seller-auth`,data,{observe:'response'})
    .subscribe((res) => {
      this.isLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(res.body))
      this.route.navigate(['seller-home'])
    })
  }


  reload() {
    if(localStorage.getItem('seller')) {
      this.isLoggedIn.next(true);
      this.route.navigate(['seller-home'])
      
    }
  }

}
