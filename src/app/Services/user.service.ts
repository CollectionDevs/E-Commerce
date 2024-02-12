import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{


  isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  userAuth = new EventEmitter<boolean>(false);


  constructor(private http:HttpClient,private route:Router) { }

  ngOnInit(): void {}

  userSignup(user:SignUp) {
    console.warn(user);
    return this.http.post(`http://localhost:3000/user`,user, {observe:'response'})
      .subscribe((res) => {
        console.warn(res);

        if(res) {
          localStorage.setItem('user',JSON.stringify(res.body))
          this.route.navigate(['/'])
        } 

      })
  }

  reloadUser() {
    if(localStorage.getItem('user')) {
      // this.isLoggedIn.next(true);

      this.route.navigate(['/'])

    }
  }

  // userLogin(data:Login) {
    
  //   return this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe:'response'})
  //     .subscribe((res:any) => {
  //       if(res && res.body && res.body?.length) {
  //         console.warn('User Logged In');
  //         // this.isLoggedError.next(true);
  //         this.route.navigate(['seller-home'])
          
  //       } else {
  //         console.warn('Login Error');
  //         this.isLoginError.emit(true)
  //         this.route.navigate(['user-auth'])
  //       }
  //     })
  // }


  userLogin(data:Login) {
    
    return this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe:'response'})
      .subscribe((res:any) => {
        if(res && res.body && res.body?.length) {
          console.warn('User Logged In');
          this.userAuth.emit(false)
          // this.isLoggedError.next(true);
          localStorage.setItem('user',JSON.stringify(res.body))
          this.route.navigate(['seller-home'])
          
        } else {
          console.warn('Login Error');
          this.userAuth.emit(true)
          this.isLoginError.emit(true)
          this.route.navigate(['user-auth'])
        }
      })
  }

}
