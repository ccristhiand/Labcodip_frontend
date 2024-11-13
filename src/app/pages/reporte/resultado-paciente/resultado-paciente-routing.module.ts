import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadoPacienteComponent } from './resultado-paciente.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ResultadoPacienteComponent }
	])],
  exports: [RouterModule]
})
export class ResultadoPacienteRoutingModule { }
