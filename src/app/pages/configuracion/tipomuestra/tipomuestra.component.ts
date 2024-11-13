import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';

import { TipoMuestra } from 'src/app/models/tipomuestra.model';
import { TipoMuestraService } from 'src/app/services/tipomuestra.service';
import { SpinnerService } from '../../components/spinner/spinner.service';

@Component({
  selector: 'app-tipomuestra',
  templateUrl: './tipomuestra.component.html',
  styleUrl: './tipomuestra.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class TipomuestraComponent implements OnInit {

  form!: FormGroup;
  datacollection: Datacollection[] = [];
  loading: boolean = true;
  formTitulo: string = "CREAR TIPO MUESTRA";

  tipoMuestraDialog: boolean = false;
  deleteTipoMuestraDialog: boolean = false;
  mensaje: string = "";
  tipoMuestra: TipoMuestra = {};
  tipo: string = "";

  id: string = "";
  valor: string = "";

  constructor(
    private _fb: FormBuilder,
    private _tipoMuestraService:TipoMuestraService,
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
    this._tipoMuestraService.listar(this.valor,0,0).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  inicializar(){
    this.form = this._fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['',[Validators.maxLength(100)]],
      codigoTipoMuestra: ['', [Validators.maxLength(2)]]
    });
  }

  editar(tipoMuestra?: TipoMuestra) {
      this.id = (tipoMuestra==undefined)? "": tipoMuestra.idTipoMuestra!;

      this._spinnerService.show();

      this._tipoMuestraService.Obtener(this.id!).subscribe(data=>{

      if(this.id!=""){

        this.form.patchValue({
          nombre: data.nombre,
          descripcion: data.descripcion,  
          codigoTipoMuestra: data.codigoTipoMuestra          
        });  

        this.formTitulo = "EDITAR TIPO MUESTRA";
        
      }else{
        this.form.patchValue({
          nombre: null,
          descripcion: null,
          codigoTipoMuestra: null
        });  
      }      

      this.tipoMuestraDialog = true;

      this._spinnerService.hide();
    });
  }
 
  cambiarEstado(tipoMuestra: TipoMuestra) {
    this.deleteTipoMuestraDialog = true;
    this.tipoMuestra = { ...tipoMuestra };
    this.mensaje = (tipoMuestra.estado==environment.EstadoActivo)? environment.MensajeDesactivado: environment.MensajeActivo;
    this.tipo = environment.EstadoActivo
  }

  eliminar(tipoMuestra: TipoMuestra) {
    this.deleteTipoMuestraDialog = true;
    this.tipoMuestra = { ...tipoMuestra };
    this.mensaje = environment.MensajeEliminado
    this.tipo = environment.EstadoEliminado
  }

  confirmar(id: string, tipo: string){
    this.deleteTipoMuestraDialog = false;

    this._spinnerService.show();

    if(tipo==environment.EstadoEliminado){
      this._tipoMuestraService.Eliminar(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      }) 
    }else{
      this._tipoMuestraService.CambiarEstado(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      }) 
    }
  }

  guardar(){
    let model = new TipoMuestra();

    model.codigoTipoMuestra= this.form.value['codigoTipoMuestra'];
    model.nombre= this.form.value['nombre'];
    model.descripcion= this.form.value['descripcion'];
    
    this._spinnerService.show();

    this._tipoMuestraService.Guardar(this.id, model).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrar();
          this.listar();
        }

        this._spinnerService.hide();
      }) 
  }

  cerrar(){
    this.tipoMuestraDialog = false;
  }
  
}


