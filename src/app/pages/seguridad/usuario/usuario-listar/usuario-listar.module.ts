import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';

import { UsuarioListarRoutingModule } from './usuario-listar-routing.module';
import { UsuarioListarComponent } from './usuario-listar.component';


@NgModule({
  imports: [
    CommonModule,
    UsuarioListarRoutingModule,
	FormsModule,
	TableModule,
	RatingModule,
	ButtonModule,
	SliderModule,
	InputTextModule,
	ToggleButtonModule,
	RippleModule,
	MultiSelectModule,
	DropdownModule,
	ProgressBarModule,
	ToastModule,
	ToolbarModule,
	ToastModule
  ],
  declarations: [UsuarioListarComponent]
})
export class UsuarioListarModule { }
