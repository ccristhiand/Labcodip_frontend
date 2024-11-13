import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from "primeng/calendar";
import { ChartModule } from 'primeng/chart';
import { TimelineModule } from 'primeng/timeline';

import { ResultadoRoutingModule } from './resultado-routing.module';
import { ResultadoComponent } from './resultado.component';


@NgModule({
  declarations: [ResultadoComponent],
  imports: [
    CommonModule,
    ResultadoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    ToggleButtonModule,
    DropdownModule,
    ToastModule,
    ToolbarModule,
    TabViewModule,
    CalendarModule,
    ChartModule,
    TimelineModule,
  ]
})
export class ResultadoModule { }
