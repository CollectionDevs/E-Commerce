import { Component, OnInit } from '@angular/core';
import { SellerService } from '../Services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})



export class SellerAuthComponent implements OnInit {

  showLogin = true;
  authError: string = '';

  constructor(private sellerSvc: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.sellerSvc.reload()
  }

  onSingnup(data: SignUp) {

    this.sellerSvc.userSignUp(data)

  }

  onLogin(data: any) {
    // console.warn(data);
    this.authError = "";
    this.sellerSvc.userLogin(data)
    this.sellerSvc.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or Password is Incorrect"
      }
    })

  }

  loginTray() { this.showLogin = true }

  signupTray() { this.showLogin = false }


}
