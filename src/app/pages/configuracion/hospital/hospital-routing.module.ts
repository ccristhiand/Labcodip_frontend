import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalComponent } from './hospital.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: HospitalComponent }
	]),],
  exports: [RouterModule]
})
export class HospitalRoutingModule { }
