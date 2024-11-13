import { Options } from "./utils/options.model";

export class Reporte {
    listaTipoMuestra!: TipoMuestra[];
    listaOpciones?: Options[];
}

export class TipoMuestra {
    key?: string;
    label?: string;
    icon?: string;
    parent?:string;
    partialSelected?:boolean=false;
}