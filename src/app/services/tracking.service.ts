import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Datacollection } from '../models/utils/datacollection.model';
import { Responses } from '../models/utils/responses.model';
import { SistemaCliente } from '../models/sistemacliente.model';
import { tracking } from '../models/tracking.model';


@Injectable({
  providedIn: 'root'
})
export class trackingService {

  constructor(
    private http: HttpClient
  ) { }

    //------Llamando el api de una variaboe global

    private url: string = `${environment.UrlApi5}/tracking`;
    //------declarando los metodo para invocar al api
    Obtener(DateInit:string,DateFin:string,text?:string, page?: number, pages?: number){
       let urls = `${this.url}?dateInit=${DateInit}&dateFin=${DateFin}&text=${text}&page=${page}&pages=${pages}`;
       return this.http.get<Datacollection>(urls)
            .toPromise()
            .then(res => res?.items as Datacollection[])
            .then(data => data);;
    }   
}