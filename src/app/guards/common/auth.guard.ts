import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { CustomtoastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/customtoastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state, ) => {
  const spinnerService:NgxSpinnerService=inject(NgxSpinnerService)
  spinnerService.show(SpinnerType.BallScaleMultiple);
 const authService:AuthService=inject(AuthService)
  const jwtHelper: JwtHelperService = inject(JwtHelperService)
  const router:Router=inject(Router)
  const toastrService:CustomtoastrService=inject(CustomtoastrService)


  const token:string =localStorage.getItem("accessToken");
 
  // const decodeToken=jwtHelper.decodeToken(token);
  // const expirationdate:Date=jwtHelper.getTokenExpirationDate(token);
  // let expired:boolean;
  // try {
  //   expired=jwtHelper.isTokenExpired(token);
  // } catch {
  //   expired=true;
  // }
  if (!_isAuthenticated) {
    router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    toastrService.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim!", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    })
  }
  spinnerService.hide(SpinnerType.BallScaleMultiple);
  return true;
};


