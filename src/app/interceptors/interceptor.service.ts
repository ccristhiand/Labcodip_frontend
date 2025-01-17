import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { NotifierService } from '../page/component/notifier/notifier.service';
// import { SpinnerService } from '../page/component/spinner/spinner.service';
// import { UsuarioService } from '../_service/configuracion/usuario.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from '../services/usuario.service';
import { SpinnerService } from '../pages/components/spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    // private notifierService : NotifierService,
    private _usuarioService : UsuarioService,
    private _spinnerService: SpinnerService
  ) { }

intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let helper = new JwtHelperService();
    let token =localStorage.getItem(environment.Access_Token);
    let request = req;

    if (!helper.isTokenExpired(token!)){
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
     }

     request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
     return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if(error.status === 401){
           return this.handleRefreshToken(req,next);
          }
          else if (error.error instanceof ErrorEvent) {
              errorMsg = `Error: ${error.error.message}`;
              // this.notifierService.showNotification(0,"Error",errorMsg);
              this._spinnerService.hide();
          } else {
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
              // this.notifierService.showNotification(0,"Error",errorMsg);
              this._spinnerService.hide();
          }
          return throwError(errorMsg);
         })
      );

  }

  handleRefreshToken(req: HttpRequest<any>, next: HttpHandler){
   return this._usuarioService.refreshtoken().pipe(
    switchMap((data:any)=>{
      this._usuarioService.savetoken(data);
      this._spinnerService.hide();
      return next.handle(this.AddTokenheader(req, data.access_token));
    }),
    catchError(errorMsg => {
      this._usuarioService.closeLogin();
      this._spinnerService.hide();
      return throwError(errorMsg);
    })
   );
  }

  AddTokenheader(req: HttpRequest<unknown>, token:unknown){
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }
}
