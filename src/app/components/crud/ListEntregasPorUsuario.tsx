import { IDominioFijo } from "@/app/model/DominioModel";
import { IEntregav2 } from "@/app/model/IEntregaModel";
import { obtenerEstadosEntrega } from "@/app/service/DominioService";
import {
  actualizarEntrega,
  obtenerEntregaPorUsuario,
} from "@/app/service/EntregaService";
import { obtenerDatosUsuario } from "@/app/service/UserService";
import { useAlert } from "@/app/utils/usAlert";
import { obtenerNombreDominio } from "@/app/utils/Utils";
import { Button, Modal, Select } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFillPinMapFill, BsXCircleFill } from "react-icons/bs";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../map/Map"), { ssr: false });

const ListEntregasPorUsuario: React.FC = () => {
  const [ListEntrega, setListaEntrega] = useState<IEntregav2[]>([]);
  const [listEstados, setListaEstados] = useState<IDominioFijo[]>([]);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const zoom = 18;

  const { showAlert } = useAlert();

  useEffect(() => {
    const get = async () => {
      try {
        setListaEntrega(
          await obtenerEntregaPorUsuario(await obtenerDatosUsuario())
        );
        setListaEstados(await obtenerEstadosEntrega());
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  const handleChangeEstado = async (item: IEntregav2, newEstado: string) => {
    try {
      item.codEstado = newEstado;
      const response = await actualizarEntrega(item);
      if (response.idEntrega) {
        showAlert("Success", "Estado actualizado correctamente");
        setListaEstados(await obtenerEstadosEntrega());
      }
    } catch (error) {
      console.log(error);
      showAlert("Error", "Error actualizando el estado de la entrega");
    }
  };

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
      case "COM":
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
      case "PEN":
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

  console.log(center);

  return (
    <>
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

      <div className="bg-transparent flex items-center justify-center bg-hero dark:bg-[#0A101D] slide-in-fwd-center">
        <div className="container mx-auto p-4">
          <div className="text-[#431A33] dark:text-gray-300 text-3xl font-medium  mb-1 text-center py-3">
            Mis Entregas
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {ListEntrega.map((item) => (
              <div className="bg-[#FFFFFF] rounded-lg border-2 shadow-sm p-4 dark:bg-[#FFFFFF] dark:border-gray-700 border-[#EED9D1] slide-in-fwd-center">
                <div>
                  <div className="font-normal text-xl text-[#A67375] dark:text-[#A67375] mb-3">
                    Detalles de la Entrega
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {/* Columna izquierda */}
                  <div className="col-span-2 space-y-3">
                    <div className="flex flex-row">
                      <div className="font-semibold text-[#431A33] text-base text-nowrap">
                        Número del pedido:{" "}
                      </div>
                      <div className="pl-3 text-base text-[#A67375]">
                        {item.venta.numComprobante}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="font-semibold text-[#431A33] text-base text-nowrap">
                        Dirección:{" "}
                      </div>
                      <div className="pl-3 text-base text-[#A67375]">
                        {item.venta.cliente.persona.direccion}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="font-semibold text-[#431A33] text-base text-nowrap">
                        Cliente:{" "}
                      </div>
                      <div className="pl-3 text-base text-[#A67375]">
                        {item.venta.cliente.persona.nombres +
                          " " +
                          item.venta.cliente.persona.apellidoPaterno +
                          " " +
                          item.venta.cliente.persona.apellidoMaterno}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="font-semibold text-[#431A33] text-base text-nowrap">
                        Detalle de la Entrega:{" "}
                      </div>
                      <div className="pl-3 text-base text-[#A67375]">
                        {item.venta.detalles.map(
                          (detalle) =>
                            detalle.cantidad +
                            " " +
                            detalle.producto.nombreProducto
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <p className="font-semibold text-[#431A33] text-base text-nowrap my-auto">
                        Estado:{" "}
                      </p>
                      <div className="flex items-center ml-3 my-auto">
                        <Select
                          onChange={(e) =>
                            handleChangeEstado(item, e.target.value)
                          }
                        >
                          <option value="">Seleccionar un Estado</option>
                          {listEstados.map((estados) => (
                            <option value={estados.codDominio}>
                              {estados.nombreDominio}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Columna derecha */}
                  <div className="col-span-1 flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center">
                      <p className="text-xl font-bold text-[#431A33]">
                        {obtenerNombreDominio(item.codEstado)}
                      </p>
                      {obtainImageEstate(item.codEstado)}
                    </div>
                    <Button
                      type="button"
                      onClick={() => {                       
                        setCenter([
                          Number(item.venta.cliente.persona.coordenadaX),
                          Number(item.venta.cliente.persona.coordenadaY),
                        ]);
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListEntregasPorUsuario;
