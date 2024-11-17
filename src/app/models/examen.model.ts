import { Options } from "./utils/options.model";
import { SilacConfig } from "./utils/silacConfig.model";

export class Examen extends SilacConfig {
    idExamen?: string;
    idTipoMuestra?: string;
    idArea?: string;
    codigo?: number;
    calculado?: string;
    abreviatura?: string;
    nombre?: string;
    unidadMedida?: string;
    cantidadDecimal?: string;
    rangoMostrar?: string;
    nombreArea?:string;
    nombreTipoMuestra?: string;
    tipoCongRango?: string;
    tiempoTrackingMin?:number;
    orden?:number;
    estadoPerfil?:boolean;
    idPerfil?:string;

    listaOpciones?: Options[];
    listaExamenRango?: ExamenRango[];
    listaExamenRango1?: ExamenRango[];
    listaExamenRango2?: ExamenRango[];
    listaExamenRango3?: ExamenRango[];
    listaExamenRango4?: ExamenRango[];

}

export class ExamenRango extends SilacConfig  {
    idExamen?: string;
    idExamenRango?: string;
    idSexo?: string;
    idInterpretado?: string;
    sexo?: string;
    interpretado?: string;
    edadInicio?: number;
    edadFinal?: number;
    valorMinimo?: string;
    valorMaximo?: string;
    sigComparativo?: string;
}
