import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { EquipoMedicoExamenService } from 'src/app/services/equipomedicoexamen.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';
import { EquipoMedicoExamen } from 'src/app/models/equipomedico.model';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';


@Component({
  selector: 'app-equipo-crear',
  templateUrl: './equipo-crear.component.html',
  styleUrl: './equipo-crear.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class EquipoCrearComponent implements OnInit {

  form!: FormGroup;
  datacollection: Datacollection[] = [];
  datacollectionexamen: Datacollection[] = [];
  loading: boolean = true;
  formTitulo: string = "CREAR EQUIPO MEDICO";
  formTituloExamen: string = "";
  formTituloMExamen: string ="LISTADOS EXAMENES"

  equipoMedicoExamenDialog: boolean = false;
  deleteEquipoMedicoExamenDialog: boolean = false;
  equipoMedicoExamen: EquipoMedicoExamen = {};
  mensaje: string = "";

  id: string = "";
  valCheck: string[] = [];

  constructor(
    private _fb: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private _equipoMedicoExamenService:EquipoMedicoExamenService,
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
    this._equipoMedicoExamenService.listar(valor,this.id,0,0).then(data => {
      this.datacollection = data?.items!;
      this.formTituloExamen = data?.valor!;
      this.loading = false;
    });
  }

  listarExamen(valor: string){  
    this._examenService.listarExamenPorEquipoMedico(valor,this.id,0,0).then(data => {
      this.datacollectionexamen = data;
      this.loading = false;
    });
  }

  eliminar(equipoMedicoExamen: EquipoMedicoExamen) {
    this.deleteEquipoMedicoExamenDialog = true;
    this.equipoMedicoExamen = { ...equipoMedicoExamen };
    this.mensaje = environment.MensajeEliminado
  }

  confirmar(id: string){
    this.deleteEquipoMedicoExamenDialog = false;

    this._spinnerService.show();

    this._equipoMedicoExamenService.Eliminar(id).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
      if(data.typeResponse==environment.EXITO){
        this.listar("");
      }

      this._spinnerService.hide();
    }) 
  }

  agregarExamen(){
    this.listarExamen("");
    this.equipoMedicoExamenDialog = true;
    this.valCheck =  [];
  }

  guardarExamen(){
    let model = new  EquipoMedicoExamen;
    model.listaIdExamen = this.valCheck;
    model.IdEquipoMedico = this.id;

    this._spinnerService.show();

    this._equipoMedicoExamenService.Guardar("",model).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
      if(data.typeResponse==environment.EXITO){
        this.listar("");
        this.listarExamen("");
        this.valCheck =  [];
      }

      this._spinnerService.hide();
    }) 
  }

  guardarCodigo(event: Event, tipoCodigo: string, id: string){
    let model = new  EquipoMedicoExamen;

    model.codRecibe = (tipoCodigo =='R')?(event.target as HTMLInputElement).value : "";
    model.codDevuelve = (tipoCodigo =='D')?(event.target as HTMLInputElement).value : "";
    model.tipoCodigo = tipoCodigo;

    this._equipoMedicoExamenService.Guardar(id,model).subscribe(data=>{
      if(data.typeResponse==environment.EXITO){
        this.listar("");
      }
    }) 
  }

  cerrar(){
    this.equipoMedicoExamenDialog = false;
  }
  
}