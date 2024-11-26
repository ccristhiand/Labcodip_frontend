export const environment = {
  production: true,
  

    //******DESARROLLO*********
  UrlApi1:'http://localhost:5180/api',  //security
  UrlApi2:'http://localhost:5183/api',  //laboratorio
  UrlApi3:'http://localhost:5018/api',  //configuracion
  UrlApi4:'http://localhost:5247/api',  //report
  UrlApi5:'http://localhost:5122/api', //tracking
  UrlApi6:'http://localhost:5073/api', //qc
  
     //******PRODUCCION*********
  // UrlApi1:'https://netcodip.com:8010/api',  //security
  // UrlApi2:'https://netcodip.com:8020/api',  //laboratorio
  // UrlApi3:'https://netcodip.com:8030/api',  //configuracion
  // UrlApi4:'https://netcodip.com:8040/api',  //report
  // UrlApi5:'https://netcodip.com:8050/api',  //tracking
  // UrlApi6:'https://netcodip.com:8060/api',  //qc

  UrlImage:'assets/',

  Access_Token: 'access_token',
  
  IdRolAdmin : '01HTFTW32KEH24P284SNVH8QPD',

  ERROR: "error",
  EXITO: "success",
  ALERT: "warn",
  OTRO: "info",


  EstadoActivo: "ACTIVO",
  EstadoDesactivado: "DESACTIVADO",
  EstadoEliminado: "ELIMINADO",

  Pendiente: "PENDIENTE",
  Validado: "VALIDADO",
  PorValidar: "POR VALIDAR",

  MensajeActivo: "Estás seguro de que deseas activar",
  MensajeDesactivado: "Estás seguro de que deseas desactivar",
  MensajeEliminado: "Estás seguro de que deseas eliminar",

  TipoMuestra : "TipoMuestra",
  Area : "Area",
  Examen : "Examen",
  Interpretado : "Interpretado",
  Interpretado2 : "Interpretado2",
  NoInterpretado : "NoInterpretado",
  SignoComparativo : "SignoComparativo",
  Sexo : "Sexo",
  TipoDocumento : "TipoDocumento",
  Procedencia : "Procedencia",
  Servicio : "Servicio",
  Origen : "Origen",
  Medico : "Medico",
  Laboratorio : "Laboratorio",
  TipoOrden : "TipoOrden",
  EstadoOrden : "EstadoOrden",
  TipoConfRango : "TipoConfRango",
  EquipoMedico : "EquipoMedico",
  Modo : "Modo",
  ModoPorExamen : "PEXA",
  ModoPorGrupo : "GEXA",
  Lote : "Lote",
  Nivel : "Nivel",

  RangoMinimo : "Rango Inicial:",
  RangoMedio : "Rango Media:",
  Desviacion : "Desviación:",
  RangoMaximo : "Rango Final:"
};
