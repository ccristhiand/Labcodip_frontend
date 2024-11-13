import { Options } from "./utils/options.model";
import { Silac } from "./utils/silac.model";

export class Reactivo extends Silac {
    idReactivo?: string;
    idEquipoMedico?: string;
    idModo?: string;
    nombre?: string;
    nombreEquipo?: string;
    nombreLaboratorio?: string;
    nombreArea?: string;

    listaOpciones?: Options[];
}
