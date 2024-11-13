import { Options } from "./utils/options.model";
import { SilacConfig } from "./utils/silacConfig.model";


export class Area extends SilacConfig {
    idArea?: string;
    nombre?: string;
    descripcion?: string;
    idLaboratorio?: string;

    listaOpciones?: Options[];
}