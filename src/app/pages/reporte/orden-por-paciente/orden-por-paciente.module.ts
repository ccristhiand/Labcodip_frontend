import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from "primeng/calendar";
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';

import { OrdenPorPacienteRoutingModule } from './orden-por-paciente-routing.module';
import { OrdenPorPacienteComponent } from './orden-por-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrdenPorPacienteComponent],
  imports: [
    CommonModule,
    OrdenPorPacienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ToolbarModule,
    ToastModule,
    TabViewModule,
  ]
})
export class OrdenPorPacienteModule { }
