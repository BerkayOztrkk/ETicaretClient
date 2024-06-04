import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { RouterOutlet } from '@angular/router';

import { DeleteDirective } from './directives/admin/delete.directive';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import { SelectProductImageDialogComponent } from './dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { ComponentsModule } from './ui/components/components.module';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

@NgModule({
  declarations: [
    AppComponent,LoginComponent, DynamicLoadComponentDirective
   
    
   

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("accessToken"),
        allowedDomains:["localhost:44395"],
        
        
        
      },
      
    }),SocialLoginModule,GoogleSigninButtonModule
    
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide:"baseUrl",useValue:"https://localhost:44395/api",multi:true},
    {provide:"baseSignalRUrl",useValue:"https://localhost:44395/",multi:true}
    ,{
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("147734653538-r81tbhjhiiok06kgno92h4fpr5qc3bfd.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    },
    {provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
