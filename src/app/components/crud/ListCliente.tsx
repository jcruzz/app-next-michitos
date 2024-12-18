import { ICliente } from "@/app/model/VentaModel";
import { borrarCliente, obtenerCliente } from "@/app/service/ClienteService";
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import NewCliente from "../modal/NewCliente";
import { BsXCircleFill } from "react-icons/bs";
import { obtenerEstadoComponent, obtenerNombreDominio } from "@/app/utils/Utils";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { useAlert } from "@/app/utils/usAlert";
import DetailsCliente from "../modal/DetailsCliente";
import EditCliente from "../modal/EditCliente";

const ListCliente: React.FC = () => {
  const [listCliente, setListCliente] = useState<ICliente[]>([]);
  const [idCliente, setIdCliente] = useState<number>(0);
  const [openModalNew, setOpenModalNew] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalView, setOpenModalView] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const { showAlert } = useAlert();

  useEffect(() => {
    const get = async () => {
      try {
        setListCliente(await obtenerCliente());
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setListCliente(await obtenerCliente());
    }, 1000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return (
    <>
      <Modal
        show={openModalEdit}
        size={"4xl"}
        onClose={() => setOpenModalEdit(false)}
        className="slide-in-fwd-center"
      >
        <Modal.Header className="bg-[#F4EEF3] border-b-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="text-[#431A33] font-medium text-2xl">
            Ver Detalles del Cliente
          </div>
        </Modal.Header>
        <EditCliente idCliente={idCliente}/>
        <Modal.Footer className="footer-bg bg-[#F4EEF3] border-t-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="mx-auto py-4">
            <Button type="button" onClick={() => setOpenModalEdit(false)}>
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
        <DetailsCliente idCliente={idCliente}/>
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

      <Modal
        show={openModalNew}
        size={"7xl"}
        onClose={() => setOpenModalNew(false)}
        className="slide-in-fwd-center"
      >
        <Modal.Header className="bg-[#F4EEF3] border-b-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="text-[#431A33] font-medium text-2xl">
            Agregar Nuevo Cliente
          </div>
        </Modal.Header>
        <NewCliente />
        <Modal.Footer className="footer-bg bg-[#F4EEF3] border-t-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="mx-auto py-4">
            <Button type="button" onClick={() => setOpenModalNew(false)}>
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
              ¿Esta seguro(a) de inactivar el cliente seleccionado?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={async () => {
                  try {
                    await borrarCliente(idCliente);
                    setOpenModalDelete(false);
                    setIdCliente(0);
                    showAlert("Success", "Registro inactivando correctamente");
                  } catch (error) {
                    console.log(error);
                    showAlert("Error", "Error inactivando el registro");
                  }
                }}
              >
                Si, estoy seguro
              </Button>
              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="flex flex-row justify-between">
        <div className="text-gray-700 text-2xl font-semibold dark:text-gray-300 mb-1">
          Lista de Clientes
        </div>
        <Button
          onClick={() => {
            setOpenModalNew(true);
          }}
        >
          <div className="my-auto">Registrar nuevo Cliente</div>
          <div className="my-auto ml-3">
            <HiUserAdd size={20} />
          </div>
        </Button>
      </div>
      <div className="w-64 border-2 mb-5 border-[#6DB26D]"></div>
      <div className="overflow-x-auto slide-in-fwd-center">
        <Table>
          <Table.Head className="text-center">
            <Table.HeadCell>Nombre Cliente</Table.HeadCell>
            <Table.HeadCell>Apellidos</Table.HeadCell>
            <Table.HeadCell>Dirección</Table.HeadCell>
            <Table.HeadCell>Tipo de Identificación</Table.HeadCell>
            <Table.HeadCell>Número de Identificación</Table.HeadCell>
            <Table.HeadCell>Número de Contacto</Table.HeadCell>
            <Table.HeadCell>Estado</Table.HeadCell>
            {/* <Table.HeadCell>Fecha</Table.HeadCell> */}
            {/* <Table.HeadCell>Estado</Table.HeadCell> */}
            <Table.HeadCell>
              <span className="sr-only">Ver detalle</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y text-center">
            {listCliente.map((item, i) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item.idCliente}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.persona.nombres}
                </Table.Cell>
                <Table.Cell>
                  {item.persona.apellidoPaterno +
                    " " +
                    item.persona.apellidoMaterno}
                </Table.Cell>
                <Table.Cell>{item.persona.direccion}</Table.Cell>
                <Table.Cell>{obtenerNombreDominio(item.persona.codTipoIdentificacion)}</Table.Cell>
                <Table.Cell>{item.persona.numeroIdentificacion}</Table.Cell>
                <Table.Cell>{item.persona.numeroContacto}</Table.Cell>
                <Table.Cell>
                  {obtenerEstadoComponent(item.codEstado)}
                </Table.Cell>
                {/* <Table.Cell>
                {format(parseISO(item.fecRegistro), "dd/MM/yyyy")}
              </Table.Cell> */}
                {/* <Table.Cell>{item.estado}</Table.Cell> */}
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => {
                      if (item.idCliente) setIdCliente(item.idCliente);
                        setOpenModalView(true);
                    }}
                  >
                    Ver detalles
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => {
                      if (item.idCliente) setIdCliente(item.idCliente);
                      setOpenModalEdit(true);
                    }}
                  >
                    Editar
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={async () => {
                      if (item.idCliente) setIdCliente(item.idCliente);
                      setOpenModalDelete(true);
                    }}
                  >
                    Inactivar
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

export default ListCliente;
