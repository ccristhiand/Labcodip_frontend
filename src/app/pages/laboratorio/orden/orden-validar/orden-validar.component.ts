import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Options} from 'src/app/models/utils/options.model';
import { OrdenExamen, OrdenValidate } from 'src/app/models/orden.model';
import { OrdenService } from 'src/app/services/orden.service';
import { environment } from 'src/environments/environment';
import { MenuItem, MessageService } from 'primeng/api';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-orden-validar',
  templateUrl: './orden-validar.component.html',
  styleUrl: './orden-validar.component.scss',
  providers: [MessageService]
})
export class OrdenValidarComponent implements OnInit {

  items: MenuItem[] = [];

  datacollection: OrdenExamen[] = [];

  loading: boolean = true;
  
  form!: FormGroup;
  essi = false;
  id: string =  "";
  idlab: string =  "";
  idarea: string =  "";

  listaTipodocumento!: Options[];
  tipoDocu: any;

  listaProcedencia!: Options[];
  procedencia: any;

  listaServicio!: Options[];
  servicio: any;

  listaOrigen!: Options[];
  origen: any;

  listaMedico!: Options[];
  medico: any;

  listaLaboratorio!: Options[];
  laboratorio!: any;

  listaArea!: Options[];
  area!: any;

  sesion:any;

  constructor(
    private _fb: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private _ordenService:OrdenService,
    private _messageService: MessageService,
    private _reporteService: ReporteService,
    private _spinnerService: SpinnerService,
    private _usuarioService:UsuarioService
  ) {
  }
  
  ngOnInit() {
    this._activeRoute.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? "":data["id"];
    });

    this.inicializar();
    this.obtener();
  }

  inicializar(){
    this.items = [
      { label: 'Gua. Resultado', icon: 'pi pi-save', command: () => {this.guardar}},
      { label: 'Pre. Validación', icon: 'pi pi-check-circle',  command: () => {this.preValidar} },
      { label: 'Val. Médico', icon: 'pi pi-check',  command: () => {this.validar} },
      { label: 'Quitar Resultados', icon: 'p-button-icon pi pi-trash',  command: () => {this.validar} }
  ];

    this.form = this._fb.group({
      idTipoDocu: {value:null, disabled:true},     
      nombre: {value:null, disabled:true},
      fechaOrden: {value:null, disabled:true},
      idProcedencia: {value:null, disabled:true},
      idServicio: {value:null, disabled:true},
      idMedico: {value:null, disabled:true},
      cama: {value:null, disabled:true},
      observacion: [''],
      idArea: [''],
      idLaboratorio: [''],
    });
    this.sesion = this._usuarioService.SessionUsuario();
  }

  obtener(){
    this._spinnerService.show();

    this._ordenService.Obtener(this.id).subscribe(data=>{
      
      this.listaTipodocumento = data!.listaOpciones.filter(x=>x.tipo==environment.TipoDocumento); 
      this.listaProcedencia = data!.listaOpciones.filter(x=>x.tipo==environment.Procedencia);
      this.listaServicio = data!.listaOpciones.filter(x=>x.tipo==environment.Servicio);
      this.listaOrigen = data!.listaOpciones.filter(x=>x.tipo==environment.Origen);
      this.listaMedico = data!.listaOpciones.filter(x=>x.tipo==environment.Medico);
      this.listaLaboratorio = data!.listaOpciones.filter(x=>x.tipo==environment.Laboratorio);
      this.listaArea = data!.listaOpciones.filter(x=>x.tipo=="Area");

      if(this.id !=""){        
          this.form.patchValue({
            idTipoDocu: data.idTipoDocu,
            nombre:data.nroDocumento + ' - '+ data.nombreCompleto,            
            fechaOrden: new Date(data.fechaOrden!),
            cama: data.cama,
            observacion: null,
            idArea: this.listaArea[0].id
          });  
  
          this.tipoDocu = this.listaTipodocumento.filter(y=>y.id==data.idTipoDocu)[0];
          this.procedencia = this.listaProcedencia.filter(y=>y.id==data.idProcedencia)[0];
          this.servicio = this.listaServicio.filter(y=>y.id==data.idServicio)[0];
          this.medico = this.listaMedico.filter(y=>y.id==data.idMedico)[0];
          this.laboratorio = this.listaLaboratorio[0];
          this.area = this.listaArea[0];;
      }else{
        this.form.patchValue({
          idTipoDocu: null,          
          nombre: null,          
          fechaOrden: new Date(),
          cama: null,
          observacion: null
        });  
        this.laboratorio = this.listaLaboratorio[0];
        this.area = this.listaArea[0]
      };

      this._ordenService.ObtenerExamen(this.id,this.area.id).subscribe(data=>{
        this.datacollection = data;
        this.loading = false;
      });

      this._spinnerService.hide();
    })
  }

  obtenerArea(){  
    this._ordenService.ObtenerExamen(this.id,this.area.id).subscribe(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  obtenerExamen(){  
    this._ordenService.ObtenerExamen(this.id,this.area.id).subscribe(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  guardarResultado(event: Event, id: string){
    let resultado = (event.target as HTMLInputElement).value;

    let ordenExamen = this.datacollection.filter(y=>y.idOrdenExamen==id)[0];

    ordenExamen.resultado = (resultado.replace(/ /g, "")=="")? null! : resultado.replace(/ /g, "");
  }
  
  guardar(){
    let model = new OrdenValidate();

    model.observacion= this.form.value['observacion'];
    model.listaOrdenExamenQuery= this.datacollection;  

    this._spinnerService.show();
    
    this._ordenService.GuardarResult(this.id, model).subscribe(data=>{
      this.obtenerExamen();
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
      this._spinnerService.hide();
    }) 
  }

  preValidar(){
    let model = new OrdenValidate();

    model.observacion= this.form.value['observacion'];
    model.listaOrdenExamenQuery= this.datacollection;  

    this._spinnerService.show();

    this._ordenService.ValidarTecnico(model).subscribe(data=>{
      this.obtenerExamen();
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
      this._spinnerService.hide();
    }) 
  }

  validar(){
    let model = new OrdenValidate();

    model.observacion= this.form.value['observacion'];
    model.listaOrdenExamenQuery= this.datacollection;  

    this._spinnerService.show();

    this._ordenService.ValidateMedico(model).subscribe(data=>{
      this.obtenerExamen();
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
      this._spinnerService.hide();
    }) 
  }

  quitarValidacion(){
    this._spinnerService.show();

    this._ordenService.QuitarValidacion(this.id, this.area.id).subscribe(data=>{
      this.obtenerExamen();
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
      this._spinnerService.hide();
    }) 
  }

  imprimirResultado(){
      this._spinnerService.show();

      this._reporteService.ImprimirResultado(this.id).subscribe(data => {
        let byteChar = atob(data.data!);
        let byteArray = new Array(byteChar.length);
        for(let i = 0; i < byteChar.length; i++){
          byteArray[i] = byteChar.charCodeAt(i);
        }
        let uIntArray = new Uint8Array(byteArray);
        let blob = new Blob([uIntArray], {type : 'application/pdf'});
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, `${"resultado"}.pdf`);

        this._spinnerService.hide();
    });
  }
}
