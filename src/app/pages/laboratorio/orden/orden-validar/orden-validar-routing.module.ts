import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenValidarComponent } from './orden-validar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: OrdenValidarComponent }
	]),],
  exports: [RouterModule]
})
export class OrdenValidarRoutingModule { }
