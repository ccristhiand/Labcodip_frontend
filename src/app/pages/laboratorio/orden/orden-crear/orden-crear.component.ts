import { Usuario } from 'src/app/models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Options} from 'src/app/models/utils/options.model';
import { Orden, OrdenExamen } from 'src/app/models/orden.model';
import { OrdenService } from 'src/app/services/orden.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';
import { PersonaService } from 'src/app/services/persona.service';
import { PerfilesService} from 'src/app/services/perfiles.service';
import { Perfiles, PerfilExamenes } from 'src/app/models/perfiles.model';
import { UsuarioService} from 'src/app/services/usuario.service';import { Examen } from 'src/app/models/examen.model';
;


@Component({
  selector: 'app-orden-crear',
  templateUrl: './orden-crear.component.html',
  styleUrl: './orden-crear.component.scss',
  providers: [MessageService]
})
export class OrdenCrearComponent implements OnInit {


  form!: FormGroup;
  id: string =  "";
  idarea: string =  "";
  desabilitar: boolean = false;

  listaTipodocumento!: Options[];
  tipoDocu: any;

  listaSexo!: Options[];
  sexo: any;

  listaProcedencia!: Options[];
  procedencia: any;

  listaServicio!: Options[];
  servicio: any;

  listaOrigen!: Options[];
  origen: any;

  listaMedico!: Options[];
  medico: any;

  listaArea: Options[]=     [];
  area: any;

  listaExamenesTem: OrdenExamen[] = [];
  listaExamenesEnvio: OrdenExamen[] = [];

  listaExamenes: OrdenExamen[] = [];
  examenSeleccionado: string[] = [];
  examenDesmarcado: string[] = [];

  primeraCarga: number = 1;

  Perfiles: Perfiles[] = [];

  sesion:any;

  constructor(
    private _fb: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _ordenService:OrdenService,
    private _personaService:PersonaService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService,
    private _perfilService: PerfilesService,
    private _usuarioService:UsuarioService
    ) {
  }

