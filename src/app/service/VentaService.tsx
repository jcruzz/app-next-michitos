import axios from "axios";
import { IVenta } from "../model/VentaModel";
import { obtainApiUrl, obtenerCabecera } from "../utils/Utils";

export const guardarVenta = async (venta: IVenta) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<IVenta>(
      API + "/api/venta/save",
      venta,
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerTodasVentas = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.get<IVenta[]>(
      API + "/api/venta/",
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerVenta = async (idVenta: number) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<IVenta>(
      API + "/api/venta/venta",
      { idVenta: idVenta },
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
