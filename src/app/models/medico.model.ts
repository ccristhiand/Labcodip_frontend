import { Options } from "./utils/options.model";
import { Silac } from "./utils/silac.model";

export class Medico extends Silac {
    idMedico?: string;
    idTipoDocu?: string;
    nroDocumento?: string;
    apePaterno?: string;
    apeMaterno?: string;
    nombre?: string;
    nombreCompleto?: string;
    idSexo?: string;
    fechaNacimiento?: Date;
    edad?: number;

    listaOpciones?: Options[];
}