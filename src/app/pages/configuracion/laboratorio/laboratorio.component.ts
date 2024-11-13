import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';

import { Laboratorio } from 'src/app/models/laboratorio.model';
import { LaboratorioService } from 'src/app/services/laboratorio.service';
import { SpinnerService } from '../../components/spinner/spinner.service';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrl: './laboratorio.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class LaboratorioComponent implements OnInit {

  form!: FormGroup;
  datacollection: Datacollection[] = [];
  loading: boolean = true;
  formTitulo: string = "CREAR HOSPITAL";

  laboratorioDialog: boolean = false;
  deleteLaboratorioDialog: boolean = false;
  mensaje: string = "";
  laboratorio: Laboratorio = {};
  tipo: string = "";

  id: string = "";
  valor: string = "";

  constructor(
    private _fb: FormBuilder,
    private _laboratorioService:LaboratorioService,
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
    this._laboratorioService.listar(this.valor,0,0).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  inicializar(){
    this.form = this._fb.group({
      codigoLaboratorio: ['', [Validators.maxLength(5)]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  editar(laboratorio?: Laboratorio) {
      this.id = (laboratorio==undefined)? "": laboratorio.idLaboratorio!;

      this._spinnerService.show();

      this._laboratorioService.Obtener(this.id!).subscribe(data=>{

      if(this.id!=""){

        this.form.patchValue({
          codigoLaboratorio: data.codigoLaboratorio,
          nombre: data.nombre
        });

        this.formTitulo = "EDITAR HOSPITAL";

      }else{
        this.form.patchValue({
          codigoLaboratorio: null,
          nombre: null
        });
      }

      this.laboratorioDialog = true;

      this._spinnerService.hide();
    });
  }

  cambiarEstado(laboratorio: Laboratorio) {
    this.deleteLaboratorioDialog = true;
    this.laboratorio = { ...laboratorio };
    this.mensaje = (laboratorio.estado==environment.EstadoActivo)? environment.MensajeDesactivado: environment.MensajeActivo;
    this.tipo = environment.EstadoActivo
  }

  eliminar(laboratorio: Laboratorio) {
    this.deleteLaboratorioDialog = true;
    this.laboratorio = { ...laboratorio };
    this.mensaje = environment.MensajeEliminado
    this.tipo = environment.EstadoEliminado
  }

  confirmar(id: string, tipo: string){
    this.deleteLaboratorioDialog = false;

    this._spinnerService.show();

    if(tipo==environment.EstadoEliminado){
      this._laboratorioService.Eliminar(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      })
    }else{
      this._laboratorioService.CambiarEstado(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      })
    }
  }

  guardar(){
    let model = new Laboratorio();

    model.idLaboratorio = this.id
    model.codigoLaboratorio= this.form.value['codigoLaboratorio'];
    model.nombre= this.form.value['nombre'];

    this._spinnerService.show();

    this._laboratorioService.Guardar(model.idLaboratorio, model).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrar();
          this.listar();
        }

        this._spinnerService.hide();
      })
  }

  cerrar(){
    this.laboratorioDialog = false;
  }

}


