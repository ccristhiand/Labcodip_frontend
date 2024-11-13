export class Perfiles{
    idPerfil?:string;
    nombre?:string;
    estado?:string;
    perfilExamenes?:PerfilExamenes[]
}
export class PerfilExamenes{
    idPerfilExamen?:string;
    idPerfil?:string;
    nombrePerfil?:string;
    idExamen?:string;
    nombreExamen?:string;
    abreviaturaExamen?:string;
    estado?:string;
}
