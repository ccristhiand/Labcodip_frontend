import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackingListarComponent } from './tracking-listar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([{path:'',component:TrackingListarComponent}])],
  exports: [RouterModule]
})
export class TrackingListarRoutingModule { }
