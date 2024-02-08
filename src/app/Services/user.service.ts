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

  constructor(private http:HttpClient,private route:Router) { }

  ngOnInit(): void {}

  userSignup(data:SignUp) {
    console.warn(data);
    return this.http.post(`http://localhost:3000/user`,data, {observe:'response'})
      .subscribe((res) => {
        console.warn(res);

        if(res) {
          localStorage.setItem('user',JSON.stringify(res.body))
          this.route.navigate(['/'])
        } 

      })
  }

  userLogin(data:Login) {
    return this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe:'response'})
      .subscribe((res:any) => {
        if(res && res.body && res.body.length) {
          console.warn('User Logged In');
          // this.isLoggedError.next(true);
          this.route.navigate(['seller-home'])
          
        } else {
          console.warn('Login Error');
          this.isLoginError.emit(true)
          this.route.navigate(['user-auth'])
        }
      })
  }

}
