import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/model/user-auth.service';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent extends BaseComponent {
  constructor( spinner:NgxSpinnerService,private userAuthService:UserAuthService,private alertifyService:AlertifyService)
  {super(spinner)}
  async passwordReset(email:string){
    this.showSpinner(SpinnerType.BallAtom);
this.userAuthService.passwordReset(email,()=>{
  this.hideSpinner(SpinnerType.BallAtom)
this.alertifyService.message("Mail başarıyla gönderilmiştir.",{
  messageType:MessageType.Notify,
  position:Position.TopRight
})
});
  }
}
