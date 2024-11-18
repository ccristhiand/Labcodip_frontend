import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { ReporteService } from 'src/app/services/reporte.service';
import { SpinnerService } from '../../components/spinner/spinner.service';
import {trackingService} from 'src/app/services/tracking.service';
import {tracking} from 'src/app/models/tracking.model'


@Component({
  selector: 'app-tracking-listar',
  // standalone: true,
  // imports: [],
  
  templateUrl: './tracking-listar.component.html',
  styleUrl: './tracking-listar.component.scss'
})
export class TrackingListarComponent {
  loading: boolean = true;
  FechaIni:Date=new Date();
  FechaFin:Date=new Date();
  text:string="";
  DataCollection:Datacollection[]=[];
  visibleSidebar5: boolean = false;
  ListaTrackingTemporal: any;
  fechaHoraActual:any;
  
  constructor(
    private _trackingService:trackingService,
  ){
  }
  ngOnInit(){
    this.FechaIni.setHours(12, 0, 0, 0);
    this.FechaFin.setHours(12, 0, 0, 0);
    this.ListaTrackingTemporal=setInterval(()=>{
      this.obtener();
    },10000)
  }
  
  obtener(){
    
    this.FechaIni.setDate(this.FechaIni.getDate());
    this.FechaFin.setDate(this.FechaFin.getDate());
    
    var FechaIniCorta=this.FechaIni.toISOString().slice(0, 10)
    var FechaFinCorta=this.FechaFin.toISOString().slice(0, 10)

    this.fechaHoraActual=new Date().toLocaleString()
    this.fechaHoraActual.get
    this._trackingService.Obtener(FechaIniCorta,FechaFinCorta,this.text,0,0).then(data => {
      this.DataCollection = data;
      this.loading = false;
    });
  }
  formatDateTime(date:Date) {
    if (date!=null){
      const dateObj = new Date(date);
      let formattedDateTime = dateObj.toLocaleString();
      return  formattedDateTime;
    }else{
      return "";
    }
  }
  ngOnDestroy() {
    if (this.ListaTrackingTemporal) {
      clearInterval(this.ListaTrackingTemporal);
    }
  }

}


