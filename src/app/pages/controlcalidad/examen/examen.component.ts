import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { Options} from 'src/app/models/utils/options.model';
import { environment } from 'src/environments/environment';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';
import { QCRangoService } from 'src/app/services/qcrango.service';
import { MessageService } from 'primeng/api';
import { QCRangoDet } from 'src/app/models/reactivodet.mocel';
import { Lote } from 'src/app/models/lote.model';
import { Nivel } from 'src/app/models/nivel.model';
import { LoteService } from 'src/app/services/lote.service';
import { NiveleService } from 'src/app/services/nivel.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.scss',
  providers: [MessageService]
})
export class ExamenComponent implements OnInit {

  datacollection: QCRangoDet[] = [];

  loading: boolean = true;
  
  form!: FormGroup;

  listaLote!: Options[];
  lote: any;

  listaNivel!: Options[];
  nivel: any;

  listaOrigen!: Options[];
  origen: any;

  control: any;
  fecha: any;

  id: string =  "";
  tabla: string = "";

  controls: string = "";
  examens: string = "";
  rangodesde: string = "";
  rangomedia: string = "";
  rangohasta: string = "";
  desviacion: string = "";
  idexamen: string = "";
  idreactivodet: string= "";
  idqcrango: string = "";

  modalLoteNivelDialog: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private _qcrangoService:QCRangoService,
    private _loteService:LoteService,
    private _niveleService:NiveleService,    
    private _messageService: MessageService,
    private _spinnerService: SpinnerService
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
    this.form = this._fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(15)]],
      fechaExpiracion: ['']
    });
  }

  obtener(){
    this._spinnerService.show();

    let stridlote = (this.lote==undefined)? "" : this.lote.id;
    let stridnivel = (this.nivel==undefined)? "" : this.nivel.id;

    this._qcrangoService.Obtener(this.id, stridlote, stridnivel).subscribe(data=>{

      this.listaLote = data!.listaOpciones.filter(x=>x.tipo==environment.Lote); 
      this.listaNivel = data!.listaOpciones.filter(x=>x.tipo==environment.Nivel);

      this.control = data.nombreControl;
      this.lote = (data.idLote==null)? this.lote : this.listaLote.filter(y=>y.id==data.idLote)[0];
      this.nivel = (data.idNivel==null)? this.nivel : this.listaNivel.filter(y=>y.id==data.idNivel)[0];
      this.fecha = data.fechaExpiracion

      this._qcrangoService.listar(this.id,data.idLote,data.idNivel).then(data => {
        this.datacollection = data!.listaQCRangoDet;
        this.loading = false;
      });

      this._spinnerService.hide();
    })
  }

  listar(){
    this._qcrangoService.listar(this.id,this.lote.id,this.nivel.id).then(data => {
      this.datacollection = data!.listaQCRangoDet;
      this.fecha = data?.fechaExpiracion
      this.loading = false;
    });
  }

  modalLoteNivel(valor: string) {

    this.form.patchValue({
      nombre: null,
      fechaExpiracion: null
    });  

      this.tabla = valor;

      this.modalLoteNivelDialog = true;
  }

  guardarLoteNivel(){
    let modelLote = new Lote();
    let modelNivel = new Nivel();

  if(this.tabla=='L'){
    modelLote.idReactivoDet =  this.id;
    modelLote.nombre = this.form.value['nombre'];
    modelLote.fechaExpiracion= this.form.value['fechaExpiracion'];

    this._spinnerService.show();

    this._loteService.Guardar(modelLote).subscribe(data=>{
       this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrarLoteNivel();
          this.obtener();
        }
        this._spinnerService.hide();
      })
  }
  else if(this.tabla=="N"){

    modelNivel.idReactivoDet =  this.id;
    modelNivel.nombre = this.form.value['nombre'];

    this._spinnerService.show();

    this._niveleService.Guardar(modelNivel).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrarLoteNivel();
          this.obtener();
        }
        this._spinnerService.hide();
      }) 
    }
  }

  cerrarLoteNivel(){
    this.modalLoteNivelDialog = false;
  }

  validardecimal(valor: string){    
    let result = 0;
    if(valor==null){
      result = 0;
    }else if(valor.toString().trim()==""){
      result = 0;
    }else{
      let  $result =parseFloat(valor);
      if (isNaN($result)) {
        result = 0
      } else {
        result = $result;
      }
    }

    return result;
  }

  guardarResultado(event: Event, id: string, idexamen: string, type: string){
    if(this.lote==undefined){
      this._messageService.add({key: "tst", severity: "warn", summary: "ADVERTENCIA", detail: "Seleccione el lote"});
      return;
    }

    if(this.lote==undefined){
      this._messageService.add({key: "tst", severity: "warn", summary: "ADVERTENCIA", detail: "Seleccione el nivel"});
      return;
    }

    let rangomedia = "";
    let desviacion = "";
    let data = this.datacollection.filter(y=>y.idReactivoDet ==id && y.idExamen==idexamen)[0];
    
    let valor = (event.target as HTMLInputElement).value;
    valor = (valor.replace(/ /g, "")=="")? null! : valor.replace(/ /g, "");

    switch (type){
      case environment.RangoMinimo:        
        data.rangoMinimo = valor;
        break;
      case environment.RangoMaximo:   
        data.rangoMaximo = valor;
        break;
      case environment.RangoMedio:   
        rangomedia = valor;
        break;
      case environment.Desviacion: 
        desviacion = valor;
        break;
    }

    if(data.rangoMinimo!=null && data.rangoMaximo!=null){
      if(rangomedia==""){
        if(desviacion==""){
          data.rangoMedio = ((this.validardecimal(data.rangoMaximo!) + this.validardecimal(data.rangoMinimo!))/2).toFixed(5).toString();
        }
      }else{
        data.rangoMedio = rangomedia;
      }

      if(desviacion==""){
        data.desviacion = ((this.validardecimal(data.rangoMaximo!) - this.validardecimal(data.rangoMinimo!))/4).toFixed(5).toString();
      }else{
        data.desviacion = desviacion;
      }
    }

    let model = new QCRangoDet();

    model.idReactivoDet = data.idReactivoDet;
    model.idLote = this.lote.id;
    model.idNivel = this.nivel.id;
    model.idExamen = idexamen;
    model.rangoMinimo = data.rangoMinimo;
    model.rangoMaximo =   data.rangoMaximo;
    model.rangoMedio =   data.rangoMedio;
    model.desviacion =  data.desviacion;

    this._qcrangoService.Guardar(model).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
      })
  }
}
