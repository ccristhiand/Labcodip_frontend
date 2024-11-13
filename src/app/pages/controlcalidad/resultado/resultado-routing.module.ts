import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadoComponent } from './resultado.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ResultadoComponent }
	])],
  exports: [RouterModule]
})
export class ResultadoRoutingModule { }
