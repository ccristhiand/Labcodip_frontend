import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaboratorioComponent } from './laboratorio.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: LaboratorioComponent }
	])],
  exports: [RouterModule]
})
export class LaboratorioRoutingModule { }
