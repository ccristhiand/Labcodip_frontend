import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { QCResultado, QCResultadoCReate, Resultado } from 'src/app/models/reactivodet.mocel';
import { Options } from 'src/app/models/utils/options.model';
import { SpinnerService } from 'src/app/pages/components/spinner/spinner.service';
import { QCResultadoService } from 'src/app/services/qcresultado.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.scss',
  providers: [MessageService]
})
export class ResultadoComponent implements OnInit {
  
  datacollection: Resultado[] = [];

  loading: boolean = true;

  listaTipo!: Options[];
  tipo!: any;

  listaEstado!: Options[];
  estado!: any;

  listaLaboratorio!: Options[];
  laboratorio!: any;

  listaArea!: Options[];
  area!: any;

  listaControl!: Options[];
  control!: any;

  listaExamen!: Options[];
  examen!: any;

  listaLote!: Options[];
  lote!: any;

  listaNivel!: Options[];
  nivel!: any;

  fechaDesde!: any;
  fechaHasta!: any;

  lineDataSilac: any;
  lineOptionsSilac: any;
  lineDataEquipo: any;
  lineOptionsEquipo: any;

  timelineEventsSilac: any[] = [];
  timelineEventsEquipo: any[] = [];

  resultado: string = "";
  input: any;

  comment: string = '';
  selectedPointIndex: number | null = null;
  comments: string[] = [];

  constructor(
    private _qcresultadoService:QCResultadoService,
    private _spinnerService: SpinnerService,
    private _messageService: MessageService
  ) { }

  ngOnInit() {
    this.opciones();
  }

  opciones(){
    this._spinnerService.show();
    this._qcresultadoService.listarArea().subscribe(data=>{

      this.listaLaboratorio = data.listaOpciones.filter(x=>x.tipo==environment.Laboratorio); 
      this.listaArea = data.listaOpciones.filter(x=>x.tipo==environment.Area); 

      this.laboratorio = this.listaLaboratorio[0];
      this.area = this.listaArea[0];

      let date  = new Date();
      this.fechaDesde = new Date(date.getFullYear(), date.getMonth(), 1)
      this.fechaHasta = new Date();

      this.fechaDesde.setHours(12, 0, 0, 0);
      this.fechaHasta.setHours(12, 0, 0, 0);
      
      if(this.area!=null){
        this.filtrarontrol()
      }else{
        this.limpiarFiltro();
        this._spinnerService.hide();
      }
    });
  }

  filtrarontrol(){  
    let id = (this.area==null)? "" : this.area.id 
    this._qcresultadoService.listarControl(id).subscribe(data=>{

      this.listaControl = data.listaOpciones; 
      this.control = this.listaControl[0];

      if(this.control!=null){
        this.filtrarExamen();
      }else{
        this.limpiarFiltro();
        this._spinnerService.hide();
      }
    });
  }

  filtrarExamen(){ 
    let id = (this.control==null)? "" : this.control.id 
    this._qcresultadoService.listarExamen(id).subscribe(data=>{

      this.listaExamen = data.listaOpciones.filter(x=>x.tipo==environment.Examen); 
      this.listaLote = data.listaOpciones.filter(x=>x.tipo==environment.Lote); 
      this.listaNivel = data.listaOpciones.filter(x=>x.tipo==environment.Nivel); 

      this.examen = this.listaExamen[0];
      this.lote = this.listaLote[0];
      this.nivel = this.listaNivel[0];

      this.listarResultados();

      this._spinnerService.hide();
    });
  }

  guardar(){
    let model = new QCResultadoCReate();

    model.idReactivoDet= (this.control==null)? "" : this.control.id;
    model.idExamen= (this.examen==null)? "" : this.examen.id 
    model.idLote= (this.lote==null)? "" : this.lote.id 
    model.idNivel= (this.nivel==null)? "" : this.nivel.id 
    model.resultado=  this.resultado;   

    this._spinnerService.show();
    this._qcresultadoService.Guardar(model).subscribe(data=>{
       this._messageService.add({key: data.key, severity: data.typeResponse, summary: data.summary, detail: data.message});
        if(data.typeResponse==environment.EXITO){
          const myInput = document.getElementById("inputtext2") as HTMLInputElement;
          myInput.focus();
          this.resultado = "";
          this.listarResultados();
        }
        this._spinnerService.hide();
      }) 
  }
  