  ngOnInit() {
    this._activeRoute.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? "":data["id"];
      this.desabilitar = (this.id=="")? false : true;
    });

    this.inicializar();
    this.obtener();
    this.ObtenerPerfiles();
  }

  inicializar(){
    this.form = this._fb.group({
      idTipoDocu: [{value:null, disabled:this.desabilitar},[Validators.required]],
      nroDocumento: [{value:null, disabled:this.desabilitar}, [Validators.required, Validators.maxLength(15)]],
      apePaterno: [{value:null, disabled:this.desabilitar}, [Validators.required, Validators.maxLength(50)]],
      apeMaterno: [{value:null, disabled:this.desabilitar}, [Validators.required, Validators.maxLength(50)]],
      nombre: [{value:null, disabled:this.desabilitar}, [Validators.required, Validators.maxLength(50)]],
      idSexo: [{value:null, disabled:this.desabilitar}, [Validators.required]],
      fechaNacimiento: [{value:null, disabled:this.desabilitar}, [Validators.required]],
      edad: {value:null, disabled:true},
      historiaClinica: ['',Validators.maxLength(10)],

      nroAtencion: ['',Validators.maxLength(11)],
      fechaOrden: ['', [Validators.required]],
      idProcedencia: [''],
      idServicio: [''],
      idMedico: [''],
      idOrigen: [''],
      idArea: [''],
      cama: ['',Validators.maxLength(20)]
    });
  }

  obtener(){
    this._spinnerService.show();

    this._ordenService.Obtener(this.id).subscribe(data=>{

      this.listaTipodocumento = data!.listaOpciones.filter(x=>x.tipo==environment.TipoDocumento);
      this.listaSexo = data!.listaOpciones.filter(x=>x.tipo==environment.Sexo);
      this.listaProcedencia = data!.listaOpciones.filter(x=>x.tipo==environment.Procedencia);
      this.listaServicio = data!.listaOpciones.filter(x=>x.tipo==environment.Servicio);
      this.listaOrigen = data!.listaOpciones.filter(x=>x.tipo==environment.Origen);
      this.listaMedico = data!.listaOpciones.filter(x=>x.tipo==environment.Medico);
      this.listaArea = [{id:"TODOS",nombre:"TODOS",tipo:""},...data!.listaOpciones.filter(x=>x.tipo==environment.Area)];

      if(this.id !=""){
          this.form.patchValue({
            idTipoDocu: data.idTipoDocu,
            nroDocumento: data.nroDocumento,
            apePaterno: data.apePaterno,
            apeMaterno: data.apeMaterno,
            nombre: data.nombre,
            fechaNacimiento: new Date(data.fechaNacimiento!),
            edad: data.edad,
            historiaClinica: data.historiaClinica,

            nroAtencion: data.nroAtencion,
            fechaOrden: new Date(data.fechaOrden!),
            cama: data.cama,
            idArea: this.listaArea[0].id
          });

          this.tipoDocu = this.listaTipodocumento.filter(y=>y.id==data.idTipoDocu)[0];
          this.sexo = this.listaSexo.filter(y=>y.id==data.idSexo)[0];
          this.procedencia = this.listaProcedencia.filter(y=>y.id==data.idProcedencia)[0];
          this.servicio = this.listaServicio.filter(y=>y.id==data.idServicio)[0];
          this.origen = this.listaOrigen.filter(y=>y.id==data.idOrigen)[0];
          this.medico = this.listaMedico.filter(y=>y.id==data.idMedico)[0];
          this.area = this.listaArea[0];


      }else{
        this.form.patchValue({
          idTipoDocu: null,
          nroDocumento: null,
          apePaterno: null,
          apeMaterno: null,
          nombre: null,
          fechaNacimiento: null,
          edad: null,
          historiaClinica: null,

          nroAtencion: null,
          fechaOrden: new Date(),
          cama: null,
          idArea: null
        });

        this.tipoDocu = this.listaTipodocumento[0];
        this.sexo = this.listaSexo[0];
        this.area = this.listaArea[0];
      };
      this.sesion = this._usuarioService.SessionUsuario();
      this.obtenerExamen();

    })

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

  buscarExamen(){
   this.obtenerExamen();
  }

  obtenerExamen(text?:Event){
   debugger
   const texto = (event?.target as HTMLInputElement)?.value || '';
    this._spinnerService.show();
    this._ordenService.ObtenerExamen(this.id,this.area.id).subscribe(ordenExamen=>{
      this.listaExamenesTem = ordenExamen;

      this._ordenService.Examen(this.id,this.area.id,texto).subscribe(data=>{
        data.forEach(element => {
          this.listaExamenesTem.push(
            {
              idExamen : element.idExamen,
              nombreExamen: element.nombreExamen,
              abreviatura:element.abreviatura,
              color: (this.examenSeleccionado.filter(y=>y==element.idExamen).length>0)?"new":"",
              resultado: null!
            });
        });

        this.listaExamenesTem.forEach(element => {
            element.resultado = (element.resultado=="")? null!: element.resultado;
            if(element.color=='new' || element.color=='qualified' || element.color=='proposal'){
              this.examenSeleccionado.push(element.idExamen!);
           }
        });

        if(this.examenDesmarcado.length>0){
          this.listaExamenesTem.forEach(element => {
              element.color = (this.examenDesmarcado.filter(y=>y==element.idExamen).length>0)?"":element.color;
          });
        }

        this.examenSeleccionado = [...new Set(this.examenSeleccionado)];
        this.listaExamenes = this.listaExamenesTem;
        this._spinnerService.hide();
      });
    });
  }

  sleccionarExamen(item: Examen){
    var existExamenSelec =  this.examenSeleccionado.filter(y=>y==item.idExamen).length;

    if(existExamenSelec!=0){
        item?.idExamen !== undefined && this.examenDesmarcado.push(item.idExamen);
    //   this.examenDesmarcado.push(item?.idExamen??null);
      this.examenSeleccionado = this.examenSeleccionado.filter(y=>y!=item.idExamen);
      this.listaExamenesEnvio=this.listaExamenesEnvio.filter(x=>x.idExamen!=item.idExamen);
    }else{
        item?.idExamen !== undefined && this.examenSeleccionado.push(item.idExamen);
        this.listaExamenesEnvio.push(item);
    //   this.examenSeleccionado.push(item.idExamen);
    }

    //Cambiando el color de los botones
    var existExamen =  this.listaExamenes.filter(y=>y.idExamen==item.idExamen)[0];

    if(existExamen.color=='new' || existExamen.color=='qualified' || existExamen.color=='proposal'){
      existExamen.color=""
    }else{
      existExamen.color="new"
    }
  }

  guardar(){
    this.examenSeleccionado = this.examenSeleccionado.filter(examen => !this.examenDesmarcado.includes(examen));
    this.examenSeleccionado = Array.from(new Set(this.examenSeleccionado));

    if(this.listaExamenesEnvio.length>0){
      let model = new Orden();

      model.idTipoDocu= this.validar(this.tipoDocu);
      model.nroDocumento= this.form.value['nroDocumento'];
      model.apePaterno= this.form.value['apePaterno'];
      model.apeMaterno= this.form.value['apeMaterno'];
      model.nombre= this.form.value['nombre'];
      model.idSexo= this.validar(this.sexo);
      model.fechaNacimiento= this.form.value['fechaNacimiento'];
      model.historiaClinica= this.form.value['historiaClinica'];
      model.edad= this.form.value['edad'];

      model.idLaboratorio= '1';
      model.idArea= this.validar(this.area);
      model.nroAtencion= this.form.value['nroAtencion'];
      model.fechaOrden=  this.form.value['fechaOrden'];
      model.idProcedencia=  this.validar(this.procedencia);
      model.idServicio= this.validar(this.servicio);
      model.idMedico=  this.validar(this.medico);
      model.idOrigen=  this.validar(this.origen);
      model.cama= this.form.value['cama'];

      model.listaIdOrdenExamenQuery = this.examenSeleccionado
      model.listaOrdenExamenQuery=this.listaExamenesEnvio;
      this._spinnerService.show();

      this._ordenService.Guardar(this.id, model).subscribe(data=>{
          if(data.typeResponse==environment.EXITO){
            this._router.navigate(['/laboratorio/orden']);
          }
          this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});

          this._spinnerService.hide();
        })
    }else{
      this._messageService.add({key: "tst", severity: "warn", summary: "ADVERTENCIA", detail: "Seleccione el examen"});
    }
  }

  validar(valor: any){
    return (valor==undefined || valor=="" || valor==null)? null : valor.id;
  }

ObtenerPerfiles(){
        this._perfilService.listarPerfiles().subscribe(data => {

          this.Perfiles = data;
        });
      }

seleccionarPerfil(perfil:Perfiles){
    debugger
    perfil.perfilExamenes?.forEach((examen:PerfilExamenes)=>{
        if(examen && examen.idExamen!==undefined){
        this.sleccionarExamen(examen);
        const index = this.listaExamenes.findIndex(item => item.idExamen === examen.idExamen);
        this.listaExamenes[index].idperfil=perfil.idPerfil;
        this.listaExamenes[index].nombrePerfil=perfil.nombre;
        }
    });
}

}

