import { Options } from "./utils/options.model";

export class Usuario {
    userName?: string;
    password?: string;
    domain?: string;
    codExterno?: string;
    idTipoDocu?: string;
    nroDocumento?: string;
    apePaterno?: string;
    apeMaterno?: string;
    nombre?: string;
    fechaNacimiento?: Date;
    edad?: number;
    idSexo?: string;
    permiso_Escritura?: boolean;

    listaUsuarioRol: string[] = [];
    listaUsuarioArea: string[] = [];
    listaOpciones!: Options[];
    listaRoles!: RolesQuery[];

    listaLaboratorios!: LaboratorioQuery[];
    laboratorioSelect!: LaboratorioQuery[];
}

export class RolesQuery {
    key?: string;
    label?: string;
    icon?: string;
    parent?:string;
    partialSelected?:boolean=false;
}

export class LaboratorioQuery {
    key?: string;
    label?: string;
    icon?: string;
    children?: AreaQuery[];
}

export class AreaQuery {
    key?: string;
    label?: string;
    icon?: string;
}

export class TokenUsuario {
    key?: string;
    typeResponse?: string;
    summary?: string;
    message?: string;
    access_token?: string;
    id?: string;
}

export class Login {
    usuario?: string;
    password?: string;
    domain?: string;
}


