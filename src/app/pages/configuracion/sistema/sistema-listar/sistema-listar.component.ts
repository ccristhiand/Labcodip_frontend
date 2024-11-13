import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { SistemaService } from 'src/app/services/sistema.service';
import { SistemaCliente, SistemaClienteExamen } from 'src/app/models/sistemacliente.model';
import { Options } from 'src/app/models/utils/options.model';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';

@Component({
  selector: 'app-sistema-listar',
  templateUrl: './sistema-listar.component.html',
  styleUrl: './sistema-listar.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class SistemaListarComponent implements OnInit {

  form!: FormGroup;
  datacollection: Datacollection[] = [];
  dataanalizador: SistemaClienteExamen[] = [];
  loading: boolean = true;
  formTitulo: string = "CREAR SISTEMA EXTERNO";

  sistemaClienteDialog: boolean = false;
  deleteSistemaClienteDialog: boolean = false;
  mensaje: string = "";
  sistemaCliente: SistemaCliente = {};
  tipo: string = "";

  listaTipoBaseDato!: Options[];
  tipoBaseDato: any;

  id: string = "";
  valor: string = "";

  constructor(
    private _fb: FormBuilder,
    private _sistemaService:SistemaService,
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
    this._sistemaService.listar(this.valor,0,0).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  inicializar(){
    this.form = this._fb.group({
      nombre: ['',[Validators.required, Validators.maxLength(50)]],
      server: ['',[Validators.required, Validators.maxLength(50)]],
      idTipoBaseDato: ['',[Validators.required]],
      baseDeDatos: ['',[Validators.required, Validators.maxLength(50)]],
      usuario: ['',[Validators.required, Validators.maxLength(50)]],
      contrasena: ['',[Validators.required, Validators.maxLength(50)]]
    });
  }

  editar(sistemaCliente?: SistemaCliente) {
      this.id = (sistemaCliente==undefined)? "": sistemaCliente.idSistemaCliente!;

      this._spinnerService.show();

      this._sistemaService.Obtener(this.id).subscribe(data=>{

      this.listaTipoBaseDato = data.listaOpciones!;

      if(this.id!=""){

        this.form.patchValue({
          nombre: data.nombre,
          server: data.server,
          idTipoBaseDato: data.idTipoBaseDato,
          baseDeDatos: data.baseDeDatos,
          usuario: data.usuario,
          contrasena: data.contrasena
        });  

        this.formTitulo = "EDITAR SISTEMA EXTERNO";

      }else{
        this.form.patchValue({
          nombre: null,
          server: null,
          idTipoBaseDato: null,
          baseDeDatos: null,
          usuario: null,
          contrasena: null,
        });  
      }      
      
       this.tipoBaseDato =  (data.idTipoBaseDato==null)? this.listaTipoBaseDato[0] : this.listaTipoBaseDato.filter(y=>y.id==data.idTipoBaseDato)[0];

      this.sistemaClienteDialog = true;

      this._spinnerService.hide();
    });
  }
 
  cambiarEstado(sistemaCliente: SistemaCliente) {
    this.deleteSistemaClienteDialog = true;
    this.sistemaCliente = { ...sistemaCliente };
    this.mensaje = (sistemaCliente.estado==environment.EstadoActivo)? environment.MensajeDesactivado: environment.MensajeActivo;
    this.tipo = environment.EstadoActivo
  }

  eliminar(sistemaCliente: SistemaCliente) {
    this.deleteSistemaClienteDialog = true;
    this.sistemaCliente = { ...sistemaCliente };
    this.mensaje = environment.MensajeEliminado
    this.tipo = environment.EstadoEliminado
  }

  confirmar(id: string, tipo: string){
    this.deleteSistemaClienteDialog = false;

    this._spinnerService.show();

    if(tipo==environment.EstadoEliminado){
      this._sistemaService.Eliminar(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      }) 
    }else{
      this._sistemaService.CambiarEstado(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      }) 
    }
  }

  guardar(){
    let model = new SistemaCliente();

    model.nombre= this.form.value['nombre'];
    model.server= this.form.value['server'];
    model.idTipoBaseDato= this.tipoBaseDato.id,
    model.baseDeDatos=this.form.value['baseDeDatos'];
    model.usuario= this.form.value['usuario'];
    model.contrasena= this.form.value['contrasena'];

    this._spinnerService.show();

    this._sistemaService.Guardar(this.id, model).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrar();
          this.listar();
        }

        this._spinnerService.hide();
      }) 
  }


  cerrar(){
    this.sistemaClienteDialog = false;
  }
  
}