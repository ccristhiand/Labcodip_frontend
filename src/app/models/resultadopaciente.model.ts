export class ResultadoPacienteQuery {
    listaResultadoPaciente!: ResultadoPaciente[];
    listaFecha!: string[];
    listaGraficoPaciente!: GraficoPaciente[];
}

export class ResultadoPaciente {
    idPersona?: string;
    nombreCompleto?: string;
    nroDocumento?: string;
    abreviatura?:string;
    resultado?:string;
    strFechaResultado?:string;
    strFechaResultadoHora?:string;    
}

export class GraficoPaciente {
    label!: string;
    data!: string;
    backgroundColor!: string;
    borderColor!: string;
    tension!: string;
    pointRadius!: string;
}