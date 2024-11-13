import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Datacollection } from '../models/utils/datacollection.model';
import { Responses } from '../models/utils/responses.model';
import { Options } from '../models/utils/options.model';
import { Orden, OrdenExamen, OrdenReq, OrdenValidate } from '../models/orden.model';
import { RequestReporte } from '../models/exportar.model';
import { Reporte } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

 
  constructor(
    private http: HttpClient
  ) { }

    //------Llamando el api de una variaboe global

    private url: string = `${environment.UrlApi2}/orden`;


    //------declarando los metodo para invocar al api

    listar(valor: string, tipoOrden: string, estado?: string, idlab?: string, idarea?: string, desde?: Date, hasta?: Date, page?: number, pages?: number){
      let model = new OrdenReq();
      model.valor = valor;
      model.tipoOrden = tipoOrden;
      model.estado = estado;
      model.idlab = idlab;
      model.idarea = idarea;
      model.desde = desde;
      model.hasta = hasta;
      model.page = page;
      model.pages = pages;

      let urls = `${this.url}/listarOrden`;

      return this.http.post<Datacollection>(urls, model)
            .toPromise()
            .then(res => res?.items as Orden[])
            .then(data => data);
   }

   opciones(){
    let urls = `${this.url}/option`;
      return this.http.get<Options[]>(urls);
   }

    Obtener(id: string){
      let urls = `${this.url}/find?id=${id}`;
      return this.http.get<Orden>(urls);
    }

    ObtenerExamen(id: string, idarea: string){
      let urls = `${this.url}/FindExamen?id=${id}&idarea=${idarea}`;
      return this.http.get<OrdenExamen[]>(urls);
    }

    Examen(id: string, idArea: string){
      let urls = `${this.url}/Examen?id=${id}&idArea=${idArea}`;
      return this.http.get<OrdenExamen[]>(urls);
    }

    Guardar(id: string, model: Orden){
      if(model.fechaNacimiento!=undefined){
        model.fechaNacimiento.setHours(12, 0, 0, 0);
      }

      model.fechaOrden!.setHours(12, 0, 0, 0);

      if(id==""){
        let urls = `${this.url}`;
        return this.http.post<Responses>(urls, model);
      }else{
        let urls = `${this.url}/${id}`;
        return this.http.put<Responses>(urls, model);
      }
    }

    GuardarResult(id: string, model: OrdenValidate){
      let urls = `${this.url}/postResult/${id}`;
      return this.http.put<Responses>(urls, model);
    }
    
    ValidarTecnico(model: OrdenValidate){
      let urls = `${this.url}/validateTecnico`;
      return this.http.put<Responses>(urls, model);
    }

    ValidateMedico(model: OrdenValidate){
      let urls = `${this.url}/validateMedico`;
      return this.http.put<Responses>(urls, model);
    }
    
    QuitarValidacion(id: string, idArea: string){
      let urls = `${this.url}/quitarValidacion/${id}`;
      let model= new OrdenValidate;

      model.idArea = idArea;

      return this.http.put<Responses>(urls,model);
    }

    ValTipoMuestra(etiqueta: RequestReporte){
      let urls = `${this.url}/valTipoMuestra`;
      return this.http.post<Reporte>(urls, etiqueta);
    }
}

