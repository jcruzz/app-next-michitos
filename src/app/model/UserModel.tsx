import { IPersona } from "./ClienteModel";

export interface IResponeUserData {
  idUsuario: number;
  emailUsuario: string;
  username: string;
  roles: IResponseListRol[];
}

export interface IResponseListRol {
  idRol: number;
  nombreRol: string;
}

export interface IDataUser {
  idUsuario: number;
  emailUsuario: string;
  username: string;
  roles: IRol[];
}

export interface IRol {
  idRol: number;
  nombreRol: string;
}

export interface IUserSingUp {
  username: string;
  email: string;
  password: string;
  role: string[];
  persona: IPersona;
}

export interface IUserRepartidor {
  idUsuario: number;
  nombreUsuario: string;
  nombreCompleto: string;
  nombreRol: string;
}
