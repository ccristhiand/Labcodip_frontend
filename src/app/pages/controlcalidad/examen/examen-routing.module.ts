import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamenComponent } from './examen.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ExamenComponent }
	])],
  exports: [RouterModule]
})
export class ExamenRoutingModule { }
