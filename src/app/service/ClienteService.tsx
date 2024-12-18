import axios from "axios";
import { obtainApiUrl, obtenerCabecera } from "../utils/Utils";
import { ICliente } from "../model/VentaModel";

export const obtenerCliente = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.get<ICliente[]>(
      API + "/api/cliente/",
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerClienteById = async (idCliente: number) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<ICliente>(
      API + "/api/cliente/obtain-cliente",
      { idVenta: idCliente },
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerClienteActivos = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.get<ICliente[]>(
      API + "/api/cliente/clientes-activos",
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const guardarCliente = async (cliente: ICliente) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<ICliente>(
      API + "/api/cliente/save",
      cliente,
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const borrarCliente = async (idCliente: number) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.put<ICliente>(
      API + "/api/cliente/delete",
      { idVenta: idCliente },
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const actualizarCliente = async (cliente: ICliente) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.put<ICliente>(
      API + "/api/cliente/update",
      cliente,
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
