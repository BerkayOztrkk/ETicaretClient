import { Component } from '@angular/core';
import { UserService } from '../../../services/common/model/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from '../../../services/common/http-client.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { UserAuthService } from '../../../services/common/model/user-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
constructor(private userAuthService:UserAuthService,spinner:NgxSpinnerService,private authService:AuthService,
  private activatedRoute:ActivatedRoute,private router:Router,private socialAuthService: SocialAuthService,
private httpClientService:HttpClientService){
  super(spinner)
  socialAuthService.authState.subscribe(async(user:SocialUser)=>{
console.log(user)
this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
await userAuthService.googleLogin(user,()=>{
  authService.identityCheck();
  this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
});
  });
}
 async login(username:string,password:string){
  this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
   await this.userAuthService.login(username,password,()=>{
    this.authService.identityCheck();
    this.activatedRoute.queryParams.subscribe(params=>{
      const returnUrl:string=params ["returnUrl"];
      if(returnUrl){
        this.router.navigate([returnUrl])

      }
    })
    this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
   });

  }
}
