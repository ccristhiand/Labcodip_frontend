import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { RequestReporte } from 'src/app/models/exportar.model';
import { Orden, OrdenExamen, OrdenValidate } from 'src/app/models/orden.model';
import { Options } from 'src/app/models/utils/options.model';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';
import { OrdenService } from 'src/app/services/orden.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orden-listar',
  templateUrl: './orden-listar.component.html',
  styleUrl: './orden-listar.component.scss',
  providers: [MessageService]
})
export class OrdenListarComponent implements OnInit {
  
  form!: FormGroup;
  datacollection: Orden[] = [];

  loading: boolean = true;
  porOrden: boolean = true;

  listaTipo!: Options[];
  tipo!: any;

  listaEstado!: Options[];
  estado!: any;

  listaLaboratorio!: Options[];
  laboratorio!: any;

  listaArea!: Options[];
  area!: any;

  listaTipoMuestra: TreeNode[] = [];
  tipoMuestra: TreeNode<any> | TreeNode<any>[] | any[] | any;

  listaEquipoMedico!: Options[];
  equipoMedico!: any;

  valCheck: string[] = [];
  valCheck2: string[] = [];
  listadoIdOrden: string[] = [];
  listadoIdOrdenExamen: string[] = [];
  check: boolean = false;

  fechaDesde!: Date;
  fechaHasta!: Date;
  valor: string = "";
  btnValidar: boolean = false;

  tipoMuestraDialog: boolean = false;

  sesion:any;
  @ViewChild('filter') filter!: ElementRef;
  
  constructor(
    private _fb: FormBuilder,
    private _ordenService:OrdenService,
    private _reporteService:ReporteService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService,
    private _usuarioService:UsuarioService
  ) { }

  ngOnInit() {
    this.opciones();
    this.inicializar();
  }

  inicializar(){
    this.form = this._fb.group({
      idEquipoMedico: ['', [Validators.required]]
    });
    this.sesion = this._usuarioService.SessionUsuario();
  }

  opciones(){
    this._spinnerService.show();
    this._ordenService.opciones().subscribe(data=>{

      this.listaTipo = data!.filter(x=>x.tipo==environment.TipoOrden); 
      this.listaEstado = data!.filter(x=>x.tipo==environment.EstadoOrden); 
      this.listaLaboratorio = data!.filter(x=>x.tipo==environment.Laboratorio); 
      this.listaArea = data!.filter(x=>x.tipo==environment.Area); 

      this.tipo = this.listaTipo[0];
      this.estado = this.listaEstado[0];
      this.laboratorio = this.listaLaboratorio[0];
      this.area = this.listaArea[0];

      this.fechaDesde = new Date();
      this.fechaHasta = new Date();

      this.fechaDesde.setHours(12, 0, 0, 0);
      this.fechaHasta.setHours(12, 0, 0, 0);

      this.listar();
      this._spinnerService.hide();
    });
  }


  listar(){  
    let estado = (this.estado.id=="TODO")? "": this.estado.id
    this.porOrden= (this.tipo.id=="ORDE")? true : false;
    this.btnValidar =(this.tipo.id=="ORDE")? false : true;

    this._ordenService.listar(this.valor, this.tipo.id,estado,this.laboratorio.id,this.area.id,this.fechaDesde,this.fechaHasta!,0,1000).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }
  
  valTipoMuestra(){
    let etiqueta=new RequestReporte;
    etiqueta.data = this.valCheck;

    if(this.valCheck.length>0){
      this._spinnerService.show();
      this._ordenService.ValTipoMuestra(etiqueta).subscribe(data => {

        this.listaTipoMuestra = data.listaTipoMuestra as TreeNode[];
        this.listaEquipoMedico = data.listaOpciones!.filter(x=>x.tipo==environment.EquipoMedico);

        this.tipoMuestra = this.listaTipoMuestra;
        this.equipoMedico = this.listaEquipoMedico[0];

        this.tipoMuestraDialog = true;

        this._spinnerService.hide();
     });
    }else{
      this._messageService.add({key: "tst", severity: "warn", summary: "ADVERTENCIA", detail: "Seleccione la orden"});
    }
  }

