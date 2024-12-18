import axios from "axios";
import { obtainApiUrl, obtenerCabecera } from "../utils/Utils";
import { IDominioFijo } from "../model/DominioModel";
import { IRol } from "../model/VentaModel";

export const obtenerDominioUnidadMedida = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<IDominioFijo[]>(
      API + "/api/dominio/",
      { idVenta: 8 },
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerDominioMetodoPago = async () => {
  try {
    const API = await obtainApiUrl()
    const response = await axios.post<IDominioFijo[]>(
      API + "/api/dominio/",
      { idVenta: 2 },
      obtenerCabecera()
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const obtenerTipoVenta = async () => {
  try {
    const API = await obtainApiUrl()
    const response = await axios.post<IDominioFijo[]>(
      API + "/api/dominio/",
      { idVenta: 5 },
      obtenerCabecera()
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const obtenerEstadosEntrega = async () => {
  try {
    const API = await obtainApiUrl()
    const response = await axios.post<IDominioFijo[]>(
      API + "/api/dominio/",
      { idVenta: 6 },
      obtenerCabecera()
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const obtenerEstadoCivil = async () => {
  try {
    const API = await obtainApiUrl()
    const response = await axios.post<IDominioFijo[]>(
      API + "/api/dominio/",
      { idVenta: 1 },
      obtenerCabecera()
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const obtenerTipoIdentificacion = async () => {
  try {
    const API = await obtainApiUrl()
    const response = await axios.post<IDominioFijo[]>(
      API + "/api/dominio/",
      { idVenta: 3 },
      obtenerCabecera()
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const obtenerRoles = async () => {
  try {
    const API = await obtainApiUrl()
    const response = await axios.get<IRol[]>(
      API + "/api/dominio/obtain-roles",
      obtenerCabecera()
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const obtenerRol = async (idRol: number) => {
  try {
    const API = await obtainApiUrl()
    const response = await axios.post<IRol>(
      API + "/api/dominio/obtain-rol",
      { idVenta: idRol },
      obtenerCabecera()
    )
    return response.data
  } catch (error) {
    throw error
  }
}