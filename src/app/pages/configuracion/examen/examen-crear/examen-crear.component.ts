import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Options} from 'src/app/models/utils/options.model';
import { environment } from 'src/environments/environment';
import { ExamenService } from 'src/app/services/examen.service';
import { Examen, ExamenRango } from 'src/app/models/examen.model';
import { MessageService } from 'primeng/api';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';
import { parse } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-examen-crear',
  templateUrl: './examen-crear.component.html',
  styleUrl: './examen-crear.component.scss',
  providers: [MessageService]
})
export class ExamenCrearComponent implements OnInit {

  datacollection: ExamenRango[] = [];
  datainterpretado: ExamenRango[] = [];
  datanointerpretado1: ExamenRango[] = [];
  datanointerpretado2: ExamenRango[] = [];
  datanointerpretado3: ExamenRango[] = [];

  form!: FormGroup;
  id: string =  "";
  formTitulo: string = "CREAR EXAMEN";

  listaTipomuestra!: Options[];
  tipomuestra: any;

  listaArea!: Options[];
  area: any;

  listaInterpretacion!: Options[];
  interpretacion: any;

  listaSexo!: Options[];
  sexo: any;
  tiempoTrackingMin:any;
  listaSignoComparativo!: Options[];
  signoComparativo: any;

  listaTipoCongRango!: Options[];
  tipoCongRango!: any;

  listaInterpretacion2!: Options[];
  interpretacion2: any;
  
  valColor = '#424242';
  validar = "SEXO";

  constructor(
    private _fb: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _examenService:ExamenService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService) {
  }
  
