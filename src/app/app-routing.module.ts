import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { GuardService } from './services/guard.service';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: 'inicio', data:{ breadcrumb: 'inicio' }, loadChildren: () => import('./pages/inicio/dashboards.module').then(m => m.DashboardsModule), canActivate:[GuardService] },
            { path: 'seguridad/usuario', data:{ breadcrumb: 'seguridad / usuario' }, loadChildren: () => import('./pages/seguridad/usuario/usuario-listar/usuario-listar.module').then(m => m.UsuarioListarModule), canActivate:[GuardService] },
            { path: 'seguridad/usuario/crear', data:{ breadcrumb: 'seguridad / usuario' }, loadChildren: () => import('./pages/seguridad/usuario/usuario-crear/usuario-crear.module').then(m => m.UsuarioCrearModule), canActivate:[GuardService] },
            { path: 'seguridad/usuario/edit/:id/:edit', data:{ breadcrumb: 'seguridad / usuario' }, loadChildren: () => import('./pages/seguridad/usuario/usuario-crear/usuario-crear.module').then(m => m.UsuarioCrearModule), canActivate:[GuardService] },

            { path: 'laboratorio/orden', data:{ breadcrumb: 'laboratorio / orden' }, loadChildren: () => import('./pages/laboratorio/orden/orden-listar/orden-listar.module').then(m => m.OrdenListarModule), canActivate:[GuardService] },
            { path: 'laboratorio/orden/crear', data:{ breadcrumb: 'laboratorio / orden' }, loadChildren: () => import('./pages/laboratorio/orden/orden-crear/orden-crear.module').then(m => m.OrdenCrearModule), canActivate:[GuardService] },
            { path: 'laboratorio/orden/edit/:id',data:{ breadcrumb: 'laboratorio / orden' }, loadChildren: () => import('./pages/laboratorio/orden/orden-crear/orden-crear.module').then(m => m.OrdenCrearModule), canActivate:[GuardService] },
            { path: 'laboratorio/orden/validar/:id',data:{ breadcrumb: 'laboratorio / orden' }, loadChildren: () => import('./pages/laboratorio/orden/orden-validar/orden-validar.module').then(m => m.OrdenValidarModule), canActivate:[GuardService] },
            { path: 'laboratorio/medico', data:{ breadcrumb: 'laboratorio / medico' }, loadChildren: () => import('./pages/laboratorio/medico/medico-listar.module').then(m => m.MedicoListarModule), canActivate:[GuardService] },
            { path: 'laboratorio/origen', data:{ breadcrumb: 'laboratorio / origen' }, loadChildren: () => import('./pages/laboratorio/origen/origen.module').then(m => m.OrigenModule), canActivate:[GuardService] },
            { path: 'laboratorio/procedencia', data:{ breadcrumb: 'laboratorio / procedencia' }, loadChildren: () => import('./pages/laboratorio/procedencia/procedencia.module').then(m => m.ProcedenciaModule), canActivate:[GuardService] },
            { path: 'laboratorio/servicio', data:{ breadcrumb: 'laboratorio / servicio' }, loadChildren: () => import('./pages/laboratorio/servicio/servicio.module').then(m => m.ServicioModule), canActivate:[GuardService] },

            { path: 'configuracion/hospital', data:{ breadcrumb: 'configuracion / hospital' }, loadChildren: () => import('./pages/configuracion/hospital/hospital.module').then(m => m.HospitalModule), canActivate:[GuardService] },
            { path: 'configuracion/laboratorio', data:{ breadcrumb: 'configuracion / laboratorio' }, loadChildren: () => import('./pages/configuracion/laboratorio/laboratorio.module').then(m => m.LaboratorioModule), canActivate:[GuardService] },
            { path: 'configuracion/area', data:{ breadcrumb: 'configuracion / area' }, loadChildren: () => import('./pages/configuracion/area/area.module').then(m => m.AreaModule), canActivate:[GuardService] },
            { path: 'configuracion/tipomuestra', data:{ breadcrumb: 'configuracion / tipomuestra' }, loadChildren: () => import('./pages/configuracion/tipomuestra/tipomuestra.module').then(m => m.TipomuestraModule), canActivate:[GuardService] },
            { path: 'configuracion/examenes', data:{ breadcrumb: 'configuracion / examenes' }, loadChildren: () => import('./pages/configuracion/examen/examen-listar/examen-listar.module').then(m => m.ExamenListarModule), canActivate:[GuardService] },
            { path: 'configuracion/examenes/crear', data:{ breadcrumb: 'configuracion / examenes' }, loadChildren: () => import('./pages/configuracion/examen/examen-crear/examen-crear.module').then(m => m.ExamenCrearModule), canActivate:[GuardService] },
            { path: 'configuracion/examenes/crear/:id', data:{ breadcrumb: 'configuracion / examenes' }, loadChildren: () => import('./pages/configuracion/examen/examen-crear/examen-crear.module').then(m => m.ExamenCrearModule), canActivate:[GuardService] },
            { path: 'configuracion/equipomedico', data:{ breadcrumb: 'configuracion / equipomedico' }, loadChildren: () => import('./pages/configuracion/equipo/equipo-listar/equipo-listar.module').then(m => m.EquipoListarModule), canActivate:[GuardService] },
            { path: 'configuracion/equipomedico/crear/:id', data:{ breadcrumb: 'configuracion / equipomedico' }, loadChildren: () => import('./pages/configuracion/equipo/equipo-crear/equipo-crear.module').then(m => m.EquipoCrearModule), canActivate:[GuardService] },
            { path: 'configuracion/sistemasexterno', data:{ breadcrumb: 'configuracion / sistemasexterno' }, loadChildren: () => import('./pages/configuracion/sistema/sistema-listar/sistema-listar.module').then(m => m.SistemaListarModule), canActivate:[GuardService] },
            { path: 'configuracion/sistemasexterno/crear/:id', data:{ breadcrumb: 'configuracion / sistemasexterno' }, loadChildren: () => import('./pages/configuracion/sistema/sistema-crear/sistema-crear.module').then(m => m.SistemaCrearModule), canActivate:[GuardService] },
            { path: 'configuracion/perfiles', data:{ breadcrumb: 'configuracion / perfiles' }, loadChildren: () => import('./pages/configuracion/perfiles/perfiles.module').then(m => m.PerfilesModule), canActivate:[GuardService] },


            { path: 'reporte/ordenporpaciente', data:{ breadcrumb: 'reporte / orden paciente' }, loadChildren: () => import('./pages/reporte/orden-por-paciente/orden-por-paciente.module').then(m => m.OrdenPorPacienteModule), canActivate:[GuardService] },
            { path: 'reporte/resultadopaciente', data:{ breadcrumb: 'reporte / resultado paciente' }, loadChildren: () => import('./pages/reporte/resultado-paciente/resultado-paciente.module').then(m => m.ResultadoPacienteModule), canActivate:[GuardService] },

            { path: 'tracking', data:{ breadcrumb: 'tracking' }, loadChildren: () => import('./pages/tracking/tracking-listar/tracking-listar.module').then(m => m.TrackingListarModule), canActivate:[GuardService] },

            { path: 'controlcalidad/configuracion', data:{ breadcrumb: 'controlcalidad / configuracion' }, loadChildren: () => import('./pages/controlcalidad/configuracion/configuracion.module').then(m => m.ConfiguracionModule), canActivate:[GuardService] },
            { path: 'controlcalidad/configuracion/examen/:id', data:{ breadcrumb: 'controlcalidad / configuracion / examen' }, loadChildren: () => import('./pages/controlcalidad/examen/examen.module').then(m => m.ExamenModule), canActivate:[GuardService] },
            { path: 'controlcalidad/resultado', data:{ breadcrumb: 'controlcalidad / resultado' }, loadChildren: () => import('./pages/controlcalidad/resultado/resultado.module').then(m => m.ResultadoModule), canActivate:[GuardService] },

        ]
    },
    { path: '', pathMatch:'full', redirectTo:'login'},
    { path: '', loadChildren: () => import('./pages/seguridad/login/login.module').then(m => m.LoginModule) },
    { path: 'login', loadChildren: () => import('./pages/seguridad/login/login.module').then(m => m.LoginModule), canActivate:[GuardService] },
    { path: 'notfound', loadChildren: () => import('./pages/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
