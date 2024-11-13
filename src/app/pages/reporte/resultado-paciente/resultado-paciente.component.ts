import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GraficoPaciente, ResultadoPaciente } from 'src/app/models/resultadopaciente.model';
import { Datacollection } from 'src/app/models/utils/datacollection.model';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';
import { ReporteService } from 'src/app/services/reporte.service';


@Component({
  selector: 'app-resultado-paciente',
  templateUrl: './resultado-paciente.component.html',
  styleUrl: './resultado-paciente.component.scss',
  providers: [MessageService]
})
export class ResultadoPacienteComponent  implements OnInit {
  
  
  datacollection: Datacollection[] = [];
  datacollectionresultado: ResultadoPaciente[] = [];
  valor: string = "";
  loading: boolean = true;
  datosPersonal: string = "";

  lineData: any;
  lineOptions: any;
  radarOptions: any;
  config: any;
  doubleArbitraryLine: any;

  timelineEvents: any[] = [];


  constructor(
    private _reporteService:ReporteService,
    private _spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.buscarPaciente();
  }

  buscarPaciente(){
    this.limpiar();
    this._reporteService.BuscarPaciente(this.valor).then(data => {
      this.datacollection = data;
      this.loading = false;
      if(data.length > 0){
        let paciente = data as ResultadoPaciente[];
        let primerPaciente = paciente[0];
        this.buscarResultadoPaciente(primerPaciente.idPersona!, primerPaciente.nombreCompleto!);
      }
    });
  }

  buscarResultadoPaciente(id: string, dato: string){
    this.limpiar();
    this._reporteService.BuscarResultadoPaciente(id).then(data => {
      this.datacollectionresultado = data.listaResultadoPaciente;
      this.loading = false;

      this.datosPersonal = dato!;

      this.initCharts(data.listaFecha, data.listaGraficoPaciente);
    });
  }


  initCharts(fecha: string[], data: GraficoPaciente[]) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineData = {
        labels: fecha,
        datasets: data,
    };

    this.lineOptions = {
     
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              },
          },
          
      },
      plugins: {
        legend: {
            position: 'top',
            align: 'end',
            labels: {
                color: textColor,
            },
        },
      },
      responsive: true,
      hover: {
          mode: 'index',
      },
  };

  }

  limpiar(){
    this.datacollectionresultado = [];
  }

}
