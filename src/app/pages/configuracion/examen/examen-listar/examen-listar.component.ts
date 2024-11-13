import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { Examen } from 'src/app/models/examen.model';
import { ExamenService } from 'src/app/services/examen.service';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';


@Component({
  selector: 'app-examen-listar',
  templateUrl: './examen-listar.component.html',
  styleUrl: './examen-listar.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ExamenListarComponent implements OnInit {
  
  datacollection: Datacollection[] = [];
  loading: boolean = true;

  deleteExamenDialog: boolean = false;
  mensaje: string = "";
  examen: Examen = {};
  tipo: string = "";

  valor: string = "";

  constructor(
    private _examenService:ExamenService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.listar();
  }

  buscar(event: Event){
    this.valor = (event.target as HTMLInputElement).value;
    this.listar();
  }

  listar(){  
    this._examenService.listar(this.valor,0,0).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  cambiarEstado(examen: Examen) {
    this.deleteExamenDialog = true;
    this.examen = { ...examen };
    this.mensaje = (examen.estado==environment.EstadoActivo)? environment.MensajeDesactivado: environment.MensajeActivo;
    this.tipo = environment.EstadoActivo
  }

  eliminar(examen: Examen) {
    this.deleteExamenDialog = true;
    this.examen = { ...examen };
    this.mensaje = environment.MensajeEliminado
    this.tipo = environment.EstadoEliminado
  }

  confirmar(id: string, tipo: string){
    this.deleteExamenDialog = false;

    this._spinnerService.show();

    if(tipo==environment.EstadoEliminado){
      this._examenService.Eliminar(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      }) 
    }else{
      this._examenService.CambiarEstado(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      })
    }
  }  
}

