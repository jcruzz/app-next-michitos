import { IDominioFijo } from "@/app/model/DominioModel";
import { IEntregav2 } from "@/app/model/IEntregaModel";
import { IProducto } from "@/app/model/ProductModel";
import { IUserRepartidor } from "@/app/model/UserModel";
import { ICliente, IDetalleVenta, IUser, IVenta } from "@/app/model/VentaModel";
import {
  obtenerCliente,
  obtenerClienteActivos,
  obtenerClienteById,
} from "@/app/service/ClienteService";
import {
  obtenerDominioMetodoPago,
  obtenerTipoVenta,
} from "@/app/service/DominioService";
import { guardarEntrega } from "@/app/service/EntregaService";
import {
  actualizarProducto,
  obtenerProducto,
  obtenerProductos,
} from "@/app/service/ProductService";
import { obtenerProveedorPorID } from "@/app/service/ProveedorService";
import {
  obtenerDatosUsuario,
  obtenerRepartidores,
  obtenerUsuarioPorId,
  obtenerUsuarios,
} from "@/app/service/UserService";
import { guardarVenta } from "@/app/service/VentaService";
import { useAlert } from "@/app/utils/usAlert";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiOutlineExclamationCircle, HiOutlinePrinter } from "react-icons/hi2";
import Comprobante from "../comprobante/Comprobante";
import dynamic from "next/dynamic";

const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  { ssr: false }
);

interface DetalleVenta {
  nombreProducto: string;
  producto: string;
  cantidad: number;
  precio: number;
}

