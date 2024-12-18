import { IUser } from "@/app/model/VentaModel";
import { inactivarUsuario, obtenerUsuarios } from "@/app/service/UserService";
import { useAlert } from "@/app/utils/usAlert";
import {
  obtenerEstado,
  obtenerEstadoComponent,
  obtenerNombreDominio,
} from "@/app/utils/Utils";
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import EditUser from "../modal/EditUser";
import { BsXCircleFill } from "react-icons/bs";
import DetailsUsuario from "../modal/DetailsUsuario";

const ListUsuarios: React.FC = () => {
  const [idUsuario, setIdUsuario] = useState<number>(0);

  const [ListUsuarios, setListUsuarios] = useState<IUser[]>([]);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalView, setOpenModalView] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const { showAlert } = useAlert();

  useEffect(() => {
    const get = async () => {
      try {
        setListUsuarios(await obtenerUsuarios());
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setListUsuarios(await obtenerUsuarios());
    }, 1000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
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
            Ver Detalles del Usuario
          </div>
        </Modal.Header>
        <DetailsUsuario idCliente={idUsuario}/>
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
        show={openModalEdit}
        size={"4xl"}
        onClose={() => setOpenModalEdit(false)}
        className="slide-in-fwd-center"
      >
        <Modal.Header className="bg-[#F4EEF3] border-b-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="text-[#431A33] font-medium text-2xl">
            Actualizar Datos del Usuario
          </div>
        </Modal.Header>
        <EditUser idCliente={idUsuario} />
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
              ¿Esta seguro(a) de inactivar el usuario seleccionado?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={async () => {
                  try {
                    await inactivarUsuario(idUsuario);
                    setOpenModalDelete(false);
                    setIdUsuario(0);
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

      <div className="overflow-x-auto overflow-y-auto pb-24">
        <Table>
          <Table.Head>
            <Table.HeadCell className="text-center">
              Nombre de Usuario
            </Table.HeadCell>
            <Table.HeadCell className="text-center">
              Nombre Completo
            </Table.HeadCell>
            <Table.HeadCell className="text-center">
              Tipo de Identificación
            </Table.HeadCell>
            <Table.HeadCell className="text-center">
              Número de Identificación
            </Table.HeadCell>
            <Table.HeadCell className="text-center">
              Número de Contacto
            </Table.HeadCell>
            <Table.HeadCell className="text-center">Estado</Table.HeadCell>
            <Table.HeadCell className="text-center">
              <span className="sr-only">ver Detalles</span>
            </Table.HeadCell>
            <Table.HeadCell className="text-center">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell className="text-center">
              <span className="sr-only">Inactivar</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {ListUsuarios.map((item) => (
              <Table.Row
                className=" bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item.idUsuario}
              >
                <Table.Cell className="text-center px-1">
                  {item.username}
                </Table.Cell>
                <Table.Cell className="text-center px-1">
                  {item.persona.nombres +
                    " " +
                    item.persona.apellidoPaterno +
                    " " +
                    item.persona.apellidoMaterno}
                </Table.Cell>
                <Table.Cell className="text-center px-1">
                  {obtenerNombreDominio(item.persona.codTipoIdentificacion)}
                </Table.Cell>
                <Table.Cell className="text-center px-1">
                  {item.persona.numeroIdentificacion}
                </Table.Cell>
                <Table.Cell className="text-center px-1">
                  {item.persona.numeroContacto}
                </Table.Cell>
                <Table.Cell className="text-center px-1">
                  {obtenerEstadoComponent(item.codEstado)}
                </Table.Cell>
                <Table.Cell className="px-1 text-center text-nowrap pr-3">
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-700"
                    onClick={() => {
                      setIdUsuario(item.idUsuario);
                      setOpenModalView(true);
                    }}
                  >
                    Ver Detalles
                  </a>
                </Table.Cell>
                <Table.Cell className="px-1 text-center text-nowrap pr-3">
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-700"
                    onClick={() => {
                      setIdUsuario(item.idUsuario);
                      setOpenModalEdit(true);
                    }}
                  >
                    Editar
                  </a>
                </Table.Cell>
                <Table.Cell className="px-1 text-center text-nowrap pr-3">
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-700"
                    onClick={async () => {
                      setIdUsuario(item.idUsuario);
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

export default ListUsuarios;
