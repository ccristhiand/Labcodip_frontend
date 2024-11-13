import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipoListarComponent } from './equipo-listar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: EquipoListarComponent }
	])],
  exports: [RouterModule]
})
export class EquipoListarRoutingModule { }
