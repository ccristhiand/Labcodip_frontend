import { Options } from "./utils/options.model";
import { SilacConfig } from "./utils/silacConfig.model";

export class SistemaCliente extends SilacConfig {
    idSistemaCliente?: string;
    server?: string;
    baseDeDatos?: string;
    usuario?: string;
    contrasena?: string;
    idTipoBaseDato?: string;
    nombre?: string;

    listaOpciones?: Options[];
    listaSistemaClienteExamen? : SistemaClienteExamen[];
}

export class SistemaClienteExamen {
    idSistemaClienteExamen?: string;
    idSistemaCliente?: string;
    idExamen?: string;
    codRecibe?: string;
    codDevuelve?: string;
    nombreExamen?: string;
    nombreArea?: string;
    unidadMedida?: string;
    codigo?: string;
    tipoCodigo?: string;
    listaIdExamen?: string[]
}