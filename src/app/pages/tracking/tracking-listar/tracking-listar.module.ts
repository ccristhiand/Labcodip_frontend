import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackingListarRoutingModule } from './tracking-listar-routing.module';
import { TrackingListarComponent } from './tracking-listar.component';
import { SidebarModule } from 'primeng/sidebar';


@NgModule({
  declarations: [TrackingListarComponent],
  imports: [
    CommonModule,
    TrackingListarRoutingModule,
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
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
  ]
})
export class TrackingListarModule { }
