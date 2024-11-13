import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { Options } from 'src/app/models/utils/options.model';

import { SpinnerService } from '../../components/spinner/spinner.service';
import { Reactivo } from 'src/app/models/reactivo.mocel';
import { ReactivoService } from 'src/app/services/reactivo.service';
import { ReactivoDet, ReactivoExamen } from 'src/app/models/reactivodet.mocel';
import { ReactivoDetService } from 'src/app/services/reactivodet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ConfiguracionComponent implements OnInit {

  form!: FormGroup;
  formR!: FormGroup;
  datacollection: Datacollection[] = [];
  dataDetcollection: ReactivoExamen[] = [];
  loading: boolean = true;

  listaEquipoMedico!: Options[];
  equipoMedico!: any;

  listaModo!: Options[];
  modo!: any;

  listaReactivoExamen1: ReactivoExamen[] = [];
  listaReactivoExamen2: ReactivoExamen[] = [];
  selectedReactivoExamen1: ReactivoExamen[] = [];
  selectedReactivoExamen2: any;

  configDialog: boolean = false;
  deleteConfigDialog: boolean = false;

  reactivoDialog: boolean = false;
  deleteReactivoDialog: boolean = false;

  mensaje: string = "";
  nombreConfiguracion: string = "";
  nombreReactivo: string = "";

  reactivo: Reactivo = {};
  tipo: string = "";

  id: string = "";
  idSelect: string = "";
  idAreaSelect: string = "";
  idmodoSelect: string = "";
  nombreSelect: string = "";
  areaSelect: string = "";
  tipoControlSelect: string = "";

  porexamen: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _reactivoService:ReactivoService,
    private _reactivodetService:ReactivoDetService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.listar();
    this.inicializar();
  }

  listar(){   
    this._reactivoService.listar("",0,0).then(data => {
      this.datacollection = data;
      this.loading = false;

      if(data!=null){
        this.mapear(data[0] as Reactivo);
      }
    });
  }

  listaDet(id: string){
    this._reactivodetService.listar(this.idSelect,0,0).then(data => {
      this.dataDetcollection = data as ReactivoExamen[];
      this.loading = false;
    });
  }

  inicializar(){
    this.form = this._fb.group({
      idEquipoMedico: ['',[Validators.required]],
      idModo: ['',[Validators.required]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  modalConfiguracion(reactivo?: Reactivo) {
    this.id = (reactivo==undefined)? "": reactivo.idReactivo!;

      this._spinnerService.show();
      this._reactivoService.Obtener(this.id!).subscribe(data=>{

      this.listaEquipoMedico = data.listaOpciones!.filter(x=>x.tipo==environment.EquipoMedico);
      this.listaModo = data.listaOpciones!.filter(x=>x.tipo==environment.Modo);
      
      if(this.id!=""){    

        this.equipoMedico = this.listaEquipoMedico.filter(y=>y.id==data.idEquipoMedico)[0];
        this.modo = this.listaModo.filter(y=>y.id==data.idModo)[0];

        this.form.patchValue({
          idLaboratorio: data.idLaboratorio,
          idArea: data.idArea,
          idEquipoMedico: data.idEquipoMedico,
          idModo: data.idModo,
          nombre: data.nombre
        }); 

      }else{
        this.form.patchValue({
          idLaboratorio: null,
          idArea: null,
          idEquipoMedico: null,
          idModo: null,
          nombre: null
        });  


        this.equipoMedico = this.listaEquipoMedico[0];
        this.modo = this.listaModo[0];

      }      

      this.configDialog = true;

      this._spinnerService.hide();
    });
  }

  modalAgregarReactivo() {
    if(this.idSelect!="" && this.idSelect!=null){
      this._spinnerService.show();
      this._reactivodetService.Examen(this.idAreaSelect!).subscribe(data=>{
     
      this.porexamen = (this.idmodoSelect==environment.ModoPorGrupo)? true : false
      this.listaReactivoExamen1 = data!; 
      this.listaReactivoExamen2 = data!; 

      this.form.patchValue({
        idReactivoDet: null,
        idReactivo: null,
        idExamen: null,
        nombre: null,
      });  

      this.reactivoDialog = true;

      this._spinnerService.hide();
      });
    }else{
      this._messageService.add({key: "tsc", severity: "warn", summary: "ADVERTENCIA", detail: "Seleccion la configuración"});
    }
  }

  eliminar(reactivo: Reactivo) {
    this.deleteConfigDialog = true;
    this.reactivo = { ...reactivo };
    this.mensaje = environment.MensajeEliminado
    this.tipo = environment.EstadoEliminado
  }

  confirmar(id: string){
    this.deleteConfigDialog = false;

    this._spinnerService.show();
    this._reactivoService.Eliminar(id).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
      if(data.typeResponse==environment.EXITO){
        this.listar();
      }
      this._spinnerService.hide();
    }); 
  }

  guardarConfig(){
    let model = new Reactivo();

    model.idReactivo =this.id;
    model.idEquipoMedico= this.equipoMedico.id;
    model.idModo= this.modo.id;
    model.nombre= this.form.value['nombre'];

    this._spinnerService.show();
    this._reactivoService.Guardar(model.idReactivo, model).subscribe(data=>{
       this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrarConfig();
          this.listar();
        }
        this._spinnerService.hide();
      }) 
  }

  guardarReactivo(){
    let model = new ReactivoDet();

    model.idReactivo= this.idSelect;
    model.nombre= this.nombreSelect;
    model.idModo= this.idmodoSelect;

    if(this.idmodoSelect==environment.ModoPorExamen){  
      let examen = new  ReactivoExamen();

      model.idExamen = this.selectedReactivoExamen2.idExamen;
      model.nombre = this.selectedReactivoExamen2.nombre;
      examen.idExamen = this.selectedReactivoExamen2.idExamen;
      model.listaReactivoExamen.push(examen);
    }
    else if(this.idmodoSelect==environment.ModoPorGrupo){
      this.selectedReactivoExamen1.forEach(y=>{
        let examen = new  ReactivoExamen();
        examen.idExamen = y.idExamen;
        model.listaReactivoExamen.push(examen);
      });
    } 

    this._spinnerService.show();
    this._reactivodetService.Guardar("", model).subscribe(data=>{
       this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrarReactivo();
          this.listaDet(this.idSelect);
        }
        this._spinnerService.hide();
      }) 
  }

  directExamen(id: string){
    let url  = "/controlcalidad/configuracion/examen/"+id;
    this._router.navigate([url]);
  }

  cerrarConfig(){
    this.configDialog = false;
  }

  mapear(reactivo: Reactivo){
    this.nombreConfiguracion = reactivo.nombre!;
    this.idSelect = reactivo.idReactivo!;
    this.idAreaSelect = reactivo.idArea!;
    this.idmodoSelect = reactivo.idModo!;
    this.areaSelect = reactivo.nombreArea!;
    this.tipoControlSelect = reactivo.nombre!;

    // this.nombreReactivo = "| "+ reactivo.nombreLaboratorio +" | "+reactivo.nombreArea+" | "+reactivo.nombreEquipo+" | "+reactivo.nombre+" |";
    this.nombreReactivo = reactivo.nombre!;
    
    this.listaDet(this.idSelect);
  }

  cerrarReactivo(){
    this.reactivoDialog = false;
  }
  
}

