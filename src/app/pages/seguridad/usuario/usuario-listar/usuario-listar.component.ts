import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.scss'],
  providers: [MessageService]
})
export class UsuarioListarComponent  implements OnInit {

  datacollection: Datacollection[] = [];

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  
  constructor(
    private _usuarioService:UsuarioService,
  ) { }

  ngOnInit() {
    this._usuarioService.listar("1","1",0,50).then(usuario => {
      this.datacollection = usuario;
      this.loading = false;
      // @ts-ignore
      // this.customers1.forEach(customer => customer.date = new Date(customer.date));
    });
  }

}
