import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {  UsuarioService} from '../services/usuario.service';
import {  MenuService} from '../services/menu.service';
import { NavbarRelacionRolMenuQuery} from '../models/menu.model'
import { faHouse,faChartSimple,faBarcode,faUserDoctor,faBuilding,faChartColumn,faFileExcel, faPlane,faGears,faHandshakeSimple,faShield,faUserNurse, faIdCard,
    faFlaskVial,faLaptopMedical,faLaptopCode,faDatabase,faFileZipper
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    faHouse=faHouse;
    faChartSimple=faChartSimple;
    faBarcode=faBarcode;
    faUserDoctor=faUserDoctor;
    faBuilding=faBuilding;
    faChartColumn=faChartColumn;
    faFileExcel=faFileExcel;
    faPlane=faPlane;
    faGears=faGears;
    faHandshakeSimple=faHandshakeSimple;
    faShield=faShield;
    faUserNurse=faUserNurse;
    faIdCard=faIdCard;
    faFlaskVial=faFlaskVial;
    faLaptopMedical=faLaptopMedical;
    faLaptopCode=faLaptopCode;
    faDatabase=faDatabase;
    faFileZipper=faFileZipper;
    constructor(
        private usuarioService: UsuarioService,
        private menuServicio:MenuService
    ){}


    model: any[] = [];

    ngOnInit() {
        let session = this.usuarioService.SessionUsuario();

        this.obtener(session.idrol);
    }
    obtener(idRol:string){

        this.menuServicio.Obtener(idRol).then(data => {
            this.model=data;
          });
    }

}
