import { Injectable } from '@angular/core';
import { SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private route:Router) { }

  userSignup(data:SignUp) {
    console.warn(data);
    this.http.post(`http://localhost:3000/user`,data, {observe:'response'})
      .subscribe((res) => {
        console.warn(res);

        if(res) {
          localStorage.setItem('user',JSON.stringify(res.body))
          this.route.navigate(['/'])
        }

      })
  }
}
