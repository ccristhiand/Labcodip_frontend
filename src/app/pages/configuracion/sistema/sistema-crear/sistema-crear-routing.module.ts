import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SistemaCrearComponent } from './sistema-crear.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: SistemaCrearComponent }
	]),],
  exports: [RouterModule]
})
export class SistemaCrearRoutingModule { }
