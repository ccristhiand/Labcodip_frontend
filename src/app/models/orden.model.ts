import { Options } from "./utils/options.model";

export class Orden {
    idOrdenExamen?: string;
    idOrden?: string;
    idTipoDocu?: string;
    nroDocumento?: string;
    apePaterno?: string;
    apeMaterno?: string;
    nombre?: string;
    idSexo?: string;
    fechaNacimiento?: Date;
    edad?: number;
    historiaClinica?: string;
    nombreCompleto?: string;

    idLaboratorio?: string;
    idArea?: string;
    nroOrden?: string;
    nroAtencion?: string;
    fechaOrden?: Date;
    idProcedencia?: string;
    idServicio?: string;
    idMedico?: string;
    idOrigen?: string;
    cama?: string;
    observacion?: string;
    estado?: string;
    strFechaOrden?: string;
    strFechaResultado?: string;
    examen?: string;
    resultado?: string;
    unidadMedida?: string;
    
    listaOpciones!: Options[];
    listaOrdenExamenQuery!: OrdenExamen[];
    listaIdOrdenExamenQuery!: string[];
}

export class OrdenReq {
    valor?: string;
    tipoOrden?: string;
    estado?: string;
    idlab?: string;
    idarea?: string;
    usuario?: string;
    desde?: Date;
    hasta?: Date;
    page?: Number;
    pages?: Number;
}

export class OrdenExamen {
    idOrdenExamen?: string;
    idOrden?: string;
    idExamen?: string;
    idLaboratorio?: string;
    idArea?: string;
    abreviatura?: string;
    nombreExamen?: string;
    resultado?: string;
    unidadMedida?: string;
    observacion?: string;
    referencia?: string;
    color?: string;
    strFechaResultado?: string;
    simboloResulatdo?: string;
    validado?: boolean;
    idperfil?:string;
    nombrePerfil?:string;
}

export class OrdenValidate {
    observacion?: string;
    idArea?: string;
    listaOrdenExamenQuery: OrdenExamen[] = []
}