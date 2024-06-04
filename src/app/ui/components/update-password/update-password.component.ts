import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/model/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { UserService } from '../../../services/common/model/user.service';
import { error } from 'console';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private userAuthService:UserAuthService,private activatedRoute:ActivatedRoute, private alertify:AlertifyService,private userService:UserService,
    private router:Router
  ){super(spinner)}
  state:any;
  ngOnInit(): void {
  this.activatedRoute.params.subscribe({
    next:async params=> {
      this.showSpinner(SpinnerType.BallAtom);
    const userId:string=params["userId"];
    const resetToken:string=params["resetToken"];
   this.state= await this.userAuthService.verifyResetToken(resetToken,userId,()=>{
      this.state=true;
this.hideSpinner(SpinnerType.BallAtom);
    })
    }
  });
  }
  updatePassword(password:string,passwordConfirm:string){
    this.showSpinner(SpinnerType.BallAtom)
    if(password!=passwordConfirm){
    this.alertify.message("Lütfen şifrelerinizi kontrol edin.",{
      messageType:MessageType.Error,
      position:Position.TopRight
    });
    this.hideSpinner(SpinnerType.BallAtom);
    return;
  }
  this.activatedRoute.params.subscribe({
    next:async params=>{
      const userId:string=params["userId"];
    const resetToken:string=params["resetToken"];
    await this.userService.updatePassword(userId,resetToken,password,passwordConfirm,
      ()=>{
        this.alertify.message("Şifreniz Güncellenmiştir",{
          messageType:MessageType.Success,
          position:Position.TopRight
        })
        this.router.navigate(["/login"]);
      },error=>{
        this.alertify.message("Şifre güncellemesi başarısız.",{
          messageType:MessageType.Error,
          position:Position.TopRight
        });
        this.hideSpinner(SpinnerType.BallAtom)
    
      }
    )
    }
  })
    
  }
   


  }

