import axios from "axios";
import { obtainApiUrl, obtenerCabecera } from "../utils/Utils";
import { IEntrega, IEntregav2 } from "../model/IEntregaModel";
import { IUser } from "../model/VentaModel";

export const obtenerEntregas = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.get<IEntrega[]>(
      API + "/api/entrega/",
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerEntregaPorUsuario = async (user: IUser) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<IEntregav2[]>(
      API + "/api/entrega/obtener-entregas",
      user,
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const actualizarEntrega = async (entrega: IEntregav2) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.put<IEntregav2>(
      API + "/api/entrega/update",
      entrega,
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const guardarEntrega = async (entrega: IEntregav2) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<IEntregav2>(
      API + "/api/entrega/save",
      entrega,
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

