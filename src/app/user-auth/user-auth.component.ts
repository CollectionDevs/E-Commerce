import { Component, OnInit } from '@angular/core';
import { SignUp } from '../data-type';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{

  constructor(private userSvc:UserService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  signup(data:SignUp) {
    console.warn(data);
    this.userSvc.userSignup(data)
    
  }

  login(data:SignUp) {
    
  }

}
