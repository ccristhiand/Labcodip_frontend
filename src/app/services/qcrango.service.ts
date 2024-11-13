import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Datacollection } from '../models/utils/datacollection.model';
import { Responses } from '../models/utils/responses.model';
import { QCRango, QCRangoDet } from '../models/reactivodet.mocel';


@Injectable({
  providedIn: 'root'
})
export class QCRangoService {

  constructor(
    private http: HttpClient
  ) { }

    //------Llamando el api de una variaboe global

    private url: string = `${environment.UrlApi6}/qcrango`;


    //------declarando los metodo para invocar al api

    listar(id: string, idlote?: string, idnivel?: string){
      let urls = `${this.url}?id=${id}&idlote=${idlote}&idnivel=${idnivel}`;

      return this.http.get<QCRango>(urls)
            .toPromise()
            .then(res => res)
            .then(data => data);
   }

    Obtener(id: string, stridlote: string, stridnivel: string){
      let urls = `${this.url}/find?id=${id}&idlote=${stridlote}&idnivel=${stridnivel}`;
      return this.http.get<QCRango>(urls);
    }


    Guardar(model: QCRangoDet){
      model.rangoMinimo= (model.rangoMinimo=="")?null! : model.rangoMinimo!;
      model.rangoMaximo= (model.rangoMaximo=="")?null! : model.rangoMaximo!;
      model.rangoMedio= (model.rangoMedio=="")?null! : model.rangoMedio!;
      model.desviacion= (model.desviacion=="")?null! : model.desviacion!;

      let urls = `${this.url}`;
      return this.http.post<Responses>(urls, model);
    }
}