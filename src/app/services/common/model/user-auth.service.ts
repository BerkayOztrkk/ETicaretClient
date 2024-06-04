import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from '../../ui/customtoastr.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Token } from '../../../contracts/token/token';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService,private toastrService:CustomtoastrService) { }
  async login(username:string,password:string,callbackfunction?:()=>void){
    const observable:Observable<any|Token>=this.httpClientService.post<any|Token>({
      controller:"auth",
      action:"login"
    },{username,password})
    const tokenResponse:TokenResponse= await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accesstoken",tokenResponse.token.accesstoken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
      
      this.toastrService.message("Giriş Başarılı"," Başarılı.",{
    messageType:ToastrMessageType.Success,
  position:ToastrPosition.TopRight})
      }
    callbackfunction();

  }
  async refreshTokenLogin(refreshToken:string,callbackfunction?:(state)=>void){
    const observable:Observable<any|TokenResponse>=this.httpClientService.post({
action:"refreshtokenlogin",
controller:"auth"
    },{refreshToken:refreshToken});
 try {
  const tokenResponse:TokenResponse= await firstValueFrom(observable) as TokenResponse;
  if (tokenResponse){
    localStorage.setItem("accesstoken",tokenResponse.token.accesstoken);
    localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
    
   
  }
  callbackfunction(tokenResponse? true:false);

 } catch  {
  callbackfunction(false);
 }
  }
  async googleLogin(user:SocialUser,callbackfunction?:()=>void){
  const observable:Observable<SocialUser|TokenResponse>= this. httpClientService.post<SocialUser|TokenResponse>({
      action:"google-login",
      controller:"auth"
    },user);
   const tokenResponse:TokenResponse= await firstValueFrom(observable) as TokenResponse;
   if(tokenResponse){
    localStorage.setItem("accessToken",tokenResponse.token.accesstoken);
    localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
    this.toastrService.message("Google girişi başarılı.","Başarılı",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
    })
   }
    
  }

  async passwordReset(email:string,callbackfunction?:()=>void){
    const observable:Observable<any>=this.httpClientService.post({
      controller:"auth",
      action:"password-reset"

    },{email:email});
    await firstValueFrom(observable);
    callbackfunction();

  }
  async verifyResetToken(resetToken:string,userId:string,callbackfunction?:()=>void):Promise<boolean>{
    const observable:Observable<any>=this.httpClientService.post({
      controller:"auth",
      action:"verify-reset-token"
    },{
      resetToken:resetToken,
      userId:userId
    });
    const state:boolean=await firstValueFrom(observable);
    callbackfunction();
    return state;
  }
}
