import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';

import { OrdenListarRoutingModule } from './orden-listar-routing.module';
import { OrdenListarComponent } from './orden-listar.component';


@NgModule({
  imports: [
    CommonModule,
    OrdenListarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    TabViewModule,
    CalendarModule,
    DialogModule,
    CheckboxModule,
    TreeModule,
    ],
    
    declarations: [OrdenListarComponent]
})
export class OrdenListarModule { }
