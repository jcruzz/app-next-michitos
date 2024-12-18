import { IPersona, IUser, IVenta } from "./VentaModel";

export interface IEntrega {
  idEntrega: number;
  venta: IVenta;
  repartidor: IRepartidor;
  fecRegistro: string;
  codEstado: string;
}

export interface IRepartidor {
  idRepartidor: number;
  persona: IPersona;
  fecRegistro: string;
  codEstado: string;
}

export interface IEntregav2 {
  idEntrega: number | null;
  venta: IVenta;
  repartidor: IUser;
  fecRegistro: string;
  codEstado: string;
}