  ngOnInit() {
    this._activeRoute.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? "":data["id"]; 
    });

    this.inicializar();
  }

  inicializar(){
    this.form = this._fb.group({
      idTipoMuestra: ['',[Validators.required]],
      idArea: ['',[Validators.required]],
      abreviatura: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      unidadMedida: ['', [Validators.maxLength(50)]],
      calculado: ['', [Validators.maxLength(50)]],
      cantidadDecimal: ['',[Validators.maxLength(2)]],
      rangoMostrar: ['', [Validators.maxLength(300)]],
      idSexo: [''],
      tipoCongRango: [''],

      edadInicio: [''],
      edadFinal: [''],
      valorMinimo: [''],
      valorMaximo: [''],
      sigComparativo: [''],
      idInterpretado: [''],
      color: [''],
      tiempoTrackingMin:['']
    });
    this.obtener();
  }

  obtener(){
    this._spinnerService.show();

    this._examenService.Obtener(this.id).subscribe(data=>{
      this._spinnerService.hide();
      this.listaTipomuestra = data.listaOpciones!.filter(x=>x.tipo==environment.TipoMuestra); 
      this.listaArea = data.listaOpciones!.filter(x=>x.tipo==environment.Area);
      this.listaInterpretacion = data.listaOpciones!.filter(x=>x.tipo==environment.Interpretado);
      this.listaSignoComparativo = data.listaOpciones!.filter(x=>x.tipo==environment.SignoComparativo);
      this.listaSexo = data.listaOpciones!.filter(x=>x.tipo==environment.Sexo);
      this.listaTipoCongRango = data.listaOpciones!.filter(x=>x.tipo==environment.TipoConfRango);
      this.listaInterpretacion2 = data.listaOpciones!.filter(x=>x.tipo==environment.Interpretado2);

      if(this.id !=""){        
          this.form.patchValue({
            idTipoMuestra: data.idTipoMuestra,
            idArea: data.idArea,
            abreviatura: data.abreviatura,
            nombre: data.nombre,
            unidadMedida: data.unidadMedida,
            calculado: data.calculado,
            cantidadDecimal: data.cantidadDecimal,
            rangoMostrar: data.rangoMostrar,
            tipoCongRango: data.tipoCongRango,
            color: data.color,
            tiempoTrackingMin:data.tiempoTrackingMin
          });  
          this.tipomuestra = this.listaTipomuestra.filter(y=>y.id==data.idTipoMuestra)[0];
          this.area = this.listaArea.filter(y=>y.id==data.idArea)[0];
          this.interpretacion = this.listaInterpretacion[0];
          this.interpretacion2 = this.listaInterpretacion2[0];
          this.signoComparativo = this.listaSignoComparativo[0];
          this.sexo = this.listaSexo[0];
          this.tipoCongRango = (data.tipoCongRango==null)? this.listaTipoCongRango[0] : this.listaTipoCongRango.filter(y=>y.id==data.tipoCongRango)[0];
          this.validar = this.tipoCongRango.id;


          this.datanointerpretado1 = data.listaExamenRango1!;
          this.datanointerpretado2 = data.listaExamenRango2!;
          this.datanointerpretado3 = data.listaExamenRango4!;
          this.datainterpretado = data.listaExamenRango3!
          this.valColor = data.color!;
          
      }else{
        this.form.patchValue({
          idTipoMuestra: null,
          idArea: null,
          abreviatura: null,
          nombre: null,
          unidadMedida: null,
          calculado: null,
          cantidadDecimal: null,
          rangoMostrar: null,
          color: this.valColor,
          tiempoTracking:null

        });  

        this.tipomuestra = this.listaTipomuestra[0];
        this.area = this.listaArea[0];
        this.interpretacion = this.listaInterpretacion[0];
        this.interpretacion2 = this.listaInterpretacion2[0];
        this.signoComparativo = this.listaSignoComparativo[0];
        this.sexo = this.listaSexo[0];
        this.tipoCongRango = this.listaTipoCongRango[0];
        this.validar = this.tipoCongRango.id;

      };
    })
  }

  agregarRango(){
    let model = new ExamenRango();
    let date =new  Date;

    model.idExamenRango = date.getHours()+""+date.getMinutes()+""+date.getSeconds()+""+date.getMilliseconds();
    model.idExamen = this.id;
    model.idInterpretado = (this.tipoCongRango.id=="SEXO")? this.sexo.id! : ((this.tipoCongRango.id=="INT1")? this.interpretacion2.id : this.interpretacion.id);
    model.interpretado =  (this.tipoCongRango.id=="SEXO")? this.sexo.nombre! : ((this.tipoCongRango.id=="INT1")? this.interpretacion2.nombre : this.interpretacion.nombre);
    model.edadInicio= (this.tipoCongRango.id=="SEXO")? this.form.value['edadInicio'] : null!;
    model.edadFinal= (this.tipoCongRango.id=="SEXO")? this.form.value['edadFinal'] : null!;
    model.valorMinimo= this.form.value['valorMinimo'];
    model.valorMaximo= this.form.value['valorMaximo'];   
    model.sigComparativo= (!this.signoComparativo)? null! : this.signoComparativo.id;

    model.valorMinimo = model.valorMinimo?.toString();
    model.valorMaximo = model.valorMaximo?.toString();

    if(this.tipoCongRango.id=="INT2"){
      let result = this.datainterpretado.filter(y=>y.idInterpretado==model.idInterpretado)[0];
      if(result==null){
        this.datainterpretado.push(model);
      }
    }

    if(this.tipoCongRango.id=="INT3"){
      model.idInterpretado = "INT3";
      model.interpretado = "";
      this.datanointerpretado3.push(model);
    }

    if(this.tipoCongRango.id=="SEXO"){
      this.datanointerpretado1.push(model);
    }

    if(this.tipoCongRango.id=="INT1"){
      this.datanointerpretado2.push(model);
    }

    this.mostrarRango();
  }

  eliminarRango(data: ExamenRango){
    let id = data.idExamenRango;

    this._spinnerService.show();

    this._examenService.EliminarRango(data.idExamenRango!).subscribe(data=>{

        if(this.tipoCongRango.id=="INT2"){
          this.datainterpretado = this.datainterpretado.filter(y=>y.idExamenRango!=id);
        }
        if(this.tipoCongRango.id=="SEXO"){
          this.datanointerpretado1 = this.datanointerpretado1.filter(y=>y.idExamenRango!=id);
        }
        if(this.tipoCongRango.id=="INT1"){
          this.datanointerpretado2 = this.datanointerpretado2.filter(y=>y.idExamenRango!=id);
        }
        if(this.tipoCongRango.id=="INT3"){
          this.datanointerpretado3 = this.datanointerpretado3.filter(y=>y.idExamenRango!=id);
        }

        this.mostrarRango();

        if(data.id!=null){
          this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        }else{
          this._messageService.add({key: "tst", severity: "success", summary: "ÉXITO", detail: "eliminado con exito"});
        }

        this._spinnerService.hide();
      }) 
  }

  mostrarRango(){
    let valor = "";
    this.validar = this.tipoCongRango.id;

    if(this.tipoCongRango.id=="INT2"){
        this.datainterpretado.forEach(y=>{
          valor +=y.idInterpretado+":"+" "+y.valorMinimo+" "+y.sigComparativo+" "+y.valorMaximo+"\n"
        });
    }

    if(this.tipoCongRango.id=="SEXO"){
      this.datanointerpretado1.forEach(y=>{
        valor +=y.idInterpretado+":"+" "+y.valorMinimo +" "+y.sigComparativo+" "+y.valorMaximo+"\n"
      });
    }

    if(this.tipoCongRango.id=="INT1"){
      this.datanointerpretado2.forEach(y=>{
        valor +=y.idInterpretado+":"+" "+y.valorMinimo +" "+y.sigComparativo+" "+y.valorMaximo+"\n"
      });
    }

    if(this.tipoCongRango.id=="INT3"){
      this.datanointerpretado3.forEach(y=>{
        valor +=y.valorMinimo+" "+y.sigComparativo+" "+ y.valorMaximo+"\n"
      });
    }

    this.form.patchValue({
      rangoMostrar: valor,
    });  
  
  }

  guardar(){
    let model = new Examen();

    model.idArea= this.area.id
    model.idTipoMuestra= this.tipomuestra.id;
    model.abreviatura= this.form.value['abreviatura'];
    model.nombre= this.form.value['nombre'];
    model.unidadMedida= this.form.value['unidadMedida'];
    model.calculado= this.form.value['calculado'];
    model.cantidadDecimal= this.form.value['cantidadDecimal'];
    model.rangoMostrar= this.form.value['rangoMostrar'];
    model.color= this.form.value['color'];
    model.tiempoTrackingMin=this.form.value['tiempoTrackingMin'];
    model.tipoCongRango= this.tipoCongRango.id;
    model.orden = 1;

    if(this.tipoCongRango.id=="INT2"){
      model.listaExamenRango= this.datainterpretado;
    }
    if(this.tipoCongRango.id=="SEXO"){
      model.listaExamenRango = this.datanointerpretado1;
    }
    if(this.tipoCongRango.id=="INT1"){
      model.listaExamenRango = this.datanointerpretado2;
    }
    if(this.tipoCongRango.id=="INT3"){
      model.listaExamenRango = this.datanointerpretado3;
    }

    this._spinnerService.show();

    this._examenService.Guardar(this.id, model).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this._router.navigate(['/configuracion/examenes']);
        }

        this._spinnerService.hide();
      }) 
  }

  cambiarColor(){
  }
}