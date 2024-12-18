import axios from "axios";
import { obtainApiUrl, obtenerCabecera } from "../utils/Utils";
import { ICategoria } from "../model/CategoriaModel";

export const obtenerCategorias = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.get<ICategoria[]>(
      API + "/api/categoria/",
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerCategoriaPorId = async (idCategoria: number) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<ICategoria>(
      API + "/api/categoria/obtener-categoria",
      { idVenta: idCategoria },
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
