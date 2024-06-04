import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../entities/User';
import { UserService } from '../../../services/common/model/user.service';
import { CreateUser } from '../../../contracts/users/create_user';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/customtoastr.service';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private userService:UserService,private toastrService:CustomtoastrService,spinner:NgxSpinnerService) {
    super(spinner)
   }
  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      namesurname: ["", [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(3)]],
      Username: ["",[Validators.required,
        Validators.maxLength(30),
        Validators.minLength(3)]],
      Email: ["",[Validators.required,
        Validators.email,
        ]],
      Password: ["",[
        Validators.required,
        
      ]],
      confirmpassword: [""],
    })
  }
  get component(){
    return this.frm.controls;
  }
  submitted:boolean=false;
 async onSubmit(user:User) {
this.submitted=true;
if(this.frm.invalid)
  return;
const result:CreateUser= await this.userService.create(user);
if(result.succeeded)
  this.toastrService.message(result.message,"Kullanıcı Kaydı başarılı.",{
messageType:ToastrMessageType.Success,
position:ToastrPosition.TopRight}
)
else
  this.toastrService.message(result.message,"Kullanıcı Kaydı hatalı.",{
    messageType:ToastrMessageType.Error,
    position:ToastrPosition.TopRight})

  }
  

}
