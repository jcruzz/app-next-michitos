export interface ICliente {
  idCliente: number | null;
  persona: IPersona;
  fecRegistro: string;
  codEstado: string;
}

export interface IPersona {
  idPersona: number | null;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  apellidoCasada: string;
  direccion: string;
  coordenadaX?: string | null;
  coordenadaY?: string | null;
  codEstadoCivil: string;
  codTipoIdentificacion: string;
  numeroIdentificacion: string;
  numeroContacto: string;
  fecRegistro: string;
  codEstado: string;
}
