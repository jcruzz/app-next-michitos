import { ApexOptions } from "apexcharts";

export interface IUrlApi {
  NEXT_PUBLIC_API_URL: string;
}

export interface IDominioFijo {
  idDominioFijo: number;
  nombreDominio: string;
  auxiliar: string;
  codDominio: string;
  descripcionDominio: string;
  fecRegistro: Date;
  codEstado: string;
}

export interface IResponseFile {
  fileName: string;
  fileUri: string;
}

export interface idProducto {
  idProducto: number;
}

export interface ChartOptions extends ApexOptions {}

export interface IResponseSignUp {
  message: string;
}

export interface idCliente {
  idCliente: number
}