const NewVenta: React.FC = () => {
  const [idVenta, setIdVenta] = useState<number>(0);

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [productoUni, setProductoUni] = useState<IProducto>();

  const [detalles, setDetalles] = useState<DetalleVenta[]>([]);
  const [nuevoDetalle, setNuevoDetalle] = useState<DetalleVenta>({
    nombreProducto: "",
    producto: "",
    cantidad: 0,
    precio: 0,
  });

  const checkRepartidor = useRef<HTMLInputElement>(null);

  const handleCheckRepartidor = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setDisableRepartidor(false);
    } else {
      setDisableRepartidor(true);
      setRepartidorOption("");
    }
  };

  const [cliente, setClientes] = useState<ICliente[]>([]);
  const [tipoPago, setTipoPago] = useState<IDominioFijo[]>([]);
  const [tipoVenta, setTipoVenta] = useState<IDominioFijo[]>([]);
  const [producto, setProducto] = useState<IProducto[]>([]);
  const [repartidores, setRepartidores] = useState<IUserRepartidor[]>([]);

  const [disableRepartidor, setDisableRepartidor] = useState<boolean>(true);

  const { showAlert } = useAlert();

  const [repartidorOption, setRepartidorOption] = useState<string>("");

  const handleSelectChangeRepartidor = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value; // Obtiene el valor seleccionado
    setRepartidorOption(selectedValue);
  };

  const [optionCliente, setOptionCliente] = useState<string>("");

  const handleSelectChangeCliente = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value; // Obtiene el valor seleccionado
    setOptionCliente(selectedValue);
  };

  const [tipoVentaOption, setTipoVentaOption] = useState<string>("");

  const handleSelectChangeTipoVenta = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value; // Obtiene el valor seleccionado
    setTipoVentaOption(selectedValue);
  };

  const [tipPagoOption, setTipPagoOption] = useState<string>("");

  const handleSelectChangeTipoPago = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value; // Obtiene el valor seleccionado
    setTipPagoOption(selectedValue);
  };

  useEffect(() => {
    const get = async () => {
      try {
        setClientes(await obtenerClienteActivos());
        setTipoPago(await obtenerDominioMetodoPago());
        setTipoVenta(await obtenerTipoVenta());
        setProducto(await obtenerProductos());
        setRepartidores(await obtenerRepartidores());
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  const agregarDetalle = () => {
    let cantidadStock = productoUni?.cantidadstock ?? 0;

    if (Number(nuevoDetalle.cantidad) > cantidadStock) {
      alert("No hay stock disponible");
      return;
    }

    if (
      !nuevoDetalle.producto ||
      nuevoDetalle.cantidad <= 0 ||
      nuevoDetalle.precio <= 0
    ) {
      alert("Todos los campos son obligatorios y deben tener valores válidos.");
      return;
    }
    setDetalles([...detalles, nuevoDetalle]);
    setNuevoDetalle({
      nombreProducto: "",
      producto: "",
      cantidad: 1,
      precio: 0,
    });
  };

  const eliminarDetalle = (index: number) => {
    const nuevosDetalles = detalles.filter((_, i) => i !== index);
    setDetalles(nuevosDetalles);
  };

  const totalVenta = detalles.reduce(
    (total, detalle) => total + detalle.cantidad * detalle.precio,
    0
  );

  const submitForm = async () => {
    try {
      let detallesLista: IDetalleVenta[] = [];

      for (let i = 0; i < detalles.length; i++) {
        const producto = await obtenerProducto(Number(detalles[i].producto));

        let det: IDetalleVenta = {
          cantidad: detalles[i].cantidad,
          codEstado: "ACT",
          fecRegistro: "",
          precioVenta: detalles[i].precio,
          producto: producto,
        };
        detallesLista.push(det);
        producto.cantidadstock = producto.cantidadstock - detalles[i].cantidad;
        await actualizarProducto(producto);
      }

      const venta: IVenta = {
        idVenta: null,
        cliente: await obtenerClienteById(Number(optionCliente)),
        codMetodoPago: tipPagoOption,
        codTipoVenta: tipoVentaOption,
        detalles: detallesLista,
        estado: "ACT",
        fecRegistro: "",
        numComprobante: Math.floor(100000 + Math.random() * 900000),
        total: Number(totalVenta.toFixed(2)),
        user: await obtenerDatosUsuario(),
      };

      const resp = await guardarVenta(venta);

      setIdVenta(resp.idVenta ?? 0);

      if (checkRepartidor.current?.checked) {
        const entrega: IEntregav2 = {
          codEstado: "",
          fecRegistro: "",
          idEntrega: null,
          repartidor: await obtenerUsuarioPorId(Number(repartidorOption)),
          venta: resp,
        };

        await guardarEntrega(entrega);
      }

      showAlert("Success", "Registro guardado correctamente");
      setOpenModalDelete(true);
    } catch (error) {
      console.log(error);

      showAlert("Error", "Error al guardar el registro");
    }
  };

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

      <div className="p-6 bg-[#F4EEF3]">
        <div className="max-w-4xl mx-auto">
          <div className="px-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2 dark:text-gray-800">
              Datos de la Venta
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label
                  htmlFor="cliente"
                  value="Cliente"
                  className="dark:text-gray-800"
                />
                <Select
                  id="cliente"
                  className="col-span-2"
                  onChange={handleSelectChangeCliente}
                  value={optionCliente}
                >
                  <option value={"default"} selected></option>
                  {cliente.map((item) => (
                    <option value={item.idCliente ?? ""}>
                      {item.persona.nombres +
                        " " +
                        item.persona.apellidoPaterno +
                        " " +
                        item.persona.apellidoMaterno +
                        " " +
                        item.persona.codTipoIdentificacion +
                        " " +
                        item.persona.numeroIdentificacion}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="tipoVenta"
                  value="Tipo de Venta"
                  className="dark:text-gray-800"
                />
                <Select
                  id="tipoVenta"
                  className="col-span-2"
                  onChange={handleSelectChangeTipoVenta}
                  value={tipoVentaOption}
                >
                  <option value={"default"} selected></option>
                  {tipoVenta.map((item) => (
                    <option value={item.codDominio}>
                      {item.nombreDominio}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="tipoPago"
                  value="Método de Pago"
                  className="dark:text-gray-800"
                />
                <Select
                  id="tipoPago"
                  className="col-span-2"
                  onChange={handleSelectChangeTipoPago}
                  value={tipPagoOption}
                >
                  <option value={"default"} selected></option>
                  {tipoPago.map((item) => (
                    <option value={item.codDominio}>
                      {item.nombreDominio}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="tipoPago"
                  value="Repartidor"
                  className="dark:text-gray-800"
                />
                <Select
                  id="repartidorId"
                  className="col-span-2"
                  onChange={handleSelectChangeRepartidor}
                  value={repartidorOption}
                  disabled={disableRepartidor}
                >
                  <option value={"default"} selected></option>
                  {repartidores.map((item) => (
                    <option value={item.idUsuario}>
                      {item.nombreCompleto}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="my-auto">
                <Label
                  htmlFor="tipoPago"
                  value="¿Requiere Entrega?"
                  className="dark:text-gray-800 pr-4"
                />
                <Checkbox
                  ref={checkRepartidor}
                  onChange={(e) => handleCheckRepartidor(e)}
                />
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {/* Detalle nuevo */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2 dark:text-gray-800">
                Agregar Detalle
              </h3>
              <div className="grid grid-cols-4 gap-4 items-center">
                {/* <TextInput
                id="nombreProducto"
                type="text"
                placeholder="Producto o servicio"
                autoComplete="off"
                className="col-span-2"
                onChange={(e) =>
                  setNuevoDetalle({ ...nuevoDetalle, producto: e.target.value })
                }
              /> */}
                <Select
                  id="nombreProducto"
                  className="col-span-2"
                  onChange={async (e) => {
                    const resp = await obtenerProducto(Number(e.target.value));
                    setProductoUni(resp);
                    setNuevoDetalle({
                      ...nuevoDetalle,
                      producto: e.target.value,
                      precio: resp.precioProducto,
                      nombreProducto: resp.nombreProducto,
                    });
                  }}
                >
                  <option value={"default"} selected></option>
                  {producto.map((item) => (
                    <option value={item.idProducto}>
                      {item.nombreProducto}
                    </option>
                  ))}
                </Select>
                <div className="flex flex-col">
                  <TextInput
                    id="cantidad"
                    type="text"
                    placeholder="Cantidad"
                    autoComplete="off"
                    helperText={
                      <>
                        <span className="font-medium">Stock Disponible: </span>{" "}
                        {productoUni?.cantidadstock}
                      </>
                    }
                    onChange={(e) =>
                      setNuevoDetalle({
                        ...nuevoDetalle,
                        cantidad: +e.target.value,
                      })
                    }
                  />
                </div>
                <TextInput
                  id="precioProducto"
                  readOnly
                  type="text"
                  placeholder="Precio"
                  autoComplete="off"
                  value={productoUni?.precioProducto}
                  // onChange={(e) =>
                  //   setNuevoDetalle({ ...nuevoDetalle, precio: +e.target.value })
                  // }
                />
              </div>
              <Button
                onClick={agregarDetalle}
                className="mt-4 w-full rounded-md shadow-md transition"
              >
                Agregar al detalle
              </Button>
            </div>

            {/* Lista de detalles */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2 dark:text-gray-800">
                Detalles de la Venta
              </h3>
              {detalles.length === 0 ? (
                <p className="text-gray-500">No hay detalles añadidos.</p>
              ) : (
                <table className="w-full text-left border border-gray-200 dark:text-white">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-600">
                      <th className="px-4 py-2">Producto</th>
                      <th className="px-4 py-2">Cantidad</th>
                      <th className="px-4 py-2">Precio</th>
                      <th className="px-4 py-2">Subtotal</th>
                      <th className="px-4 py-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalles.map((detalle, index) => (
                      <tr key={index} className="border-t dark:text-gray-800">
                        <td className="px-4 py-2">{detalle.nombreProducto}</td>
                        <td className="px-4 py-2">{detalle.cantidad}</td>
                        <td className="px-4 py-2">
                          {detalle.precio.toFixed(2)}
                        </td>
                        <td className="px-4 py-2">
                          {(detalle.cantidad * detalle.precio).toFixed(2)}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => eliminarDetalle(index)}
                            className="text-red-500 hover:underline"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Total de la venta */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-800">
                Total: {totalVenta.toFixed(2)}
              </h3>
              <button
                onClick={() => {
                  submitForm();
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition"
              >
                Registrar Venta
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewVenta;
