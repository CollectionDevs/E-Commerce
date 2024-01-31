// import { CanActivateFn } from '@angular/router';

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SellerService } from "./Services/seller.service";

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn:'root'
})

export class authGuard implements CanActivate{

  constructor(private sellerSvc:SellerService) {}

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
      if(localStorage.getItem('seller')) {
        return true;
      }

      return this.sellerSvc.isLoggedIn;
  }

}


