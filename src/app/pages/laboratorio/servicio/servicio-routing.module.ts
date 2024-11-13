import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioComponent } from './servicio.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ServicioComponent }
	])],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
