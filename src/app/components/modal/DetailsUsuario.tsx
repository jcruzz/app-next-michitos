import { idCliente } from "@/app/model/UtilModel";
import { IUser } from "@/app/model/VentaModel";
import { obtenerUsuarioPorId } from "@/app/service/UserService";
import { formatRol, obtenerEstadoComponent, obtenerNombreDominio } from "@/app/utils/Utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const DetailsUsuario: React.FC<idCliente> = ({ idCliente }) => {

    const [usuario, setUsuario] = useState<IUser | null>(null)

    useEffect(() => {
        const get = async () => {
          try {
            const response = await obtenerUsuarioPorId(idCliente);
            setUsuario(response);
          } catch (error) {
            console.log(error);
          }
        };
        get();
      }, []);

      const obtainImageEstate = (estado: string) => {
        switch (estado) {
          case "PRO":
            return (
              <Image
                src={"/images/ENCAMINO.png"}
                alt="ESTADO"
                width={200}
                height={100}
                className="mb-3"
                priority
              />
            );
          case "ACT":
            return (
              <Image
                src={"/images/ENTREGADO.png"}
                alt="ESTADO"
                width={200}
                height={100}
                className="mb-3"
                priority
              />
            );
          case "INA":
            return (
              <Image
                src={"/images/PENDIENTE.png"}
                alt="ESTADO"
                width={200}
                height={100}
                className="mb-3"
                priority
              />
            );
        }
      };
    

    return (
        <div className="mx-auto p-7">
        <div className="grid grid-cols-3 gap-5 mx-auto">
          <div className="bg-[#FFFFFF] rounded-lg border-2 shadow-sm p-4 dark:bg-[#FFFFFF] dark:border-gray-700 border-[#EED9D1] slide-in-fwd-center col-span-2">
            <div className="">
              {/* Columna izquierda */}
              <div className="col-span-2 space-y-2">
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Nombres:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {usuario?.persona.nombres}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Apellidos:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {usuario?.persona.apellidoPaterno +
                      " " +
                      usuario?.persona.apellidoMaterno}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Dirección:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {usuario?.persona.direccion}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Estado Civil:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {obtenerNombreDominio(
                      usuario?.persona.codEstadoCivil ?? ""
                    )}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Tipo de Identificación:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {obtenerNombreDominio(
                      usuario?.persona.codTipoIdentificacion ?? ""
                    )}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Número de Identificación:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {usuario?.persona.numeroIdentificacion}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Número de Contacto:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {usuario?.persona.numeroContacto}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Correo Electrónico:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {usuario?.emailUsuario}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Rol Asignado:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {formatRol(usuario?.roles[0].nombreRol ?? "")}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
          </div>
          <div className="col-span-1 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold text-[#431A33]">
                {obtenerEstadoComponent(usuario?.codEstado ?? "")}
              </p>
              {obtainImageEstate(usuario?.codEstado ?? "")}
            </div>
          </div>
        </div>
      </div>
    )
}

export default DetailsUsuario