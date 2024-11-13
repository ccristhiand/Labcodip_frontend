import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { SpinnerService } from '../../components/spinner/spinner.service';


@Component({
	templateUrl: './login.component.html',
	providers: [MessageService]
})
export class LoginComponent implements OnInit{

	form!: FormGroup;
	rememberMe: boolean = false;
	input: any;
    showPassword: boolean = false;
	constructor(
		private _fb: FormBuilder,
		private _router: Router,
		private _usuarioService:UsuarioService,
		public _layoutService: LayoutService,
		private _messageService: MessageService,
		private _spinnerService: SpinnerService
		) {}

	ngOnInit() {
		this.inicializar();
	}

	get dark(): boolean {
		return this._layoutService.config().colorScheme !== 'light';
	}

	inicializar(){
		this.form = this._fb.group({
			userName: ['', [Validators.required, Validators.maxLength(20)]],
			password: ['', [Validators.required, Validators.maxLength(20)]]
		});
	  }

	login(){
		let model = new Usuario();
	
		model.userName = this.form.value['userName'];
		model.password= this.form.value['password'];
		model.domain= window.location.href;
 
		if(model.userName==null || model.password==""){
		  if(model.userName==null || model.userName==""){
			this._messageService.add({key: 'tst', severity: 'error', summary: 'ERROR', detail: 'Ingresa el usuario'});
		  }
		  else if(model.password==null || model.password==""){
			this._messageService.add({key: 'tst', severity: 'error', summary: 'ERROR', detail: 'Ingresa la contraseña'});
		  }	
		}else{
			
		  this._spinnerService.show();
		  this._usuarioService.login(model.userName!, model.password!, model.domain!).subscribe(data=>{

			this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});

			if(data.typeResponse==environment.EXITO){
			  localStorage.setItem(environment.Access_Token, data.access_token!);
			  this._router.navigate(['/laboratorio/orden']);
			}
			this._spinnerService.hide();
			if(data.typeResponse!=environment.EXITO){
			  this.input.focus();
			  this.input.select();
			}
		  }); 
	
		}
	  }
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      }
}
