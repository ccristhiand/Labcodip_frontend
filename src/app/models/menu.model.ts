export class NavbarRelacionRolQuery {
    IdNavbar?:number;
    Label?:string;
    icon?:string;
    routerlink?:string;
}
export class NavbarRelacionRolMenuQuery extends NavbarRelacionRolQuery{
    menu?:NavbarRelacionRolQuery[]
}
