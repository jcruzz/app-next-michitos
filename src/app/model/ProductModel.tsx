import { IDominioFijo } from "./UtilModel";

export interface IProducto {
  idProducto: number;
  nombreProducto: string;
  cantidadstock: number;
  precioProducto: number;
  descripcion: string;
  costoProducto: number;
  codUnidadMedida: string;
  imagenReferencial: string;
  categoria: ICategoria;
  proveedor: IProveedor;
  fecRegistro: string;
  estado: string;
}

export interface ICategoria {
  idCategoria: number;
  nombreCategoria: string;
  descripcion: string;
  fecRegistro: string;
  codEstado: string;
}

export interface IProveedor {
  idProveedor: number;
  nombreProveedor: string;
  codTipoIdentificacion: string;
  numeroIdentificacion: string;
  numeroContacto: string;
  fecRegistro: string;
  codEstado: string;
}

export interface ISaveProduct {
  idProducto: number | null;
  nombreProducto: string;
  cantidadStock: number;
  precioProducto: number;
  descripcion: string;
  costoProducto: number;
  // codUnidadMedida: string;
  imagenReferencial: string;
  idProveeedor: number;
  idCategoria: number;
}

export interface IChartCantidadPorProducto {
  producto: string;
  cantidad: number;
}
