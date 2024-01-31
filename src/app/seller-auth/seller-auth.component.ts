import { Component, OnInit } from '@angular/core';
import { SellerService } from '../Services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})



export class SellerAuthComponent implements OnInit{

  showLogin = true;

  constructor(private sellerSvc: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.sellerSvc.reload()
  }

  onSingnup(data: SignUp) {

    this.sellerSvc.userSignUp(data)
      
  }

    onLogin(data:Login) {
      
    }

    loginTray() { this.showLogin = true}

    signupTray() { this.showLogin = false }


}
