import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { ReporteService } from 'src/app/services/reporte.service';
import { SpinnerService } from '../../components/spinner/spinner.service';


@Component({
  selector: 'app-orden-por-paciente',
  templateUrl: './orden-por-paciente.component.html',
  styleUrl: './orden-por-paciente.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class OrdenPorPacienteComponent implements OnInit {
  
  datacollection: Datacollection[] = [];
  loading: boolean = true;

  fechaDesde!: any;
  fechaHasta!: any;
  valor: string = "";


  constructor(
    private _reporteService:ReporteService,
    private _spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.fechaDesde = new Date();
    this.fechaHasta = new Date();

    this.fechaDesde.setHours(12, 0, 0, 0);
    this.fechaHasta.setHours(12, 0, 0, 0);

    this.listar();
  }

  listar(){  
    var fechaInicio=this.fechaDesde.toISOString().slice(0, 10)
    var fechaFin=this.fechaHasta.toISOString().slice(0, 10)

    this._reporteService.listar(this.valor,fechaInicio, fechaFin).then(data => {
      this.datacollection = data;
      this.loading = false;
    });
  }

  exportar(){
    var fechaInicio=this.fechaDesde.toISOString().slice(0, 10)
    var fechaFin=this.fechaHasta.toISOString().slice(0, 10)

    this._spinnerService.show();
    this._reporteService.Exportar(this.valor,fechaInicio, fechaFin).subscribe(data => {
          // this.spinner.hideLoading();
          let byteChar = atob(data.data!);
          let byteArray = new Array(byteChar.length);
          for(let i = 0; i < byteChar.length; i++){
            byteArray[i] = byteChar.charCodeAt(i);
          }
          let uIntArray = new Uint8Array(byteArray);
          let blob = new Blob([uIntArray], {type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
          const fileURL = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = fileURL;
          a.download = data.name!;
          document.body.appendChild(a);
          a.click();
          this._spinnerService.hide();
        }
      );
  }
  
}

