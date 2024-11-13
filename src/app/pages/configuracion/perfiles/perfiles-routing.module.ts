import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfilesComponent } from './perfiles.component';




@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([
    { path: '', component: PerfilesComponent }
])],

  exports: [RouterModule]
})
export class PerfilesRoutingModule { }
