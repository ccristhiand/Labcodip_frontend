import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class MenuService {
  
   
    constructor(
      private http: HttpClient
    ) { }

    private url: string = `${environment.UrlApi1}/navbarrelacionrol`;


Obtener(idRol: string){
    let urls = `${this.url}/?idRol=${idRol}`;
    return this.http.get<any>(urls)
    .toPromise()
    .then(data => data.listaOpcionesMenu);
  }

  }
