import axios from "axios";
import { obtainApiUrl, obtenerCabecera } from "../utils/Utils";
import { IDataUser, IUserRepartidor, IUserSingUp } from "../model/UserModel";
import { getSession } from "@/auth/Auth";
import { IUser } from "../model/VentaModel";
import { IResponseSignUp } from "../model/UtilModel";

export const obtenerDatosUsuario = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<IUser>(
      API + "/api/user/",
      { username: getSession().userLogged },
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerUsuarios = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.get<IUser[]>(
      API + "/api/user/usuarios",
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerUsuarioPorId = async (idUsuario: number) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<IUser>(
      API + "/api/user/obtener-usuario",
      { idVenta: idUsuario },
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const guardarUsuario = async (user: IUserSingUp) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<IResponseSignUp>(
      API + "/api/auth/signup",
      user,
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerRepartidores = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.get<IUserRepartidor[]>(
      API + "/api/user/obtener-repartidor",
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const inactivarUsuario = async (idUsuario: number) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.put<IUser>(
      API + "/api/user/delete",
      { idVenta: idUsuario },
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const actualizarUsuario = async (user: IUser) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.put<IUser>(
      API + "/api/user/update",
      user,
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}