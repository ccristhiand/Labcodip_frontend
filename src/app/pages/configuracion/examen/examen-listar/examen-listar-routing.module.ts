import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamenListarComponent } from './examen-listar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ExamenListarComponent }
	])],
  exports: [RouterModule]
})
export class ExamenListarRoutingModule { }
