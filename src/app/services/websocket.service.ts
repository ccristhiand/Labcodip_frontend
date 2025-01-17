import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

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

    // private url = 'wss://netcodip.com:8010/ws';

    connect(id: string): void {
      this.socket = new WebSocket(`${this.url}?userId=${id}`);
  
      this.socket.onmessage = (event) => {
        if (event.data == 'logout-warning') {
          this.showLogoutWarning();
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
  
    private showLogoutWarning(): void {
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    }
  
    disconnect(): void {
      if (this.socket) {
        this.socket.close();
      }
    }
  }