import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Datacollection } from '../models/utils/datacollection.model';
import { Login, TokenUsuario, Usuario } from '../models/usuario.model';
import { Responses } from '../models/utils/responses.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService  {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

    private socket!: WebSocket;

    private url = environment.UrlApi1.replace('api', 'ws');

    connect(idUser: string): void {
      this.socket = new WebSocket(`${this.url}?userId=${idUser}`);
  
      this.socket.onmessage = (event) => {
        if (event.data === 'logout') {
          this.handleLogout();
        }
      };
  
      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  
    private handleLogout(): void {
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    }
  
    disconnect(): void {
      if (this.socket) {
        this.socket.close();
      }
    }
  }