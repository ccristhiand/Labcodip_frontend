import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';
import { SistemaExamenService } from 'src/app/services/sistemaexamen.service';
import { SistemaClienteExamen } from 'src/app/models/sistemacliente.model';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';


@Component({
  selector: 'app-sistema-crear',
  templateUrl: './sistema-crear.component.html',
  styleUrl: './sistema-crear.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class SistemaCrearComponent implements OnInit {

  form!: FormGroup;
  datacollection: Datacollection[] = [];
  datacollectionexamen: Datacollection[] = [];
  loading: boolean = true;
  formTitulo: string = "CREAR SISTEMA EXTERNO";
  formTituloExamen: string = "";
  formTituloMExamen: string ="LISTADOS EXAMENES"

  sistemaClienteExamenDialog: boolean = false;
  deleteSistemaClienteExamenDialog: boolean = false;
  sistemaClienteExamen: SistemaClienteExamen = {};
  mensaje: string = "";

  id: string = "";
  valCheck: string[] = [];

  constructor(
    private _fb: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private _sistemaExamenService:SistemaExamenService,
    private _examenService:ExamenService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this._activeRoute.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? "":data["id"]; 
    });

    this.listar("");
  }

  buscar(event: Event){
    let valor = (event.target as HTMLInputElement).value;
    this.listar(valor);
  }

  buscarExamen(event: Event){
    let valor = (event.target as HTMLInputElement).value;
    this.listarExamen(valor);
  }

  listar(valor: string){  
    this._sistemaExamenService.listar(valor,this.id,0,0).then(data => {
      this.datacollection = data?.items!;
      this.formTituloExamen = data?.valor!;
      this.loading = false;
    });
  }

  listarExamen(valor: string){  
    this._examenService.listarExamenPorSistemaExterno(valor,this.id,0,0).then(data => {
      this.datacollectionexamen = data;
      this.loading = false;
    });
  }

  eliminar(sistemaClienteExamen: SistemaClienteExamen) {
    this.deleteSistemaClienteExamenDialog = true;
    this.sistemaClienteExamen = { ...sistemaClienteExamen };
    this.mensaje = environment.MensajeEliminado
  }

  confirmar(id: string){
    this.deleteSistemaClienteExamenDialog = false;

    this._sistemaExamenService.Eliminar(id).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
      if(data.typeResponse==environment.EXITO){
        this.listar("");
      }
    }) 

    // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 300 });
  }

  agregarExamen(){
    this.listarExamen("");
    this.sistemaClienteExamenDialog = true;
    this.valCheck =  [];
  }

  guardarExamen(){
    let model = new  SistemaClienteExamen;
    model.listaIdExamen = this.valCheck;
    model.idSistemaCliente = this.id;

    if(this.valCheck.length>0){
      this._sistemaExamenService.Guardar("",model).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar("");
          this.listarExamen("");
          this.valCheck =  [];
        }
      }) 
    }
  }

  guardarCodigo(event: Event, tipoCodigo: string, id: string){
    let model = new  SistemaClienteExamen;

    model.codRecibe = (tipoCodigo =='R')?(event.target as HTMLInputElement).value : "";
    model.codDevuelve = (tipoCodigo =='D')?(event.target as HTMLInputElement).value : "";
    model.tipoCodigo = tipoCodigo;

    this._sistemaExamenService.Guardar(id,model).subscribe(data=>{
      if(data.typeResponse==environment.EXITO){
        this.listar("");
      }
    }) 
  }

  cerrar(){
    this.sistemaClienteExamenDialog = false;
  }
  
}
