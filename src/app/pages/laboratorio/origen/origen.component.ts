import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';

import { Origen } from 'src/app/models/origen.model';
import { OrigenService } from 'src/app/services/origen.service';
import { SpinnerService } from '../../components/spinner/spinner.service';


@Component({
  selector: 'app-origen',
  templateUrl: './origen.component.html',
  styleUrl: './origen.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class OrigenComponent implements OnInit {

  form!: FormGroup;
  datacollection: Datacollection[] = [];
  loading: boolean = true;

  origenDialog: boolean = false;
  deleteOrigenDialog: boolean = false;
  mensaje: string = "";
  origen: Origen = {};
  tipo: string = "";

  id: string = "";
  valor: string = "";

  constructor(
    private _fb: FormBuilder,
    private _origenService:OrigenService,
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
    this._origenService.listar(this.valor,0,1000).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  inicializar(){
    this.form = this._fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  editar(origen?: Origen) {
    this.id = (origen==undefined)? "": origen.idOrigen!;

      if(this.id!=""){
        this._spinnerService.show();
        this._origenService.Obtener(this.id!).subscribe(data=>{
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

      this.origenDialog = true;
  }
 
  cambiarEstado(origen: Origen) {
    this.deleteOrigenDialog = true;
    this.origen = { ...origen };
    this.mensaje = (origen.estado==environment.EstadoActivo)? environment.MensajeDesactivado: environment.MensajeActivo;
    this.tipo = environment.EstadoActivo
  }

  eliminar(origen: Origen) {
    this.deleteOrigenDialog = true;
    this.origen = { ...origen };
    this.mensaje = environment.MensajeEliminado
    this.tipo = environment.EstadoEliminado
  }

  confirmar(id: string, tipo: string){
    this.deleteOrigenDialog = false;

    this._spinnerService.show();
    if(tipo==environment.EstadoEliminado){
      this._origenService.Eliminar(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }
        this._spinnerService.hide();
      }) 
    }else{
      this._origenService.CambiarEstado(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }
        this._spinnerService.hide();
      }) 
    }
  }

  guardar(){
    let model = new Origen();

    model.idOrigen = this.id
    model.nombre= this.form.value['nombre'];
    model.idLaboratorio= "1"; 
    model.idArea= "1";    

    this._spinnerService.show();
    this._origenService.Guardar(model.idOrigen!, model).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrar();
          this.listar();
        }
        this._spinnerService.hide();
      }) 
  }

  cerrar(){
    this.origenDialog = false;
  }
  
}


