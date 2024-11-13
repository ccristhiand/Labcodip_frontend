import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs';
import { ValidacionPermisoService } from './validacionpermiso.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService,
    private _validacionPermisoService : ValidacionPermisoService,
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //1) VERIFICAR SI ESTA LOGUEADO
    // return true;
    let token = localStorage.getItem(environment.Access_Token);
    let url = state.url;

    if (!token) {
      if(url=="/login" || url==""){
        return true;
      }else{
        // this.router.navigate(['/inicio']);
        this.router.navigate(['/login']);
        return false;
      }
    }
    //2) VERIFICAR SI EL TOKEN NO HA EXPIRADO
    let helper = new JwtHelperService();
    if (!helper.isTokenExpired(token!)) {

      //3) vERIFICA SI CIERRAS SECCION 
      if(url=="/login"){
         this.router.navigate(['/inicio']);
         return false;
      }

      //3) OBTENIENDO EL ID DEL USUARIO PARA TRAER LAS OPCIONES DE MENU Y LOS PERMISO
      let session = this._usuarioService.SessionUsuario();
      return this._validacionPermisoService.configmenu(session.idrol).pipe(map(x => {
        let cont = 0;
        // for (let m of x.listaConfigMenu!) {
        for (let m of x.listaOpcionMenuValidar) {
          if (url.startsWith(m.routerLink!)) {
            cont++;
            break;
          }
        }
        
        if (cont > 0) {
          return true;
        } else {
          this.router.navigate(['/notfound']);
          return false;
        }

      }))     
    } 
    else {
      localStorage.clear();
      window.location.reload();
      return false;
    }
  } 
}
