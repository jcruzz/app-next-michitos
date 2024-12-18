import { IProducto } from "@/app/model/ProductModel";
import { borrarProducto, obtenerProductos } from "@/app/service/ProductService";
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { BsCartPlusFill, BsFloppy2Fill, BsXCircleFill } from "react-icons/bs";
import DetailsProduct from "../modal/DetailsProduct";
import NewProduct from "../modal/NewProducto";
import { useAlert } from "@/app/utils/usAlert";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import EditProducto from "../modal/EditProduct";

const ListProductos: React.FC = () => {
  const [listProducts, setListProduct] = useState<IProducto[]>([]);

  const [idProducto, setIdProducto] = useState<number>(0);

  const [openModalView, setOpenModalView] = useState(false);

  const [openModalNew, setOpenModalNew] = useState(false);

  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const { showAlert } = useAlert();

  useEffect(() => {
    const get = async () => {
      try {
        setListProduct(await obtenerProductos());
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setListProduct(await obtenerProductos());
    }, 1000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return (
    <>
      <Modal
        show={openModalView}
        size={"7xl"}
        onClose={() => setOpenModalView(false)}
        className="slide-in-fwd-center"
      >
        <Modal.Header className="bg-[#F4EEF3] border-b-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="text-[#431A33] font-medium text-2xl">
            Ver Detalles del Producto
          </div>
        </Modal.Header>
        <DetailsProduct idProducto={idProducto} />
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
        size={"7xl"}
        onClose={() => setOpenModalEdit(false)}
        className="slide-in-fwd-center"
      >
        <Modal.Header className="bg-[#F4EEF3] border-b-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="text-[#431A33] font-medium text-2xl">
            Editar datos del Producto
          </div>
        </Modal.Header>
        <EditProducto idProducto={idProducto} />
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
        show={openModalNew}
        size={"7xl"}
        onClose={() => setOpenModalNew(false)}
        className="slide-in-fwd-center"
      >
        <Modal.Header className="bg-[#F4EEF3] border-b-4 border-[#C4B2AD] dark:border-b-4 dark:border-[#C4B2AD]">
          <div className="text-[#431A33] font-medium text-2xl">
            Registrar Nuevo Producto
          </div>
        </Modal.Header>
        <NewProduct />
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
              ¿Esta seguro(a) de eliminar el producto seleccionado?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={async () => {
                  try {
                    await borrarProducto(idProducto);
                    setOpenModalDelete(false);
                    setIdProducto(0);
                    showAlert("Success", "Registro borrado correctamente");
                  } catch (error) {
                    console.log(error);
                    showAlert("Error", "Error borrando el registro");
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
          Lista de Productos
        </div>
        <Button
          onClick={() => {
            setOpenModalNew(true);
          }}
        >
          <div className="my-auto">Registrar nuevo producto</div>
          <div className="my-auto ml-3">
            <BsCartPlusFill size={20} />
          </div>
        </Button>
      </div>
      <div className="w-64 border-2 mb-5 border-[#6DB26D]"></div>
      <div className="overflow-x-auto slide-in-fwd-center">
        <Table>
          <Table.Head className="text-center">
            <Table.HeadCell>Nombre Producto</Table.HeadCell>
            <Table.HeadCell>Stock</Table.HeadCell>
            <Table.HeadCell>Precio de Venta</Table.HeadCell>
            <Table.HeadCell>Precio de Compra</Table.HeadCell>
            <Table.HeadCell>Categoria</Table.HeadCell>
            <Table.HeadCell>Proveedor</Table.HeadCell>
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
            {listProducts.map((item, i) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item.idProducto}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.nombreProducto}
                </Table.Cell>
                <Table.Cell>{item.cantidadstock}</Table.Cell>
                <Table.Cell>Bs. {item.precioProducto}</Table.Cell>
                <Table.Cell>Bs. {item.costoProducto}</Table.Cell>
                <Table.Cell>{item.categoria.nombreCategoria}</Table.Cell>
                <Table.Cell>{item.proveedor?.nombreProveedor}</Table.Cell>
                {/* <Table.Cell>
                {format(parseISO(item.fecRegistro), "dd/MM/yyyy")}
              </Table.Cell> */}
                {/* <Table.Cell>{item.estado}</Table.Cell> */}
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => {
                      setIdProducto(item.idProducto);
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
                      setIdProducto(item.idProducto);
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
                      setIdProducto(item.idProducto);
                      setOpenModalDelete(true);
                    }}
                  >
                    Eliminar
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

export default ListProductos;
