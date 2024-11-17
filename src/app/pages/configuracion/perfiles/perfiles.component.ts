import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { SpinnerService } from '../../components/spinner/spinner.service';
import { PerfilesService} from 'src/app/services/perfiles.service'
import { Perfiles, PerfilExamenes } from 'src/app/models/perfiles.model';
import { ExamenService } from 'src/app/services/examen.service';
import { Examen } from 'src/app/models/examen.model';
import { Options } from 'src/app/models/utils/options.model';
import { OrdenService } from 'src/app/services/orden.service';
import { PerfilesExamenService} from 'src/app/services/perfiles-examen.service'

@Component({
  selector: 'app-perfiles',
  standalone: false,
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class PerfilesComponent implements OnInit {
  form!: FormGroup;
  datacollection: Datacollection[] = [];
  loading: boolean = true;
  formTitulo: string = "";

  perfilDialog: boolean = false;
  perfilExamenDialog:boolean=false;
  deletePerfilDialog: boolean = false;
  mensaje: string = "";
  perfiles: Perfiles = {};
  examenes:Examen[]=[];
  tipo: string = "";
  id: string = "";
  valor: string = "";

  examenSeleccionado: string[] = [];
  BuscarExamenesText?:string="";
  listaArea!: Options[];
  area?: string="";
  newPerfilExamen:PerfilExamenes={};
    constructor(
        private _fb: FormBuilder,
        private _messageService: MessageService,
        private _spinnerService: SpinnerService,
        private _perfilesService:PerfilesService,
        private _examenService: ExamenService,
        private _ordenService:OrdenService,
        private _perfilesExamenService:PerfilesExamenService
      ) { }
      ngOnInit() {
        this.ListarPerfiles();
        this.inicializar();
        this.obtener();
      }
      obtener(){

        this._spinnerService.show();
        this._ordenService.Obtener(this.id).subscribe(data=>{

          this.listaArea = data!.listaOpciones.filter(x=>x.tipo==environment.Area);

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

            this.area = this.listaArea[0].id;

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
            this.area = this.listaArea[0].id;
          };
          this.ObtenerExamenes();
        })

      }
      buscar(event: Event){
        this.valor = (event.target as HTMLInputElement).value;
        this.ListarPerfiles();
      }

      ListarPerfiles(){
        this._perfilesService.listar(this.valor,0,0).then(data => {
          this.datacollection = data;
          this.loading = false;
        });
      }

      inicializar(){
        this.form = this._fb.group({
          codigoLaboratorio: ['', [Validators.maxLength(5)]],
          nombre: ['', [Validators.required, Validators.maxLength(50)]]
        });
      }

      EditarPerfil(Perfiles?: Perfiles) {
          this.id = (Perfiles==undefined)? "": Perfiles.idPerfil!;
          if(Perfiles!=undefined){
            this._spinnerService.show();
            this._perfilesService.ObtenerPerfiles(this.id!).subscribe(data=>{

                if(this.id!=""){

                  this.form.patchValue({
                    nombre: data.nombre
                  });

                  this.formTitulo = "EDITAR PERFIL";

                }else{
                  this.form.patchValue({
                    nombre: null
                  });
                }
                this._spinnerService.hide();
              });
          }else{
            this.formTitulo = "AGREGAR PERFIL";
          }
          this.perfilDialog = true;
      }

      CambiarEstado(perfil: Perfiles) {//EL CAMBIO DE ESTADO ESTARA PENDIENTE
        this.deletePerfilDialog = true;
        this.perfiles = { ...perfil };
        this.mensaje = (perfil.estado==environment.EstadoActivo)? environment.MensajeDesactivado: environment.MensajeActivo;
        this.tipo = environment.EstadoActivo
      }

      EliminarPerfil(perfiles: Perfiles) {
        this.deletePerfilDialog = true;
        this.perfiles = { ...perfiles };
        this.mensaje = environment.MensajeEliminado
        this.tipo = environment.EstadoEliminado
      }
      AddPerfilExamen(perfiles: Perfiles) {
        this.perfilExamenDialog = true;
        this.perfiles = { ...perfiles };
        this.mensaje = environment.MensajeEliminado
        this.tipo = environment.EstadoEliminado
        this.ObtenerExamenes();
      }

      confirmar(id: string, tipo: string){
        this.deletePerfilDialog = false;

        this._spinnerService.show();

        if(tipo==environment.EstadoEliminado){
          this._perfilesService.Eliminar(id).subscribe(data=>{
            this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
            if(data.typeResponse==environment.EXITO){
              this.ListarPerfiles();
            }

            this._spinnerService.hide();
          })
         }

      }

      GuardarPerfil(){
        let model = new Perfiles();
        model.idPerfil = this.id
        model.nombre= this.form.value['nombre'];

        this._spinnerService.show();

        this._perfilesService.Guardar(model.idPerfil, model).subscribe(data=>{
          this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
            if(data.typeResponse==environment.EXITO){
              this.cerrar();
              this.ListarPerfiles();
            }
            this._spinnerService.hide();
          })
      }

      cerrar(){
        this.perfilDialog = false;
        this.perfilExamenDialog =false;
      }

    SeleccionarExamen(examen: Examen){
    const existExamInPerfil: string[] = this.perfiles.perfilExamenes
        ? this.perfiles.perfilExamenes
      .filter(x => x.idExamen === examen.idExamen)
      .map(x => x.idExamen)
      .filter((id): id is string => id !== undefined)
      : [];
    if(existExamInPerfil?.length!=0){
        const filteredExamenes = this.perfiles.perfilExamenes?.filter(
            x => x.idExamen !== undefined && !existExamInPerfil.includes(x.idExamen)
          ) || [];
          this.perfiles.perfilExamenes=filteredExamenes;

        const searchExamen=this.examenes.find(x=>x.idExamen==examen.idExamen)
        if(searchExamen){
            searchExamen.estadoPerfil=false;
        }

    }else{
        this.newPerfilExamen ={
            idPerfil:this.perfiles?.idPerfil,
            idExamen:examen.idExamen,
            nombreExamen:examen.nombre,
            abreviaturaExamen:examen.abreviatura,
        }
        this.perfiles.perfilExamenes?.push(this.newPerfilExamen);
        examen.estadoPerfil=true;
        }
    }
    ObtenerExamenes(){
        this._spinnerService.show();
        this._examenService.GetExamenByIdArea(this.area,this.BuscarExamenesText).subscribe(data=>{
            this.examenes=data;
            this.DeshabilitarExamenesPerfilExistentes();
        });
        this._spinnerService.hide();

    }

    DeshabilitarExamenesPerfilExistentes(){
        const existExamInPerfil: string[] = this.perfiles.perfilExamenes
        ? this.perfiles.perfilExamenes
      .map(x => x.idExamen)
      .filter((id): id is string => id !== undefined)
      : [];

      this.examenes = this.examenes.map(x => {
        if (x.idExamen !== undefined && existExamInPerfil.includes(x.idExamen)) {
          return { ...x, estadoPerfil: true };
        }
        return x;
      });

    }
    GuardarPerfilesExamen(){
        this._spinnerService.show();
        this._perfilesExamenService.GuardarPerfilesExamen(this.perfiles.perfilExamenes).subscribe(data=>{
            this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
            if(data.typeResponse==environment.EXITO){
              this.cerrar();
              this.ListarPerfiles();
            }
            this._spinnerService.hide();
        })
    }

}
