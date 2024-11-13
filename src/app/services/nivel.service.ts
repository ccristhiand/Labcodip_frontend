import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Responses } from '../models/utils/responses.model';
import { Lote } from '../models/lote.model';


@Injectable({
  providedIn: 'root'
})
export class NiveleService {

  constructor(
    private http: HttpClient
  ) { }

    //------Llamando el api de una variaboe global

    private url: string = `${environment.UrlApi6}/nivel`;


    //------declarando los metodo para invocar al api

    Guardar(model: Lote){
      if(model.fechaExpiracion!=undefined){
        model.fechaExpiracion.setHours(12, 0, 0, 0);
      }
      let urls = `${this.url}`;
      return this.http.post<Responses>(urls, model);
    }
}