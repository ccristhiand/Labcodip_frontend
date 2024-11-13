import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Datacollection } from '../models/utils/datacollection.model';
import { Responses } from '../models/utils/responses.model';
import { Procedencia } from '../models/procedencia.model';


@Injectable({
  providedIn: 'root'
})
export class ProcedenciaService {

  constructor(
    private http: HttpClient
  ) { }

  //------Llamando el api de una variaboe global

  private url: string = `${environment.UrlApi2}/procedencia`;


  //------declarando los metodo para invocar al api

  listar(valor: string, page?: number, pages?: number){
    let urls = `${this.url}?valor=${valor}&page=${page}&pages=${pages}`;

    return this.http.get<Datacollection>(urls)
          .toPromise()
          .then(res => res?.items as Datacollection[])
          .then(data => data);
  }

 Obtener(id: string){
    let urls = `${this.url}/find?id=${id}`;
    return this.http.get<Procedencia>(urls);
  }

  CambiarEstado(id: string){
    let urls = `${this.url}/${id}`;
    return this.http.patch<Responses>(urls, id);
  }

  Eliminar(id: string){
    let urls = `${this.url}/${id}`;
    return this.http.delete<Responses>(urls);
  }

  Guardar(id: string, model: Procedencia){
    if(id==""){
      let urls = `${this.url}`;
      return this.http.post<Responses>(urls, model);
    }else{
      let urls = `${this.url}/${id}`;
      return this.http.put<Responses>(urls, model);
    }
  }
}
