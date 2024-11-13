import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamenCrearComponent } from './examen-crear.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ExamenCrearComponent }
	]),],
  exports: [RouterModule]
})
export class ExamenCrearRoutingModule { }
