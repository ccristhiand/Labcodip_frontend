import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenListarComponent } from './orden-listar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: OrdenListarComponent }
	])],
  exports: [RouterModule]
})
export class OrdenListarRoutingModule { }
