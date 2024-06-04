import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Observable, catchError, of } from 'rxjs';
import { CustomtoastrService, ToastrMessageType, ToastrPosition } from '../ui/customtoastr.service';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from './model/user-auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomtoastrService, private userAuthService: UserAuthService, private router: Router,
    private spinner: NgxSpinnerService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          



          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if (!state){
              const url = this.router.url;
              if (url == "/products")
                this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekiyor.", "Giriş yapınız", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopRight
    
                })
    
              else
                this.toastrService.message("Yetkiniz Yetersiz", "Başarısız", {
                  messageType: ToastrMessageType.Error,
                  position: ToastrPosition.TopRight
                });
            }
          }).then(data => {
            this.toastrService.message("Yetkiniz Yetersiz", "Başarısız", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            });
            });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya Erişilemiyor", "Sunucu Hatası", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı", "Geçersiz İstek!", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa Bulunamadı", "Hata!", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight
          });
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana geldi", "Hata!", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight
          });
          break;
      }
      this.spinner.hide(SpinnerType.BallAtom);
      return of(error);
    }));
  }
}
