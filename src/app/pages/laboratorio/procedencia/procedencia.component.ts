import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { Procedencia } from 'src/app/models/procedencia.model';
import { ProcedenciaService } from 'src/app/services/procedencia.service';
import { SpinnerService } from '../../components/spinner/spinner.service';

@Component({
  selector: 'app-procedencia',
  templateUrl: './procedencia.component.html',
  styleUrl: './procedencia.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ProcedenciaComponent implements OnInit {

  form!: FormGroup;
  datacollection: Datacollection[] = [];
  loading: boolean = true;

  procedenciaDialog: boolean = false;
  procedenciaDeleteDialog: boolean = false;
  mensaje: string = "";
  procedencia: Procedencia = {};
  tipo: string = "";

  id: string = "";
  valor: string = "";

  constructor(
    private _fb: FormBuilder,
    private _procedenciaService:ProcedenciaService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService

  ) { }

  ngOnInit() {
    this.listar();
    this.inicializar();
  }

  buscar(event: Event){
    this.valor = (event.target as HTMLInputElement).value;
    this.listar();
  }

  listar(){   
    this._procedenciaService.listar(this.valor,0,1000).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  inicializar(){
    this.form = this._fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  editar(procedencia?: Procedencia) {
    this.id = (procedencia==undefined)? "": procedencia.idProcedencia!;

      if(this.id!=""){
        this._spinnerService.show();
        this._procedenciaService.Obtener(this.id!).subscribe(data=>{
          this.form.patchValue({
            nombre: data.nombre
          });
          this._spinnerService.hide();
        });        
      }else{
        this.form.patchValue({
          nombre: null
        });  
      }  

      this.procedenciaDialog = true;
  }
 
  cambiarEstado(procedencia: Procedencia) {
    this.procedenciaDeleteDialog = true;
    this.procedencia = { ...procedencia };
    this.mensaje = (procedencia.estado==environment.EstadoActivo)? environment.MensajeDesactivado: environment.MensajeActivo;
    this.tipo = environment.EstadoActivo
  }

  eliminar(procedencia: Procedencia) {
    this.procedenciaDeleteDialog = true;
    this.procedencia = { ...procedencia };
    this.mensaje = environment.MensajeEliminado
    this.tipo = environment.EstadoEliminado
  }

  confirmar(id: string, tipo: string){
    this.procedenciaDeleteDialog = false;

    this._spinnerService.show();
    if(tipo==environment.EstadoEliminado){
      this._procedenciaService.Eliminar(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }
        this._spinnerService.hide();
      }) 
    }else{
      this._procedenciaService.CambiarEstado(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }
        this._spinnerService.hide();
      }) 
    }
  }

  guardar(){
    let model = new Procedencia();

    model.idProcedencia = this.id
    model.nombre= this.form.value['nombre'];
    model.idLaboratorio= "1"; 
    model.idArea= "1"; 

    this._spinnerService.show();
    this._procedenciaService.Guardar(model.idProcedencia!, model).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrar();
          this.listar();
        }
        this._spinnerService.hide();
      }) 
  }

  cerrar(){
    this.procedenciaDialog = false;
  }
  
}