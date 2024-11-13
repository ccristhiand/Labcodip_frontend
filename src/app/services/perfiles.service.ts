import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Datacollection } from '../models/utils/datacollection.model';
import { Responses } from '../models/utils/responses.model';
import { Perfiles } from '../models/perfiles.model';
@Injectable({
    providedIn: 'root'
  })
  export class PerfilesService{
    constructor(
        private http: HttpClient
      ) { }

      private url: string = `${environment.UrlApi3}/perfil`;

      listar(valor?: string, page?: number, pages?: number){
        let urls = `${this.url}?valor=${valor}&page=${page}&pages=${pages}`;

        return this.http.get<Datacollection>(urls)
              .toPromise()
              .then(res => res?.items as Datacollection[])
              .then(data => data);
      }

      listarPerfiles(){
        let urls = `${this.url}/GetPerfiles`;
        return this.http.get<Perfiles[]>(urls);
      }

      Eliminar(id: string){
        let urls = `${this.url}/${id}`;
        return this.http.delete<Responses>(urls);
      }

      Guardar(id: string, model: Perfiles){
        if(id==""){
          let urls = `${this.url}`;
          return this.http.post<Responses>(urls, model);
        }else{
          let urls = `${this.url}/${id}`;
          return this.http.put<Responses>(urls, model);
        }
      }
      ObtenerPerfiles(id:string){
        let url=`${this.url}/find/${id}`;
        return this.http.get<Perfiles>(url);
      }

  }
