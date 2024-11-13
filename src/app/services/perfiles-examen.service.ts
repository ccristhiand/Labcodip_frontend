import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Responses } from '../models/utils/responses.model';
import { PerfilExamenes } from '../models/perfiles.model';
@Injectable({
    providedIn: 'root'
  })
  export class PerfilesExamenService{
    constructor(
        private http: HttpClient
      ) { }

      private url: string = `${environment.UrlApi3}/perfilexamen`;

      GuardarPerfilesExamen(model?: PerfilExamenes[]){
          let urls = `${this.url}/PostMasivo`;
          return this.http.post<Responses>(urls, model);
        }
      }
