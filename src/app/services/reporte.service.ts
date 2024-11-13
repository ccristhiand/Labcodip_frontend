import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { RequestReporte, ResponseReporte } from '../models/exportar.model';
import { Datacollection } from '../models/utils/datacollection.model';
import { ResultadoPacienteQuery } from '../models/resultadopaciente.model';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(
    private http: HttpClient
  ) { }

    //------Llamando el api de una variaboe global

    private url: string = `${environment.UrlApi4}`;


    //------declarando los metodo para invocar al api

    listar(valor: string, fechaInicio: string, fechaFin: string){
      let model = new RequestReporte();

      model.valor = valor;
      model.fechaInicio = fechaInicio;
      model.fechaFin = fechaFin;

      let urls = `${this.url}/reporte/getOrdenPaciente`;

      return this.http.post<Datacollection>(urls,model)
      .toPromise()
      .then(res => res?.items as Datacollection[])
      .then(data => data);
    }

    BuscarPaciente(valor: string){
      let urls = `${this.url}/reporte/getPaciente?valor=${valor}`;

      return this.http.get<Datacollection>(urls)
            .toPromise()
            .then(res => res?.items as Datacollection[])
            .then(data => data);
   }

   BuscarResultadoPaciente(id: string){
    let urls = `${this.url}/reporte/getResultadoPaciente?id=${id}`;

    return this.http.get<ResultadoPacienteQuery>(urls)
          .toPromise()
          .then(res => res as ResultadoPacienteQuery)
          .then(data => data);
  }


    Etiqueta(etiqueta: RequestReporte){
      let urls = `${this.url}/etiqueta/imprimir`;
      return this.http.post<ResponseReporte>(urls, etiqueta);
    }

    ImprimirResultado(id: string){
      let urls = `${this.url}/reporte/resultadoPaciente?id=${id}`;
      return this.http.get<ResponseReporte>(urls);
    }

    Exportar(valor: string, fechaInicio: string, fechaFin: string){
      let model = new RequestReporte();

      model.valor = valor;
      model.fechaInicio = fechaInicio;
      model.fechaFin = fechaFin;

      let urls = `${this.url}/reporte/exportar`;
      return this.http.post<ResponseReporte>(urls, model);
    }

}