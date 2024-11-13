import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { Options } from 'src/app/models/utils/options.model';;
import { EquipoMedicoService } from 'src/app/services/equipomedico.service';
import { EquipoMedico, EquipoMedicoAnalizador } from 'src/app/models/equipomedico.model';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';

@Component({
  selector: 'app-equipo-listar',
  templateUrl: './equipo-listar.component.html',
  styleUrl: './equipo-listar.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class EquipoListarComponent implements OnInit {

  form!: FormGroup;
  datacollection: Datacollection[] = [];
  dataanalizador: EquipoMedicoAnalizador[] = [];
  loading: boolean = true;
  formTitulo: string = "CREAR EQUIPO MEDICO";

  listaLaboratorio!: Options[];
  laboratorio: any;

  listaArea!: Options[];
  area: any;

  equipoMedicoDialog: boolean = false;
  deleteEquipoMedicoDialog: boolean = false;
  mensaje: string = "";
  equipoMedico: EquipoMedico = {};
  tipo: string = "";

  id: string = "";
  valor: string = "";

  constructor(
    private _fb: FormBuilder,
    private _equipoMedicoService:EquipoMedicoService,
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
    this._equipoMedicoService.listar(this.valor,0,0).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  inicializar(){
    this.form = this._fb.group({
      nombre: ['',[Validators.required, Validators.maxLength(50)]],
      detalle: ['', Validators.maxLength(50)],
      idLaboratorio: ['',[Validators.required]],
      idArea: ['',[Validators.required]],
      serialPuerto: ['COM1'],
      serialBaudrate: ['9600'],
      serialDataBit: ['8'],
    });
  }

  editar(equipoMedico?: EquipoMedico) {
      this.id = (equipoMedico==undefined)? "": equipoMedico.idEquipoMedico!;

      this._spinnerService.show();

      this._equipoMedicoService.Obtener(this.id).subscribe(data=>{

      this.listaLaboratorio = data.listaOpciones!.filter(x=>x.tipo==environment.Laboratorio);
      this.listaArea = data.listaOpciones!.filter(x=>x.tipo==environment.Area);
      this.dataanalizador = data.listaEquipoMedicoAnalizador!;

      if(this.id!=""){

        this.form.patchValue({
          idEquipoMedico: data.idEquipoMedico,
          nombre: data.nombre,
          detalle: data.detalle,
          idLaboratorio: data.idLaboratorio,
          idArea: data.idArea,
        });  

        this.formTitulo = "EDITAR EQUIPO MEDICO";

      }else{
        this.form.patchValue({
          idEquipoMedico: null,
          nombre: null,
          detalle: null,
          idLaboratorio: null,
          idArea: null,
          serialPuerto: 'COM1',
          serialBaudrate: '9600',
          serialDataBit: '8',
        });  
      }      

      this.laboratorio = (data.idLaboratorio==null)? this.listaLaboratorio[0] : this.listaLaboratorio.filter(y=>y.id==data.idLaboratorio)[0];
      this.area = (data.idArea==null)? this.listaArea[0] : this.listaArea.filter(y=>y.id==data.idArea)[0];

      this.equipoMedicoDialog = true;

      this._spinnerService.hide();
    });
  }
 
  cambiarEstado(equipoMedico: EquipoMedico) {
    this.deleteEquipoMedicoDialog = true;
    this.equipoMedico = { ...equipoMedico };
    this.mensaje = (equipoMedico.estado==environment.EstadoActivo)? environment.MensajeDesactivado: environment.MensajeActivo;
    this.tipo = environment.EstadoActivo
  }

  eliminar(equipoMedico: EquipoMedico) {
    this.deleteEquipoMedicoDialog = true;
    this.equipoMedico = { ...equipoMedico };
    this.mensaje = environment.MensajeEliminado
    this.tipo = environment.EstadoEliminado
  }

  confirmar(id: string, tipo: string){
    this.deleteEquipoMedicoDialog = false;

    this._spinnerService.show();

    if(tipo==environment.EstadoEliminado){
      this._equipoMedicoService.Eliminar(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      }) 
    }else{
      this._equipoMedicoService.CambiarEstado(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }

        this._spinnerService.hide();
      }) 

    }
  }

  guardar(){
    let model = new EquipoMedico();

    model.idLaboratorio = this.laboratorio.id;
    model.idArea = this.area.id;
    model.nombre = this.form.value['nombre'];
    model.detalle = this.form.value['detalle'];
    model.listaEquipoMedicoAnalizador = this.dataanalizador;

    this._spinnerService.show();

    this._equipoMedicoService.Guardar(this.id, model).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrar();
          this.listar();
        }

        this._spinnerService.hide();
      }) 
  }

  agregarAnalizador(){
    let model = new EquipoMedicoAnalizador();

    let date =new  Date;
    model.idEquipoMedicoAnalizador = date.getHours()+""+date.getMinutes()+""+date.getSeconds()+""+date.getMilliseconds();
    model.serialPuerto= this.form.value['serialPuerto'];
    model.serialBaudrate= this.form.value['serialBaudrate'];  
    model.serialDataBit= this.form.value['serialDataBit'];    

    this.dataanalizador.push(model);
  }

  eliminarAnalizador(data: EquipoMedicoAnalizador){
    let id = data.idEquipoMedicoAnalizador;

    this._spinnerService.show();

    this._equipoMedicoService.EliminarAnalizador(id!).subscribe(data=>{
        this._spinnerService.hide();
        this.dataanalizador = this.dataanalizador.filter(y=>y.idEquipoMedicoAnalizador!=id);
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
      }) 
  }

  cerrar(){
    this.equipoMedicoDialog = false;
  }
  
}



