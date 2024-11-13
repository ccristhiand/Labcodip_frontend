import { Options } from "./utils/options.model";
import { Silac } from "./utils/silac.model";

export class EquipoMedico extends Silac {
    idEquipoMedico?: string;
    nombre?: string;
    detalle?: string;

    listaOpciones?: Options[];
    listaEquipoMedicoAnalizador? : EquipoMedicoAnalizador[];
}

export class EquipoMedicoAnalizador {
    idEquipoMedicoAnalizador?: string;
    idEquipoMedico?: string;
    serialPuerto?: string;
    serialBaudrate?: number;
    serialDataBit?: number;
}

export class EquipoMedicoExamen {
    idEquipoMedicoExamen?: string;
    IdEquipoMedico?: string;
    idExamen?: string;
    nombreExamen?: string;
    nombreArea?: string;
    codRecibe?: string;
    codDevuelve?: string;
    tipoCodigo?: string;
    listaIdExamen?: string[]
}