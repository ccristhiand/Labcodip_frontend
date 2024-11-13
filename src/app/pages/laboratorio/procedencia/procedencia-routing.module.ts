import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcedenciaComponent } from './procedencia.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ProcedenciaComponent }
	])],
  exports: [RouterModule]
})
export class ProcedenciaRoutingModule { }
