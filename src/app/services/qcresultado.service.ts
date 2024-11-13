import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { QCResultado, QCResultadoCReate } from '../models/reactivodet.mocel';
import { Responses } from '../models/utils/responses.model';


@Injectable({
  providedIn: 'root'
})
export class QCResultadoService {

  constructor(
    private http: HttpClient
  ) { }

    //------Llamando el api de una variaboe global

    private url: string = `${environment.UrlApi6}/qcresultado`;


    //------declarando los metodo para invocar al api

    listarArea(){
      let urls = `${this.url}/getArea`;
      return this.http.get<QCResultado>(urls);
   }

   listarControl(id: string){
    let urls = `${this.url}/getControl?id=${id}`;
    return this.http.get<QCResultado>(urls);
  }

  listarExamen(id: string){
    let urls = `${this.url}/getExamen?id=${id}`;
    return this.http.get<QCResultado>(urls);
  }

  listarLoteNivel(id: string){
    let urls = `${this.url}/getLoteNivel?id=${id}`;
    return this.http.get<QCResultado>(urls);
  }

  listarResultado(idreactivodet: string,idexamen: string,idlote: string,idnivel: string,dateini:string,datefin:string){
    let urls = `${this.url}/getResultado?idreactivodet=${idreactivodet}&idexamen=${idexamen}&idlote=${idlote}&idnivel=${idnivel}&dateini=${dateini}&datefin=${datefin}`;
    return this.http.get<QCResultado>(urls);
  }

  Guardar(model: QCResultadoCReate){
    let urls = `${this.url}`;
    return this.http.post<Responses>(urls, model);
  }

}