import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { Options } from 'src/app/models/utils/options.model';

import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { SpinnerService } from '../../components/spinner/spinner.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-medico-listar',
  templateUrl: './medico-listar.component.html',
  styleUrl: './medico-listar.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class MedicoListarComponent implements OnInit {

  form!: FormGroup;
  datacollection: Datacollection[] = [];
  loading: boolean = true;

  listaTipodocumento!: Options[];
  tipoDocu: any;

  listaSexo!: Options[];
  sexo!: any;

  medicoDialog: boolean = false;
  deleteMedicoDialog: boolean = false;
  mensaje: string = "";
  medico: Medico = {};
  tipo: string = "";

  id: string = "";
  valor: string = "";

  constructor(
    private _fb: FormBuilder,
    private _medicoService:MedicoService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService,
    private _personaService:PersonaService,
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
    this._medicoService.listar(this.valor,0,0).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  inicializar(){
    this.form = this._fb.group({
      idTipoDocu: ['',[Validators.required]],
      nroDocumento: ['', [Validators.required, Validators.maxLength(15)]],
      apePaterno: ['', [Validators.required, Validators.maxLength(50)]],
      apeMaterno: ['', [Validators.required, Validators.maxLength(50)]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      idSexo: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      edad: {value:null, disabled:true},
    });
  }

  editar(medico?: Medico) {
    this.id = (medico==undefined)? "": medico.idMedico!;

      this._spinnerService.show();
      this._medicoService.Obtener(this.id!,"1","1").subscribe(data=>{
      this.listaTipodocumento = data.listaOpciones!.filter(x=>x.tipo==environment.TipoDocumento);
      this.listaSexo = data.listaOpciones!.filter(x=>x.tipo==environment.Sexo);

      if(this.id!=""){

        this.form.patchValue({
          idTipoDocu: data.idTipoDocu,
          nroDocumento: data.nroDocumento,
          apePaterno: data.apePaterno,
          apeMaterno: data.apeMaterno,
          nombre: data.nombre,
          idSexo: data.idSexo,
          fechaNacimiento: new Date(data.fechaNacimiento!),
          edad: data.edad
        });
      }else{
        this.form.patchValue({
          idTipoDocu: null,
          nroDocumento: null,
          apePaterno: null,
          apeMaterno: null,
          nombre: null,
          idSexo: null,
          fechaNacimiento: new Date(),
          edad: null
        });
      }

      this.tipoDocu = (data.idTipoDocu==null)? this.listaTipodocumento[0] : this.listaTipodocumento.filter(y=>y.id==data.idTipoDocu)[0];
      this.sexo = (data.idSexo==null)?this.listaSexo[0] : this.listaSexo.filter(y=>y.id==data.idSexo)[0];

      this.medicoDialog = true;

      this._spinnerService.hide();
    });
  }

  cambiarEstado(medico: Medico) {
    this.deleteMedicoDialog = true;
    this.medico = { ...medico };
    this.mensaje = (medico.estado==environment.EstadoActivo)? environment.MensajeDesactivado: environment.MensajeActivo;
    this.tipo = environment.EstadoActivo
  }

  eliminar(medico: Medico) {
    this.deleteMedicoDialog = true;
    this.medico = { ...medico };
    this.mensaje = environment.MensajeEliminado
    this.tipo = environment.EstadoEliminado
  }

  confirmar(id: string, tipo: string){
    this.deleteMedicoDialog = false;

    this._spinnerService.show();
    if(tipo==environment.EstadoEliminado){
      this._medicoService.Eliminar(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }
        this._spinnerService.hide();
      })
    }else{
      this._medicoService.CambiarEstado(id).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.listar();
        }
        this._spinnerService.hide();
      })
    }
  }

  guardar(){
    let model = new Medico();

    model.idMedico = this.id
    model.idTipoDocu= this.tipoDocu.id;
    model.nroDocumento= this.form.value['nroDocumento'];
    model.apePaterno= this.form.value['apePaterno'];
    model.apeMaterno= this.form.value['apeMaterno'];
    model.nombre= this.form.value['nombre'];
    model.idSexo=  this.sexo.id;
    model.fechaNacimiento= this.form.value['fechaNacimiento'];
    model.idLaboratorio= "1";
    model.idArea= "1";

    this._spinnerService.show();
    this._medicoService.Guardar(model.idMedico, model).subscribe(data=>{
       this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          this.cerrar();
          this.listar();
        }
        this._spinnerService.hide();
      })
  }

  cerrar(){
    this.medicoDialog = false;
  }
  buscarPersona(){
    this._spinnerService.show();
    let nroDocumento = this.form.value['nroDocumento'];
    this._personaService.Obtener(nroDocumento).subscribe(data=>{
      if(data !=null){
        this.form.patchValue({
          apePaterno: data.apePaterno,
          apeMaterno: data.apeMaterno,
          nombre: data.nombre,
          fechaNacimiento: new Date(data.fechaNacimiento!),
          edad: data.edad,
        });
        this.sexo = this.listaSexo.filter(y=>y.id==data.idSexo)[0];
    }else{
      this.form.patchValue({
        apePaterno: null,
        apeMaterno: null,
        nombre: null,
        fechaNacimiento: null,
        edad: null,
        fechaOrden: new Date(),
      });
      this.sexo = this.listaSexo[0];
    };
    this._spinnerService.hide();
  })
}

}

