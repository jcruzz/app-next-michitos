import { idCliente } from "@/app/model/UtilModel";
import { IVenta } from "@/app/model/VentaModel";
import { obtenerVenta } from "@/app/service/VentaService";
import { obtenerNombreDominio } from "@/app/utils/Utils";
import { useEffect, useState } from "react";

const ViewDetailsVenta: React.FC<idCliente> = ({ idCliente }) => {
  const [venta, setVenta] = useState<IVenta | null>(null);

  useEffect(() => {
    const get = async () => {
      if (!idCliente) return;

      try {
        const data = await obtenerVenta(idCliente);
        setVenta(data);
      } catch (error) {
        console.error("Error al obtener la venta:", error);
      }
    };
    get();
  }, [idCliente]);

  return (

    <div className="mx-auto rounded-md p-6">


      {/* Información del Cliente */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Información del Cliente
        </h2>
        <div className="mt-2">
          <p>
            <span className="font-semibold">Nombre:</span>{" "}
            {venta?.cliente.persona.nombres}{" "}
            {venta?.cliente.persona.apellidoPaterno}
          </p>
          <p>
            <span className="font-semibold">Contacto:</span>{" "}
            {venta?.cliente.persona.numeroContacto}
          </p>
          <p>
            <span className="font-semibold">Dirección:</span>{" "}
            {venta?.cliente.persona.direccion}
          </p>
          <p>
            <span className="font-semibold">Documento:</span>{" "}
            {venta?.cliente.persona.numeroIdentificacion}
          </p>
        </div>
      </div>

      {/* Información de la Venta */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Información de la Venta
        </h2>
        <div className="mt-2">
          <p>
            <span className="font-semibold">Número de Comprobante:</span>{" "}
            {venta?.numComprobante}
          </p>
          <p>
            <span className="font-semibold">Método de Pago:</span>{" "}
            {obtenerNombreDominio(venta?.codMetodoPago ?? "")}
          </p>
          <p>
            <span className="font-semibold">Tipo de Venta:</span>{" "}
            {obtenerNombreDominio(venta?.codTipoVenta ?? "")}
          </p>
          <p>
            <span className="font-semibold">Fecha:</span>{" "}
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Detalle de Productos */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Detalle de Productos
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Producto
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Cantidad
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Precio Unitario
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {venta?.detalles.map((detalle: any, index: number) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {detalle.producto.nombreProducto}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {detalle.cantidad}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    Bs. {detalle.producto.precioProducto.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    Bs. 
                    {(
                      detalle.cantidad * detalle.producto.precioProducto
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center text-lg font-bold border-t pt-4 mt-6">
        <span>Total:</span>
        <span>Bs. {venta?.total.toFixed(2)}</span>
      </div>

    </div>

  );
};

export default ViewDetailsVenta;
