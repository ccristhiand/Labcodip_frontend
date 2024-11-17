import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { Options} from 'src/app/models/utils/options.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';

interface Image {
  name: string;
  objectURL: string;
}

@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.scss'],
  providers: [MessageService]
})
export class UsuarioCrearComponent implements OnInit {
  uploadedFiles: any[] = [];
  form!: FormGroup;
  edit: boolean = true;
  essi = false;
  escritura = true;
  id: string =  "";

  listaTipodocumento!: Options[];
  tipoDocu: any;
  listaSexo!: Options[];
  sexo: any;

  
  listaRoles: TreeNode[] = [];
  selectedRol: TreeNode<any> | TreeNode<any>[] | any[] | any;

  listaAreas: TreeNode[] = [];
  selectedAreas: TreeNode<any> | TreeNode<any>[] | any[] | any;

  constructor(
    private _fb: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _usuarioService:UsuarioService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService) {
  }
  
  ngOnInit() {
    this._activeRoute.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? "":data["id"];
      this.edit = (data["edit"]==undefined) ? true : ((data["edit"]=='true') ? true : false)      
    });

    this.inicializar();
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
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      essi: [''],
      escritura: ['']
    });

    this.obtener();
  }

  obtener(){
        this._spinnerService.show();
        this._usuarioService.Obtener(this.id).subscribe(data=>{
        this.listaSexo = data.listaOpciones!.filter(x=>x.tipo==environment.Sexo);
        this.listaTipodocumento = data.listaOpciones!.filter(x=>x.tipo==environment.TipoDocumento);  

        this.listaRoles = data.listaRoles as TreeNode[];
        this.listaAreas = data.listaLaboratorios as TreeNode[];
       
        if(this.id!=""){
          this.form.patchValue({
            idTipoDocu: data.idTipoDocu,
            nroDocumento: data.nroDocumento,
            apePaterno: data.apePaterno,
            apeMaterno: data.apeMaterno,
            nombre: data.nombre,
            idSexo: data.idSexo,
            fechaNacimiento: new Date(data.fechaNacimiento!),
            edad: data.edad,  
            userName: data.userName,
            password: data.password
          }); 
          
          this.selectedRol = this.listaRoles.filter(y=>y.key==data.listaUsuarioRol[0]);
          this.selectedAreas =   data.laboratorioSelect as TreeNode[];
          this.escritura = (data.permiso_Escritura==null)? false : data.permiso_Escritura;

        }else{
          this.form.patchValue({
            idTipoDocu: null,
            nroDocumento: null,
            apePaterno: null,
            apeMaterno: null,
            nombre: null,
            idSexo: null,
            fechaNacimiento: new Date(),
            edad: null,
            userName: null,
            password: null
          });  
          this.escritura = true
        }

        this.tipoDocu = (data.idTipoDocu==null)? this.listaTipodocumento[0] : this.listaTipodocumento.filter(y=>y.id==data.idTipoDocu)[0];
        this.sexo = (data.idSexo==null)? this.listaSexo[0] : this.listaSexo.filter(y=>y.id==data.idSexo)[0];
        this.essi = (data.codExterno==null || data.codExterno=="")? false : true;

        this._spinnerService.hide();
      });
  }

  guardar(){
    let selectLabo: boolean= false;
    let selectArea: boolean= false;

    let model = new Usuario();

    model.idTipoDocu= this.tipoDocu.id;
    model.nroDocumento= this.form.value['nroDocumento'];
    model.apePaterno= this.form.value['apePaterno'];
    model.apeMaterno= this.form.value['apeMaterno'];
    model.nombre= this.form.value['nombre'];
    model.idSexo=  this.sexo.id;
    model.fechaNacimiento= this.form.value['fechaNacimiento'];    
    model.userName= this.form.value['userName'];
    model.password= this.form.value['password'];
    model.codExterno= this.form.value['essi']? this.form.value['nroDocumento']:null;
    model.permiso_Escritura= this.form.value['escritura'];

    if(this.selectedRol!=undefined){
      for (var valor of this.selectedRol) {
        model.listaUsuarioRol.push(valor.key);
        selectLabo = true;
        break;
      }
    }
    if(this.selectedAreas!=undefined){
      for (var area of this.selectedAreas) {
          model.listaUsuarioArea.push(area.key);
          selectArea = true;
      }
    }

    if(selectLabo && selectArea){
      this._spinnerService.show();
      this._usuarioService.Guardar(this.id, model).subscribe(data=>{
        this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
          if(data.typeResponse==environment.EXITO){
            this._router.navigate(['/seguridad/usuario']);
          }
        }) 
        this._spinnerService.hide();
    }else{
      this._messageService.add({key: "tst", severity: "warn", summary: "ADVERTENCIA", detail: "Seleccione el PERFIL y el AREA"});
    }
  }

  nuevo(){
    this.inicializar();
  }
  onUpload(event: any) {
    const files: File[] = event.files;

  files.forEach((file) => {
      const reader = new FileReader();
      this.uploadedFiles.push(file);
      reader.onload = () => {
          const byteArray = this.convertToByteArray(reader.result as string);
      };
  });
}

onImageMouseOver(file: Image) {
}

onImageMouseLeave(file: Image) {
}

removeImage(event: Event, file: any) {
  event.stopPropagation();
  this.uploadedFiles = this.uploadedFiles.filter(i => i !== file);
}
private convertToByteArray(base64String: string): Uint8Array {
  const binaryString = window.atob(base64String.split(',')[1]);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}
}
