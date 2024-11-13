import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioListarComponent } from './usuario-listar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: UsuarioListarComponent }
	])],
  exports: [RouterModule]
})
export class UsuarioListarRoutingModule { }
