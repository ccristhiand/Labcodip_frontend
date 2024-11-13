import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Hospital } from 'src/app/models/hospital.model';

import { HosptalService } from 'src/app/services/hospital.service';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../../components/spinner/spinner.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrl: './hospital.component.scss',
  providers: [MessageService]
})
export class HospitalComponent implements OnInit {

  form!: FormGroup;
  id: string =  "";
  formTitulo: string = "CREAR HOSPITAL";

  constructor(
    private _fb: FormBuilder,
    private _hosptalService:HosptalService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService) {
  }
  
  ngOnInit() {
    this.inicializar();
    this.obtener();
  }

  inicializar(){
    this.form = this._fb.group({
      codigoHospital: ['',[Validators.maxLength(5)]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      titulo: ['', [Validators.maxLength(200)]],
      subTitulo: ['', [Validators.maxLength(200)]],
      piePagina: ['', [Validators.maxLength(200)]],
      direccion: ['', [Validators.maxLength(200)]],
    });
  }

  obtener(){
    this._spinnerService.show();

    this._hosptalService.Obtener("").subscribe(data=>{
      if(data !=null){        
          this.form.patchValue({
            codigoHospital: data.codigoHospital,
            nombre: data.nombre,
            titulo: data.titulo,
            subTitulo: data.subTitulo,
            piePagina: data.piePagina,
            direccion: data.direccion
          });
          
          this.formTitulo = "EDITAR HOSPITAL";
      }else{
        this.form.patchValue({
          codigoHospital: null,
          nombre: null,
          titulo: null,
          subTitulo: null,
          piePagina: null,
          direccion: null
        });  
      };

      this._spinnerService.hide();
    })
  }

  guardar(){
    let model = new Hospital();

    model.codigoHospital= this.form.value['codigoHospital'];
    model.nombre= this.form.value['nombre'];
    model.titulo= this.form.value['titulo'];
    model.subTitulo= this.form.value['subTitulo'];  
    model.piePagina= this.form.value['piePagina'];     
    model.direccion= this.form.value['direccion'];     

    this._spinnerService.show();

    this._hosptalService.Guardar(this.id, model).subscribe(data=>{
      this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});

      this._spinnerService.hide();
      }) 
  }
}