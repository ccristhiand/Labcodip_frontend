import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenPorPacienteComponent } from './orden-por-paciente.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: OrdenPorPacienteComponent }
	])],
  exports: [RouterModule]
})
export class OrdenPorPacienteRoutingModule { }
