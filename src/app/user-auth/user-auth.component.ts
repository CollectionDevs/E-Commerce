import { Component, OnInit } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{

  showLogin:boolean = true;
  authError:undefined | string = '';

  constructor(private userSvc:UserService) {}

  ngOnInit(): void {

    this.userSvc.reloadUser()

  }


  onSignup(data:SignUp) {
    // console.warn(data);
    this.userSvc.userSignup(data)
      
    
  }

  // onLogin(data:Login) {
  //   console.warn(data);
  //   this.authError = '';
  //   this.userSvc.userLogin(data);
  //   this.userSvc.isLoginError.subscribe((isError) => {
  //     if(isError) {
  //       this.authError = 'Email or Password is Incorrect'
  //     }
  //     setTimeout(() => {
  //       this.authError = undefined
  //     }, 3000);
  //   })

    
  // }


  onLogin(data:Login) {
    // console.warn(data);

    this.userSvc.userLogin(data);
    this.userSvc.isLoginError.subscribe((isError) => {
      if(isError) {
        console.warn(isError);
        this.authError = 'Please Insert Valid Credentials';
      }
      setTimeout(() => {
        this.authError = undefined;
      },  3000)
    })
    
  }


  loginTray() {
    this.showLogin = true;
  }

  signupTray() {
    this.showLogin = false;
  }

}