  listarResultados(){
    let idreactivodet = (this.control==null)? "" : this.control.id;
    let idexamen = (this.examen==null)? "" : this.examen.id 
    let idlote = (this.lote==null)? "" : this.lote.id 
    let idnivel = (this.nivel==null)? "" : this.nivel.id 

    var dateini=this.fechaDesde.toISOString().slice(0, 10)
    var dateFin=this.fechaHasta.toISOString().slice(0, 10)

    this._qcresultadoService.listarResultado(idreactivodet,idexamen,idlote,idnivel,dateini,dateFin).subscribe(data=>{
      this.datacollection = data.listaData;
      this.timelineEventsSilac = data.listaConfigRangoSilac!;
      this.timelineEventsEquipo = data.listaConfigRangoEquipo!;
      this.initChartsSilac(data);
      this.initChartsEquipo(data);
    });
  }


  limpiarFiltro(){
    this.listaControl! = []; 
    this.control! = [];

    this.listaExamen! = []; 
    this.examen! = [];

    this.listaLote! = []; 
    this.lote! = [];

    this.listaNivel! = []; 
    this.nivel! = [];

    this.datacollection = [];
    this.timelineEventsSilac = [];
    this.timelineEventsEquipo = [];
  }

  addComment() {
    if (this.selectedPointIndex !== null) {
      this.comments[this.selectedPointIndex] = this.comment;
      this.comment = '';
    }
  }

