import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Datacollection } from '../models/utils/datacollection.model';
import { Responses } from '../models/utils/responses.model';
import { EquipoMedicoExamen } from '../models/equipomedico.model';


@Injectable({
  providedIn: 'root'
})
export class EquipoMedicoExamenService {

  constructor(
    private http: HttpClient
  ) { }

    //------Llamando el api de una variaboe global

    private url: string = `${environment.UrlApi3}/equipomedicoexamen`;


    //------declarando los metodo para invocar al api

    listar(valor: string,id: string, page?: number, pages?: number){
      let urls = `${this.url}?valor=${valor}&id=${id}&page=${page}&pages=${pages}&column=Codigo`;

      return this.http.get<Datacollection>(urls)
            .toPromise()
            .then(res => res)
            .then(data => data);
   }

    Eliminar(id: string){
      let urls = `${this.url}/${id}`;
      return this.http.delete<Responses>(urls);
    }

    Guardar(id: string, model: EquipoMedicoExamen){
      if(id==""){
        let urls = `${this.url}`;
        return this.http.post<Responses>(urls, model);
      }else{
        let urls = `${this.url}/${id}`;
        return this.http.put<Responses>(urls, model);
      }
    }
}