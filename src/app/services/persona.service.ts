import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Persona } from '../models/pesona.model';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    private http: HttpClient
  ) { }

  //------Llamando el api de una variaboe global

  private url: string = `${environment.UrlApi2}/persona`;


  //------declarando los metodo para invocar al api

 Obtener(id: string){
    let urls = `${this.url}/find?id=${id}`;
    return this.http.get<Persona>(urls);
  }
}
