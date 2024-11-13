export class tracking{
    IdTracking?:number;
    CodigoOrden?:string;
    ExamenName?:string;
    DocumentoPaciente?:string;
    NombreCompletoPaciente?:string;
    TipoMuestra?:string;

    EstadoImpresionEtiqueta?:boolean;
    UsuarioImpresionEtiqueta?:string;
    FechaImpresionEtiqueta?:Date;
            
    EstadoEnvioResultados?:boolean;
    UsuarioEnvioResultados?:string;
    FechaEnvioResultados?:Date;

    EstadoValidacion?:boolean;
    UsuarioValidacion?:string;
    FechaValidacion?:Date;
}
