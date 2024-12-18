import axios from "axios";
import { obtainApiUrl, obtenerCabecera } from "../utils/Utils";
import {
  IChartCantidadPorProducto,
  IProducto,
  ISaveProduct,
} from "../model/ProductModel";

export const obtenerProductos = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.get<IProducto[]>(
      API + "/api/product/",
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerProducto = async (idProducto: number) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post<IProducto>(
      API + "/api/product/producto",
      { idVenta: idProducto },
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const guardarProducto = async (product: ISaveProduct) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.post(
      API + "/api/product/save",
      product,
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const actualizarProducto = async (product: IProducto) => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.put(
      API + "/api/product/update",
      product,
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const borrarProducto = async (idProducto: number) => {
  try {
    const API = await obtainApiUrl();
    const respomse = await axios.put(
      API + "/api/product/delete",
      { idVenta: idProducto },
      obtenerCabecera()
    );
    return respomse.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerDatosChart = async () => {
  try {
    const API = await obtainApiUrl();
    const response = await axios.get<IChartCantidadPorProducto[]>(
      API + "/api/product/chart-producto",
      obtenerCabecera()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
