import { IProducto } from "@/app/model/ProductModel";
import { idProducto } from "@/app/model/UtilModel";
import { obtenerProducto } from "@/app/service/ProductService";
import { obtainApiUrl } from "@/app/utils/Utils";
import axios from "axios";
import { useEffect, useState } from "react";

const DetailsProduct: React.FC<idProducto> = ({ idProducto }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [producto, setProducto] = useState<IProducto | null>(null);

  useEffect(() => {
    const get = async () => {
      try {
        const respProducto = await obtenerProducto(idProducto);
        setProducto(respProducto);
        const response = await axios.get(
          (await obtainApiUrl()) +
            "/api/files/" +
            respProducto.imagenReferencial,
          { responseType: "blob" }
        );

        const url = URL.createObjectURL(response.data);
        setImageUrl(url);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden overflow-y-auto bg-[#F4EEF3]">
      <div className="container py-7 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h1 className="text-[#431A33] text-3xl title-font font-medium mb-4 dark:text-[#431A33]">
              {producto?.nombreProducto}
            </h1>
            <div className="border-4 border-[#C4B2AD] rounded-2xl px-5">
            <div className="flex mb-4">
              <a className="flex-grow text-[#A67375] border-b-2 border-[#A67375] py-2 text-lg px-1 dark:text-[#431A33] font-medium">
                Descripción
              </a>
            </div>
            <p className="text-base mb-4 dark:text-[#431A33] text-[#A67375]">
              {producto?.descripcion}
            </p>
            <div className="flex border-t-2 border-[#A67375] py-2 dark:text-[#431A33]">
              <span className="dark:text-[#431A33] text-[#A67375] text-lg font-medium px-1">
                Precio de Compra
              </span>
              <span className="ml-auto text-[#A67375] dark:text-[#A67375] font-medium">
                Bs. {producto?.costoProducto}
              </span>
            </div>
            <div className="flex border-t-2 border-[#A67375] py-2 dark:text-[#431A33]">
              <span className="dark:text-[#431A33] text-[#A67375] text-lg font-medium px-1">
                Precio de Venta
              </span>
              <span className="ml-auto text-[#A67375] dark:text-[#A67375] font-medium">
                Bs. {producto?.precioProducto}
              </span>
            </div>
            <div className="flex border-t-2 border-b-2 mb-6 border-[#A67375] py-2 dark:text-[#431A33]">
              <span className="dark:text-[#431A33] text-[#A67375] text-lg font-medium px-1">
                Cantidad en almacén
              </span>
              <span className="ml-auto text-[#A67375] dark:text-[#A67375] font-medium">
                {producto?.cantidadstock} unidades
              </span>
            </div>
          </div>
          </div>
          {imageUrl ? (
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-2xl border-4 border-[#A67375]"
              src={imageUrl}
            ></img>
          ) : (
            <p>Cargando imagen...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailsProduct;
