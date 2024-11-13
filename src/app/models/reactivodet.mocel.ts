import { Options } from "./utils/options.model";
import { Silac } from "./utils/silac.model";

export class ReactivoDet extends Silac {
    idReactivoDet?: string;
    idReactivo?: string;
    idModo?: string;
    idExamen?: string;
    nombre?: string;
    listaReactivoExamen: ReactivoExamen[] = [];
}

export class ReactivoExamen extends Silac {
    idReactivoDet?: string;
    idReactivoExamen?: string;
    idExamen?: string;
    nombre?: string;
}

export class QCRango {
    idLote?: string;
    idNivel?: string;
    nombreControl?: string;
    nombreExamen?: string;
    fechaExpiracion?: string;
    listaOpciones!: Options[];
    listaQCRangoDet: QCRangoDet[] = [];
}

export class QCRangoDet{
    idReactivoDet?: string;
    idQCRango?: string;
    idExamen?: string;
    idLote?: string;
    idNivel?: string;
    rangoMinimo?: string;
    rangoMedio?: string;
    rangoMaximo?: string;
    desviacion?: string;
    nombreControl?: string;
    nombreExamen?: string;
    fechaExpiracion?: string;
    listaOpciones!: Options[];
}

export class QCResultado{    
    rangoMedioSilac!: string;
    desviacionSilac!: string;
    rangoMedioEquipo!: string;
    desviacionEquipo!: string;
    listaOpciones!: Options[];
    listaConfigRangoSilac!: ConfigRango[];
    listaConfigRangoEquipo!: ConfigRango[];
    listaData: Resultado[] = [];
    listaResultadoSilac: string[] = [];
    listaResultadoEquipo: string[] = [];
    listaDia: string[] = [];
}

export class Resultado{
    resultado?: string;
    fechaResultado?: string;
    strFechaResultado?: string
    horaResultado?: string;
}

export class QCResultadoCReate{
    idReactivoDet?: string
    idExamen?: string;
    idLote?: string;
    idNivel?: string;
    resultado?: string;
}

export class ConfigRango{
    Transaction?: string;
    Amount?: number;
    Icon?: string;
    IconColor?: string;
    AmountColor?: string;
}
