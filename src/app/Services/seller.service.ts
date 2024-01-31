import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignUp } from '../data-type';
import { compileNgModule } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)


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


  userLogin(data:any) {
    this.http.get(`http://localhost:3000/seller-auth?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((res:any) => {
      console.warn('Enter into svc');
      
      if(res && res.body && res.body.length) {
        
        console.warn("User logged in ",res);
        localStorage.setItem('seller',JSON.stringify(res.body))
        this.route.navigate(['seller-home'])

      } else {
        console.warn('Log in failed');
        this.isLoginError.emit(true)
        
      }
    })
  }

}
