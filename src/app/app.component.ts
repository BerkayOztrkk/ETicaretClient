import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from './services/ui/customtoastr.service';
import { Router } from '@angular/router';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';








@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective,{static:true})
  dynamicLoadComponentDirective:DynamicLoadComponentDirective;

  constructor(public authService:AuthService,private toastrService:CustomtoastrService,private router:Router,
    private dynamicLoadComponentService:DynamicLoadComponentService
  ){
    authService.identityCheck();
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum sonlandırıldı.","Oturum Kapatıldı",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.TopRight
    })
  }
  loadComponent(){
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef);
    
  }
}






