import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenCrearComponent } from './orden-crear.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: OrdenCrearComponent }
	]),],
  exports: [RouterModule]
})
export class OrdenCrearRoutingModule { }
