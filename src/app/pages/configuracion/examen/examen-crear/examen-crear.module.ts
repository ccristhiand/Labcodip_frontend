import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TreeModule } from 'primeng/tree';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ColorPickerModule } from 'primeng/colorpicker';

import { ExamenCrearRoutingModule } from './examen-crear-routing.module';
import { ExamenCrearComponent } from './examen-crear.component';

@NgModule({
  declarations: [ExamenCrearComponent],
  imports: [
    CommonModule,
    ExamenCrearRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    TabViewModule,
    ToolbarModule,
    ToggleButtonModule,
    TreeModule,
    TableModule,
    ToastModule,
    ColorPickerModule,
  ]
})
export class ExamenCrearModule { }
