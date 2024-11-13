import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrigenComponent } from './origen.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: OrigenComponent }
	])],
  exports: [RouterModule]
})
export class OrigenRoutingModule { }
