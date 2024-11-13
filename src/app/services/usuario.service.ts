import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Datacollection } from '../models/utils/datacollection.model';
import { Login, TokenUsuario, Usuario } from '../models/usuario.model';
import { Responses } from '../models/utils/responses.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

    //------Llamando el api de una variaboe global

    private url: string = `${environment.UrlApi1}/login`;


    //------declarando los metodo para invocar al api

    login(userName: string, password: string, domain: string){
      let model = new Login();
      model.usuario=userName;
      model.password=password;
      model.domain=domain;

      let urls = `${this.url}/login`;
      return this.http.post<TokenUsuario>(urls,model);
    }

    listar(idlab: string, idarea: string, page: number, pages: number){
      let urls = `${this.url}?idlab=${idlab}&idarea=${idarea}&page=${page}&pages=${pages}`;

      return this.http.get<Datacollection>(urls)
            .toPromise()
            .then(res => res?.items as Datacollection[])
            .then(data => data);
   }

    Obtener(id: string){
      let urls = `${this.url}/find?id=${id}`;
      return this.http.get<Usuario>(urls);
    }

    Guardar(id: string, model: Usuario){

      if(model.fechaNacimiento!=undefined){
        model.fechaNacimiento.setHours(12, 0, 0, 0);
      }

      if(id==""){
        let urls = `${this.url}`;
        return this.http.post<Responses>(urls, model);
      }else{
        let urls = `${this.url}/${id}`;
        return this.http.put<Responses>(urls, model);
      }
    }


    VerificarToken(){
      let token = localStorage.getItem(environment.Access_Token);
  
      if(token!=null){        
        this.router.navigate(['/inicio']);
        return false;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    }

    SessionUsuario(){
      let helper = new JwtHelperService();
      let token = localStorage.getItem(environment.Access_Token);
  
      if(token!=null){
        let decodedToken = helper.decodeToken(token!);
        return decodedToken;
      }else{
        return null
      }
    }


    refreshtoken(){
      let token = localStorage.getItem(environment.Access_Token)!;
      let urls = `${this.url}/loginRefresh?token=${token}`;
      return this.http.get<TokenUsuario>(urls);
    }

    savetoken(token: TokenUsuario){
      localStorage.setItem(environment.Access_Token, token.access_token!);
    }

    closeLogin(){
      localStorage.clear();
      window.location.reload();
    }
}
