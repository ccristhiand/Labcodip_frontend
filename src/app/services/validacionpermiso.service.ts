import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Navbar } from '../models/opcionmenu.model';

@Injectable({
  providedIn: 'root'
})
export class ValidacionPermisoService {

  constructor(
    private http: HttpClient
    ) { }
    
    private url: string = `${environment.UrlApi1}/navbarrelacionrol`;
  
  configmenu(idRol: string) {
    
    let urls = `${this.url}/?idRol=${idRol}`;
    return this.http.get<any>(urls);
  }

  // listar(idempresa: string) {
  //   let urls = `${this.url}/GetAllOpcionMenu?idempresa=${idempresa}`;
  //   return this.http.get<MenuResponse>(urls);
  // }
}
