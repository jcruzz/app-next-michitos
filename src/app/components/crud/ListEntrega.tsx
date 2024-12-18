import { IEntrega } from "@/app/model/IEntregaModel";
import { obtenerEntregas } from "@/app/service/EntregaService";
import { obtenerEstado, obtenerNombreDominio } from "@/app/utils/Utils";
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import ViewDetailsVenta from "../modal/ViewDetailsVenta";

const ListEntrega: React.FC = () => {
  const [listEntrega, setListaEntrega] = useState<IEntrega[]>([]);
  const [idVenta, setIdVenta] = useState<number>(0);
  const [openModalView, setOpenModalView] = useState<boolean>(false);

  useEffect(() => {
    const get = async () => {
      try {
        setListaEntrega(await obtenerEntregas());
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  return (
<>
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


    <div className="overflow-x-auto h-80 overflow-y-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell className="bg-[#594C4D] dark:bg-[#594C4D] dark:text-white text-center text-white">
            Nombre Repartidor
          </Table.HeadCell>
          <Table.HeadCell className="bg-[#594C4D] dark:bg-[#594C4D] dark:text-white text-center text-white">
            Nombre Cliente
          </Table.HeadCell>
          <Table.HeadCell className="bg-[#594C4D] dark:bg-[#594C4D] dark:text-white text-center text-white">
            Precio Total de la venta
          </Table.HeadCell>
          <Table.HeadCell className="bg-[#594C4D] dark:bg-[#594C4D] dark:text-white text-center text-white">
            Estado
          </Table.HeadCell>
          <Table.HeadCell className="bg-[#594C4D] dark:bg-[#594C4D] dark:text-white text-center text-white">
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {listEntrega.map((item) => (
            <Table.Row
              className="bg-[#DFDFDF] dark:border-gray-700 dark:bg-[#DFDFDF] text-gray-600 dark:text-[#431A33]"
              key={item.idEntrega}
            >
              <Table.Cell className="text-center px-1">
                {item.repartidor.persona.nombres +
                  " " +
                  item.repartidor.persona.apellidoPaterno}
              </Table.Cell>
              <Table.Cell className="text-center px-1">
                {item.venta.cliente.persona.nombres +
                  " " +
                  item.venta.cliente.persona.apellidoPaterno +
                  " " +
                  item.venta.cliente.persona.apellidoMaterno}
              </Table.Cell>
              <Table.Cell className="text-center px-1">
                Bs. {item.venta.total}
              </Table.Cell>
              <Table.Cell className="text-center px-1">
                {obtenerEstado(item.codEstado)}
              </Table.Cell>
              <Table.Cell className="px-1 text-center text-nowrap pr-3">
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-700"
                  onClick={() => {
                    if (item.venta.idVenta) setIdVenta(item.venta.idVenta);
                    setOpenModalView(true);
                  }}
                >
                  Ver Detalles
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

export default ListEntrega;
