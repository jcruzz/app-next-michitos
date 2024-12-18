import { IVenta } from "@/app/model/VentaModel";
import { obtenerTodasVentas } from "@/app/service/VentaService";
import { BlobProvider } from "@react-pdf/renderer";
import { format, parseISO } from "date-fns";
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Comprobante from "../comprobante/Comprobante";
import { obtenerEstadoComponent, obtenerNombreDominio } from "@/app/utils/Utils";
import ViewDetailsVenta from "../modal/ViewDetailsVenta";
import { BsXCircleFill } from "react-icons/bs";

const ListVenta: React.FC = () => {
  const [idVenta, setIdVenta] = useState<number>(0);
  const [listVenta, setListaVenta] = useState<IVenta[]>([]);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalView, setOpenModalView] = useState<boolean>(false);

  useEffect(() => {
    const get = async () => {
      try {
        setListaVenta(await obtenerTodasVentas());
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  return (
    <>
      <Modal
        show={openModalDelete}
        size="md"
        onClose={() => setOpenModalDelete(false)}
        popup
        className="slide-in-fwd-center"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Desea imprimir comprobante?
            </h3>
            <div className="flex justify-center gap-4">
              <BlobProvider document={<Comprobante idCliente={idVenta} />}>
                {({ url }) =>
                  url ? (
                    <a target="_blank" href={url?.toString()}>
                      <Button color="success">Imprimir comprobante</Button>
                    </a>
                  ) : (
                    <Button color="success" disabled>
                      Generando comprobante...
                    </Button>
                  )
                }
              </BlobProvider>

              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                No, cerrar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openModalView}
        size={"4xl"}
        onClose={() => setOpenModalView(false)}
        className="slide-in-fwd-center"
      >
        <Modal.Header className="bg-[#F4EEF3] border-b-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="text-[#431A33] font-medium text-2xl">
            Ver Detalles del Cliente
          </div>
        </Modal.Header>
        <ViewDetailsVenta idCliente={idVenta}/>
        <Modal.Footer className="footer-bg bg-[#F4EEF3] border-t-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="mx-auto py-4">
            <Button type="button" onClick={() => setOpenModalView(false)}>
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

      <div className="flex flex-row justify-between">
        <div className="text-gray-700 text-2xl font-semibold dark:text-gray-300 mb-1">
          Lista de Ventas
        </div>
      </div>
      <div className="w-64 border-2 mb-5 border-[#6DB26D]"></div>
      <div className="overflow-x-auto slide-in-fwd-center">
        <Table>
          <Table.Head className="text-center">
            <Table.HeadCell>Número de Comprobante</Table.HeadCell>
            <Table.HeadCell>Total Compra</Table.HeadCell>
            <Table.HeadCell>Método de Pago</Table.HeadCell>
            <Table.HeadCell>Tipo de Venta</Table.HeadCell>
            <Table.HeadCell>Cliente</Table.HeadCell>
            <Table.HeadCell>Usuario vendedor</Table.HeadCell>
            <Table.HeadCell>Fecha</Table.HeadCell>
            {/* <Table.HeadCell>Estado</Table.HeadCell> */}
            <Table.HeadCell>
              <span className="sr-only">Imprimir</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Ver detalle</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y text-center">
            {listVenta.map((item, i) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item.numComprobante}
              >
                <Table.Cell>{item.numComprobante}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Bs. {item.total}
                </Table.Cell>
                <Table.Cell>{obtenerNombreDominio(item.codMetodoPago)}</Table.Cell>
                <Table.Cell>{obtenerNombreDominio(item.codTipoVenta)}</Table.Cell>
                <Table.Cell>
                  {item.cliente.persona.nombres +
                    " " +
                    item.cliente.persona.apellidoPaterno +
                    " " +
                    item.cliente.persona.apellidoMaterno}
                </Table.Cell>
                <Table.Cell>
                  {item.user.persona.nombres +
                    " " +
                    item.user.persona.apellidoPaterno +
                    " " +
                    item.user.persona.apellidoMaterno}
                </Table.Cell>
                <Table.Cell>
                  {format(parseISO(item.fecRegistro), "dd/MM/yyyy")}
                </Table.Cell>

                {/* <Table.Cell>{obtenerEstadoComponent(item.estado)}</Table.Cell> */}
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => {
                      if (item.idVenta) setIdVenta(item.idVenta);
                      setOpenModalDelete(true);
                    }}
                  >
                    Imprimir comprobante
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => {
                      if (item.idVenta) setIdVenta(item.idVenta);
                      setOpenModalView(true);
                    }}
                  >
                    Ver detalles
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default ListVenta;