  imprimirEtiqueta(imprimir: boolean){
    let model=new RequestReporte;
    model.data = this.valCheck;

    if(this.tipoMuestra!=undefined){
      for (var valor of this.tipoMuestra) {
        model.tipoMuestra.push(valor.key);
        imprimir = true
      }
    }

    if(imprimir){
      this._spinnerService.show();

      this._reporteService.Etiqueta(model).subscribe(data => {
        let byteChar = atob(data.data!);
        let byteArray = new Array(byteChar.length);
        for(let i = 0; i < byteChar.length; i++){
          byteArray[i] = byteChar.charCodeAt(i);
        }
        let uIntArray = new Uint8Array(byteArray);
        let blob = new Blob([uIntArray], {type : 'application/pdf'});
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, `${"etiqueta"}.pdf`);

        this._spinnerService.hide();
    });
    }else{
      this._messageService.add({key: "tst", severity: "warn", summary: "ADVERTENCIA", detail: "Seleccione tipo de muestra"});
    }

  }

  marcarOrden(){
    if(!this.check){
      this.datacollection.forEach(element => {
        this.listadoIdOrden.push(element.idOrden!);
        if(element.estado!=environment.Validado && element.estado!=environment.Pendiente){
          this.listadoIdOrdenExamen.push(element.idOrdenExamen!);
        }
      });
      this.valCheck = this.listadoIdOrden;
      this.valCheck2 = this.listadoIdOrden;
      this.check = true;
    }else{
      this.valCheck = [];
      this.valCheck2 = [];
      this.listadoIdOrden = [];
      this.listadoIdOrdenExamen = [];
      this.check = false;
    }  
  }

  cerrar(){
    this.tipoMuestraDialog = false;
  }

  preValidar(){
    let model = new OrdenValidate();

    if(this.listadoIdOrdenExamen.length>0){
        this.listadoIdOrdenExamen.forEach(element => {   
            let modelExamen = new OrdenExamen();
            let resul = this.datacollection.filter(y=>y.idOrdenExamen==element)[0];

            modelExamen.idOrdenExamen = resul.idOrdenExamen;
            modelExamen.resultado = resul.resultado;

            model.listaOrdenExamenQuery.push(modelExamen);
         });
      }
      else{
        this.valCheck.forEach(y => { 
          let ordenExamen = this.datacollection.filter(x=>x.idOrden==y);

          ordenExamen.forEach(element => {
            let modelExamen = new OrdenExamen();
            let resul = this.datacollection.filter(y=>y.idOrdenExamen==element.idOrdenExamen)[0];

            if(resul.estado!=environment.Validado && resul.estado!=environment.Pendiente){
              modelExamen.idOrdenExamen = resul.idOrdenExamen;
              modelExamen.resultado = resul.resultado;
  
              model.listaOrdenExamenQuery.push(modelExamen);
            }
          });
       });
      }

    if(model.listaOrdenExamenQuery.length>0){
      this._spinnerService.show();

      this._ordenService.ValidarTecnico(model).subscribe(data=>{
        this.listar();
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        this._spinnerService.hide();
      });
    }else{
      this._messageService.add({key: "tst", severity: "warn", summary: "ADVERTENCIA", detail: "Algunos exámenes ya son validado"});
    }
   }

  validar(){
    let model = new OrdenValidate();

    if(this.listadoIdOrdenExamen.length>0){
        this.listadoIdOrdenExamen.forEach(element => {   
            let modelExamen = new OrdenExamen();
            let resul = this.datacollection.filter(y=>y.idOrdenExamen==element)[0];

            modelExamen.idOrdenExamen = resul.idOrdenExamen;
            modelExamen.resultado = resul.resultado;

            model.listaOrdenExamenQuery.push(modelExamen);
         });
      }
      else{
        this.valCheck.forEach(y => { 
          let ordenExamen = this.datacollection.filter(x=>x.idOrden==y);

          ordenExamen.forEach(element => {
            let modelExamen = new OrdenExamen();
            let resul = this.datacollection.filter(y=>y.idOrdenExamen==element.idOrdenExamen)[0];

            if(resul.estado!=environment.Validado && resul.estado!=environment.Pendiente){
              modelExamen.idOrdenExamen = resul.idOrdenExamen;
              modelExamen.resultado = resul.resultado;
  
              model.listaOrdenExamenQuery.push(modelExamen);
            }
          });
       });
      }

    if(model.listaOrdenExamenQuery.length>0){
      this._spinnerService.show();

      this._ordenService.ValidateMedico(model).subscribe(data=>{
        this.listar();
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        this._spinnerService.hide();
      });
    }else{
      this._messageService.add({key: "tst", severity: "warn", summary: "ADVERTENCIA", detail: "Algunos exámenes ya son validado"});
    }
  }
}
