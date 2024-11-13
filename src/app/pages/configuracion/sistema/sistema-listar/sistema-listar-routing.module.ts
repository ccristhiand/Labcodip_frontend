import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SistemaListarComponent } from './sistema-listar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: SistemaListarComponent }
	])],
  exports: [RouterModule]
})
export class SistemaListarRoutingModule { }
