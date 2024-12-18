import axios from "axios";
import { IUrlApi } from "../model/UtilModel";
import { getSession } from "@/auth/Auth";
import { Badge } from "flowbite-react";

export const obtainApiUrl = async () => {
  const response = await axios.get<IUrlApi>("/pages/api/data");
  return response.data.NEXT_PUBLIC_API_URL;
};

export const obtenerCabecera = () => {
  const token = getSession().token;
  const headers = {
    Authorization: "Bearer " + token,
  };

  const options = {
    headers: headers,
  };

  return options;

  // const token = cookies().get('user-token');
};

export const formatRol = (rol: string) => {
  if (rol !== undefined) {
    switch (rol) {
      case "ROLE_USER":
        return "Rol Usuario";
      case "ROLE_MODERATOR":
        return "Rol Moderador";
      case "ROLE_ADMIN":
        return "Rol Administrador";
      default:
        return "";
    }
  }
};

export const obtenerNombreDominio = (cod: string) => {
  switch (cod) {
    case "PEN":
      return "Pendiente";
    case "PRO":
      return "En Proceso";
    case "COM":
      return "Completada";
    case "SOL":
      return "Soltero";
    case "CAS":
      return "Casado";
    case "DIV":
      return "Divorciado";
    case "VIU":
      return "Viudo";
    case "TC":
      return "Tarjeta de Crédito";
    case "EF":
      return "Efectivo";
    case "TB":
      return "Transferencia Bancaria";
    case "PP":
      return "Paypal";
    case "DNI":
      return "Cédula de Identidad";
    case "PAS":
      return "Pasaporte";
    case "LIC":
      return "Licencia de Conducir";
    case "EXT":
      return "Carnet de Extranjería";
    case "NA":
      return "No aplica";
    case "ONL":
      return "Online";
    case "TIE":
      return "En Tienda";
    case "TEL":
      return "Por Teléfono";
    case "OTR":
      return "Otros";
    default:
      return "";
  }
};

export const formatNameRol = (cod: string) => {
  switch (cod) {
    case "3":
      return "adm";
    case "2":
      return "mod";
    default:
      return "user";
  }
};

export const obtenerEstado = (cod: string) => {
  switch (cod) {
    case "COM":
      return (
        <div className="px-3">
          <Badge color="success">Completado</Badge>
        </div>
      );
    case "PEN":
      return (
        <div className="px-3">
          <Badge color="warning">Pendiente</Badge>
        </div>
      );
    case "PRO":
      return (
        <div className="px-3">
          <Badge color="info">En Camino</Badge>
        </div>
      );
    case "ACT":
      return (
        <div className="px-3">
          <Badge color="success">Activo</Badge>
        </div>
      );

    default:
      break;
  }
};

export const obtenerEstadoComponent = (cod: string) => {
  switch (cod) {
    case "COM":
      return (
        <div className="px-3">
          <Badge color="success">Completado</Badge>
        </div>
      );
    case "PEN":
      return (
        <div className="px-3">
          <Badge color="warning">Pendiente</Badge>
        </div>
      );
    case "PRO":
      return (
        <div className="px-3">
          <Badge color="info">En Camino</Badge>
        </div>
      );
    case "ACT":
      return (
        <div className="px-3">
          <span className="bg-green-100 text-green-500 text-base font-medium px-4 py-1 rounded-full">
            Activo
          </span>
        </div>
      );

    case "INA":
      return (
        <div className="px-3">
          <span className="bg-red-100 text-red-500 text-base font-medium px-4 py-1 rounded-full">
            Inactivo
          </span>
        </div>
      );
    default:
      break;
  }
};
