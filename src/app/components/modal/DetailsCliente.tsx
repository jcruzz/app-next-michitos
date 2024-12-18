import { idCliente } from "@/app/model/UtilModel";
import { ICliente } from "@/app/model/VentaModel";
import { obtenerClienteById } from "@/app/service/ClienteService";
import { useEffect, useState } from "react";
const Map = dynamic(() => import("../map/Map"), { ssr: false });
import { Button, Modal } from "flowbite-react";
import { BsFillPinMapFill, BsXCircleFill } from "react-icons/bs";
import Image from "next/image";
import {
  obtenerEstadoComponent,
  obtenerNombreDominio,
} from "@/app/utils/Utils";
import { format, parseISO } from "date-fns";
import dynamic from "next/dynamic";

const DetailsCliente: React.FC<idCliente> = ({ idCliente }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [cliente, setCliente] = useState<ICliente | null>(null);
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const zoom = 18;

  useEffect(() => {
    const get = async () => {
      try {
        const response = await obtenerClienteById(idCliente);
        setCliente(response);
        setCenter([
          Number(response.persona.coordenadaX),
          Number(response.persona.coordenadaY),
        ]);
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
    <>
      {" "}
      <Modal
        show={openModal}
        size="7xl"
        onClose={() => setOpenModal(false)}
        className={"slide-in-fwd-center"}
      >
        <Modal.Header className="bg-[#F4EEF3] border-b-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="text-[#431A33] font-medium text-2xl">
            Ver Ubicación del Cliente
          </div>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="relative flex flex-col rounded-xl">
            <Map
              style="calc(50vh - 10px)"
              center={center}
              zoom={zoom}
              pointsHeat={[]}
              pointsMarker={[
                {
                  CODIGO_PERSONA: 1,
                  Coordenadas: center,
                  NOMBRE_COMPLETO: "",
                  CREDITOS: [],
                },
              ]}
              bounds={[]}
              pointsMarkerAgencia={[]}
              viewSatelital={false}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="footer-bg bg-[#F4EEF3] border-t-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="mx-auto py-4">
            <Button type="button" onClick={() => setOpenModal(false)}>
              <div className="flex flex-row">
                <div className="my-auto">Cerrar</div>
                <div className="my-auto ml-3">
                  <BsXCircleFill size={18} />
                </div>
              </div>
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
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
                    {cliente?.persona.nombres}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Apellidos:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {cliente?.persona.apellidoPaterno +
                      " " +
                      cliente?.persona.apellidoMaterno}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Dirección:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {cliente?.persona.direccion}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Estado Civil:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {obtenerNombreDominio(
                      cliente?.persona.codEstadoCivil ?? ""
                    )}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Tipo de Identificación:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {obtenerNombreDominio(
                      cliente?.persona.codTipoIdentificacion ?? ""
                    )}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Número de Identificación:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {cliente?.persona.numeroIdentificacion}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="font-semibold text-[#431A33] text-base text-nowrap">
                    Número de Contacto:
                  </div>
                  <div className="pl-3 text-base text-[#A67375]">
                    {cliente?.persona.numeroContacto}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha */}
          </div>
          <div className="col-span-1 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold text-[#431A33]">
                {obtenerEstadoComponent(cliente?.codEstado ?? "")}
              </p>
              {obtainImageEstate(cliente?.codEstado ?? "")}
            </div>
            <Button
              type="button"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <div className="flex flex-row">
                <div className="my-auto">Ver Mapa</div>
                <div className="my-auto ml-3">
                  <BsFillPinMapFill size={18} />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsCliente;
