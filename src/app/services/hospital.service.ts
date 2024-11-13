import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Responses } from '../models/utils/responses.model';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HosptalService {

 
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

    //------Llamando el api de una variaboe global

    private url: string = `${environment.UrlApi3}/hospital`;


    //------declarando los metodo para invocar al api

    Obtener(id: string){
      let urls = `${this.url}/find?id=${id}`;
      return this.http.get<Hospital>(urls);
    }

    Guardar(id: string, model: Hospital){
      let urls = `${this.url}`;
      return this.http.post<Responses>(urls, model);
    }
}

