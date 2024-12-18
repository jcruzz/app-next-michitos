export interface IRol {
  idRol: number
  nombreRol: string
}

export interface IPersona {
  idPersona: number | null
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  apellidoCasada: string
  direccion: string
  coordenadaX?: string | null
  coordenadaY?: string | null
  codEstadoCivil: string
  codTipoIdentificacion: string
  numeroIdentificacion: string
  numeroContacto: string
  fecRegistro: string
  codEstado: string
}

export interface ICliente {
  idCliente?: number | null
  persona: IPersona;
  fecRegistro: string
  codEstado: string
}

export interface IUser {
  idUsuario: number
  emailUsuario: string
  username: string;
  roles: IRol[];
  persona: IPersona;
  codEstado: string
}

export interface ICategoria {
    idCategoria: number
    nombreCategoria: string
    descripcion: string
    fecRegistro: string
    codEstado: string
}

export interface IProveedor {
    idProveedor: number
    nombreProveedor: string
    codTipoIdentificacion: string
    numeroIdentificacion: string
    numeroContacto: string
    fecRegistro: string
    codEstado: string
}

export interface IProducto {
    idProducto: number
    nombreProducto: string
    cantidadstock: number
    precioProducto: number
    descripcion: string
    costoProducto: number
    codUnidadMedida: string
    imagenReferencial: string
    categoria: ICategoria
    proveedor: IProveedor
    fecRegistro: string
    estado: string
}

export interface IDetalleVenta {
  producto: IProducto
  cantidad: number
  precioVenta: number
  fecRegistro: string
  codEstado: string
}

export interface IVenta {
  idVenta: number | null
  numComprobante: number
  total: number
  codMetodoPago: string
  codTipoVenta: string
  cliente: ICliente;
  user: IUser;
  detalles: IDetalleVenta[];
  fecRegistro: string
  estado: string
}
