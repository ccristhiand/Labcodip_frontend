export class RequestReporte {
    valor?: string;
    fechaInicio?: string;
    fechaFin?: string;
    data?: string[];
    tipoMuestra: string[] = [];
}

export class ResponseReporte {
    data?: string;
    name?: string;
}