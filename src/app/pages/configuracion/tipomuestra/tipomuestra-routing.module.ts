import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipomuestraComponent } from './tipomuestra.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: TipomuestraComponent }
	]),],
  exports: [RouterModule]
})
export class TipomuestraRoutingModule { }
