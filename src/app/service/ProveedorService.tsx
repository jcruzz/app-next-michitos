import axios from "axios";
import { obtainApiUrl, obtenerCabecera } from "../utils/Utils";
import { IProveedor } from "../model/ProveedorModeel";

export const obtenerProveedores = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.get<IProveedor[]>(
      API + "/api/proveedor/",
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerProveedorPorID = async (idProveedor: number) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<IProveedor>(
      API + "/api/proveedor/obtener-proveedor",
      { idVenta: idProveedor },
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
