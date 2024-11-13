import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoListarComponent } from './medico-listar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: MedicoListarComponent }
	])],
  exports: [RouterModule]
})
export class MedicoListarRoutingModule { }
