import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioCrearComponent } from './usuario-crear.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: UsuarioCrearComponent }
	]),],
  exports: [RouterModule]
})
export class UsuarioCrearRoutingModule { }
