import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MultiSelectModule } from 'primeng/multiselect';

import { ExamenRoutingModule } from './examen-routing.module';
import { ExamenComponent } from './examen.component';


@NgModule({
  declarations: [ExamenComponent],
  imports: [
    CommonModule,
    ExamenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    ToolbarModule,
    DialogModule,
    ToastModule,
    ToggleButtonModule,
    MultiSelectModule
  ]
})
export class ExamenModule { }
