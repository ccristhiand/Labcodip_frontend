import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipoCrearComponent } from './equipo-crear.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: EquipoCrearComponent }
	]),],
  exports: [RouterModule]
})
export class EquipoCrearRoutingModule { }
