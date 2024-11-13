import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { Options } from 'src/app/models/utils/options.model';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';
import { SpinnerService } from '../../components/spinner/spinner.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class AreaComponent implements OnInit {

  form!: FormGroup;
  datacollection: Datacollection[] = [];
  loading: boolean = true;
  formTitulo: string = "CREAR AREA";

  listaLaboratorio!: Options[];
  laboratorio: any;

  areaDialog: boolean = false;
  deleteAreaDialog: boolean = false;
  mensaje: string = "";
  area: Area = {};
  tipo: string = "";

  id: string = "";
  valor: string = "";

  constructor(
    private _fb: FormBuilder,
    private _areaService:AreaService,
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
    this._areaService.listar(this.valor,0,0).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  inicializar(){
    this.form = this._fb.group({
      idLaboratorio: ['',[Validators.required]],
      nombre: ['',[Validators.required, Validators.maxLength(50)]],
      descripcion: ['', Validators.maxLength(50)]
    });
  }

  editar(area?: Area) {
      this.id = (area==undefined)? "": area.idArea!;

      this._spinnerService.show();

      this._areaService.Obtener(this.id).subscribe(data=>{

      this.listaLaboratorio = data.listaOpciones!; 
      
      if(this.id!=""){

        this.form.patchValue({
          idLaboratorio: data.idLaboratorio,
          nombre: data.nombre,
          descripcion: data.descripcion
        });  

        this.formTitulo = "EDITAR AREA";

      }else{
        this.form.patchValue({
          idLaboratorio: null,
          nombre: null,
          descripcion: null
        });  
      }      

      this.laboratorio = (data.idLaboratorio==null)? this.listaLaboratorio[0] : this.listaLaboratorio.filter(y=>y.id==data.idLaboratorio)[0];

      this.areaDialog = true;

      this._spinnerService.hide();
    });
  }
 
  cambiarEstado(area: Area) {
    this.deleteAreaDialog = true;
    this.area = { ...area };
    this.mensaje = (area.estado==environment.EstadoActivo)? environment.MensajeDesactivado: environment.MensajeActivo;
    this.tipo = environment.EstadoActivo
  }

  eliminar(area: Area) {
    this.deleteAreaDialog = true;
    this.area = { ...area };
    this.mensaje = environment.MensajeEliminado
    this.tipo = environment.EstadoEliminado
  }

  confirmar(id: string, tipo: string){
    this.deleteAreaDialog = false;

    this._spinnerService.show();

    if(tipo==environment.EstadoEliminado){
      this._areaService.Eliminar(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      }) 
    }else{
      this._areaService.CambiarEstado(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      }) 
    }
  }

  guardar(){
    let model = new Area();

    model.idLaboratorio = this.laboratorio.id
    model.nombre= this.form.value['nombre'];
    model.descripcion= this.form.value['descripcion'];

    this._spinnerService.show();

    this._areaService.Guardar(this.id, model).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrar();
          this.listar();
        }
        
        this._spinnerService.hide();
      }) 
  }

  cerrar(){
    this.areaDialog = false;
  }
  
}