  initChartsSilac(data: QCResultado) {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Agregar datos para la línea horizontal
    const desviacion3 = Array(data.listaResultadoSilac.length).fill(parseFloat(data.rangoMedioSilac) + 3 * parseFloat(data.desviacionSilac));
    const desviacion2 = Array(data.listaResultadoSilac.length).fill(parseFloat(data.rangoMedioSilac) + 2 * parseFloat(data.desviacionSilac));
    const desviacion1 = Array(data.listaResultadoSilac.length).fill(parseFloat(data.rangoMedioSilac) + parseFloat(data.desviacionSilac));

    const media = Array(data.listaResultadoSilac.length).fill(data.rangoMedioSilac);

    const desviacionN1 = Array(data.listaResultadoSilac.length).fill(parseFloat(data.rangoMedioSilac) - parseFloat(data.desviacionSilac));
    const desviacionN2 = Array(data.listaResultadoSilac.length).fill(parseFloat(data.rangoMedioSilac) - 2 * parseFloat(data.desviacionSilac));
    const desviacionN3 = Array(data.listaResultadoSilac.length).fill(parseFloat(data.rangoMedioSilac) - 3 * parseFloat(data.desviacionSilac));


    this.lineDataSilac = {
        labels: data.listaDia,
        datasets: [
            {
                label: 'Resultados',
                data: data.listaResultadoSilac,
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                borderColor: documentStyle.getPropertyValue('--primary-500'),
                tension: 0.4,
                pointRadius: 7,
            },
            {
                label: '3 D.E',
                data: desviacion3,
                fill: '+1',
                backgroundColor: 'rgba(255, 99, 132, 0.2)', 
                borderColor: 'red',
                tension: 0          
            },
            {
              label: '2 D.E',
              data: desviacion2,
              fill: '+1',
              backgroundColor: 'rgb(255 255 0 / 10%)', 
              borderColor: 'yellow',
              tension: 0
            },
            {
              label: '1 D.E',
              data: desviacion1,
              fill: '+1',
              backgroundColor: 'rgb(0 255 0 / 11%)',
              borderColor: 'green',
              tension: 0
            },
            {
              label: 'Media',
              data: media,
              fill: '+1',
              backgroundColor: 'rgb(0 255 0 / 11%)',
              borderColor: 'green',
              tension: 0
            },
            {
              label: '-1 D.E',
              data: desviacionN1,
              fill: '+1',
              backgroundColor: 'rgb(255 255 0 / 10%)', 
              borderColor: 'green',
              tension: 0
            },
            {
              label: '-2 D.E',
              data: desviacionN2,
              fill: '+1',
              backgroundColor: 'rgba(255, 99, 132, 0.2)', 
              borderColor: 'yellow',
              tension: 0
            },
            {
              label: '-3 D.E',
              data: desviacionN3,
              fill: '+1',
              backgroundColor: 'rgba(255, 99, 132, 0.2)', 
              borderColor: 'red',
              tension: 0   
            }
      ],
    };

    this.lineOptionsSilac = {
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

 initChartsEquipo(data: QCResultado) {

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  // Agregar datos para la línea horizontal
  const desviacion3 = Array(data.listaResultadoEquipo.length).fill(parseFloat(data.rangoMedioEquipo) + 3 * parseFloat(data.desviacionEquipo));
  const desviacion2 = Array(data.listaResultadoEquipo.length).fill(parseFloat(data.rangoMedioEquipo) + 2 * parseFloat(data.desviacionEquipo));
  const desviacion1 = Array(data.listaResultadoEquipo.length).fill(parseFloat(data.rangoMedioEquipo) + parseFloat(data.desviacionEquipo));

  const media = Array(data.listaResultadoEquipo.length).fill(data.rangoMedioEquipo);

  const desviacionN1 = Array(data.listaResultadoEquipo.length).fill(parseFloat(data.rangoMedioEquipo) - parseFloat(data.desviacionEquipo));
  const desviacionN2 = Array(data.listaResultadoEquipo.length).fill(parseFloat(data.rangoMedioEquipo) - 2 * parseFloat(data.desviacionEquipo));
  const desviacionN3 = Array(data.listaResultadoEquipo.length).fill(parseFloat(data.rangoMedioEquipo) - 3 * parseFloat(data.desviacionEquipo));


  this.lineDataEquipo = {
      labels: data.listaDia,
      datasets: [
          {
              label: 'Resultados',
              data: data.listaResultadoEquipo,
              fill: false,
              backgroundColor: documentStyle.getPropertyValue('--primary-500'),
              borderColor: documentStyle.getPropertyValue('--primary-500'),
              tension: 0.4,
              pointRadius: 7,
          },
          {
              label: '3 D.E',
              data: desviacion3,
              fill: '+1',
              backgroundColor: 'rgba(255, 99, 132, 0.2)', 
              borderColor: 'red',
              tension: 0          
          },
          {
            label: '2 D.E',
            data: desviacion2,
            fill: '+1',
            backgroundColor: 'rgb(255 255 0 / 10%)', 
            borderColor: 'yellow',
            tension: 0
          },
          {
            label: '1 D.E',
            data: desviacion1,
            fill: '+1',
            backgroundColor: 'rgb(0 255 0 / 11%)',
            borderColor: 'green',
            tension: 0
          },
          {
            label: 'Media',
            data: media,
            fill: '+1',
            backgroundColor: 'rgb(0 255 0 / 11%)',
            borderColor: 'green',
            tension: 0
          },
          {
            label: '-1 D.E',
            data: desviacionN1,
            fill: '+1',
            backgroundColor: 'rgb(255 255 0 / 10%)', 
            borderColor: 'green',
            tension: 0
          },
          {
            label: '-2 D.E',
            data: desviacionN2,
            fill: '+1',
            backgroundColor: 'rgba(255, 99, 132, 0.2)', 
            borderColor: 'yellow',
            tension: 0
          },
          {
            label: '-3 D.E',
            data: desviacionN3,
            fill: '+1',
            backgroundColor: 'rgba(255, 99, 132, 0.2)', 
            borderColor: 'red',
            tension: 0   
          }
    ],
  };

  this.lineOptionsEquipo = {
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

}
