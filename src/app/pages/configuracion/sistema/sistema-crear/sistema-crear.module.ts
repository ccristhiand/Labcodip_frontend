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
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';

import { SistemaCrearRoutingModule } from './sistema-crear-routing.module';
import { SistemaCrearComponent } from './sistema-crear.component';


@NgModule({
  declarations: [SistemaCrearComponent],
  imports: [
    CommonModule,
    SistemaCrearRoutingModule,
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
    TabViewModule,
    CheckboxModule,
    ToastModule,
  ]
})
export class SistemaCrearModule { }
