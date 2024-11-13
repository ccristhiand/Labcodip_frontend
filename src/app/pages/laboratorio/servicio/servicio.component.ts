import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicio.service';
import { SpinnerService } from '../../components/spinner/spinner.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrl: './servicio.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ServicioComponent implements OnInit {
  form!: FormGroup;
  datacollection: Datacollection[] = [];
  loading: boolean = true;

  servicioDialog: boolean = false;
  servicioDeleteDialog: boolean = false;
  mensaje: string = "";
  servicio: Servicio = {};
  tipo: string = "";

  id: string = "";
  valor: string = "";

  constructor(
    private _fb: FormBuilder,
    private _servicioService:ServicioService,
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
    this._servicioService.listar(this.valor,0,1000).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  inicializar(){
    this.form = this._fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  editar(servicio?: Servicio) {
    this.id = (servicio==undefined)? "": servicio.idServicio!;

      if(this.id!=""){
        this._spinnerService.show();
        this._servicioService.Obtener(this.id!).subscribe(data=>{
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

      this.servicioDialog = true;
  }
 
  cambiarEstado(servicio: Servicio) {
    this.servicioDeleteDialog = true;
    this.servicio = { ...servicio };
    this.mensaje = (servicio.estado==environment.EstadoActivo)? environment.MensajeDesactivado: environment.MensajeActivo;
    this.tipo = environment.EstadoActivo
  }

  eliminar(servicio: Servicio) {
    this.servicioDeleteDialog = true;
    this.servicio = { ...servicio };
    this.mensaje = environment.MensajeEliminado
    this.tipo = environment.EstadoEliminado
  }

  confirmar(id: string, tipo: string){
    this.servicioDeleteDialog = false;

    this._spinnerService.show();
    if(tipo==environment.EstadoEliminado){
      this._servicioService.Eliminar(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }
        this._spinnerService.hide();
      }) 
    }else{
      this._servicioService.CambiarEstado(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }
        this._spinnerService.hide();
      }) 
    }
  }

  guardar(){
    let model = new Servicio();

    model.idServicio = this.id
    model.nombre= this.form.value['nombre'];
    model.idLaboratorio= "1"; 
    model.idArea= "1";    

    this._spinnerService.show();
    this._servicioService.Guardar(model.idServicio!, model).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrar();
          this.listar();
        }
        this._spinnerService.hide();
      }) 
  }

  cerrar(){
    this.servicioDialog = false;
  }
  
}
