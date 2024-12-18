import { IDominioFijo } from "@/app/model/DominioModel";
import { ICategoria, IProveedor, ISaveProduct } from "@/app/model/ProductModel";
import { IResponseFile } from "@/app/model/UtilModel";
import { obtenerCategorias } from "@/app/service/CategoriaService";
import { obtenerDominioUnidadMedida } from "@/app/service/DominioService";
import { guardarProducto } from "@/app/service/ProductService";
import { obtenerProveedores } from "@/app/service/ProveedorService";
import { useAlert } from "@/app/utils/usAlert";
import { obtainApiUrl } from "@/app/utils/Utils";
import { getSession } from "@/auth/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button, FileInput, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFloppy2Fill, BsTrash3Fill } from "react-icons/bs";
import { HiXCircle } from "react-icons/hi2";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nombreProducto: Yup.string().required("El nombre del producto es requerido"),
  cantidadstock: Yup.string()
    .required("El stock es requerido")
    .matches(/^(0|[1-9]\d*)(\.\d+)?$/, "Introducir un número válido"),
  precioProducto: Yup.string()
    .required("El precio de venta es requerido")
    .matches(/^\d+(\.\d+)?$/, "Debe ser un número válido con o sin decimales"),
  descripcion: Yup.string().required("La descripcion es requerida"),
  costoProducto: Yup.string()
    .required("El precio de compra es requerido")
    .matches(/^\d+(\.\d+)?$/, "Debe ser un número válido con o sin decimales"),
//   codUnidadMedida: Yup.string()
//     .notOneOf(["", "default", "Debes seleccionar una opción válida"])
//     .required("Seleccionar una opción"),
  imagenReferencial: Yup.mixed().required("El archivo es obligatorio"),
  categoria: Yup.string()
    .notOneOf(["", "default", "Debes seleccionar una opción válida"])
    .required("Seleccionar una opción"),
  proveedor: Yup.string()
    .notOneOf(["", "default", "Debes seleccionar una opción válida"])
    .required("Seleccionar una opción"),
});

type TFormProducto = {
  nombreProducto: string;
  cantidadstock: string;
  precioProducto: string;
  descripcion: string;
  costoProducto: string;
//   codUnidadMedida: string;
  imagenReferencial?: File | null;
  categoria: string;
  proveedor: string;
};

const NewProduct: React.FC = () => {
  const [listCategorias, setListCategorias] = useState<ICategoria[]>([]);
  const [listProveedores, setListProveedores] = useState<IProveedor[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const { showAlert } = useAlert();

  useEffect(() => {
    const get = async () => {
      try {
        setListCategorias(await obtenerCategorias());
        setListProveedores(await obtenerProveedores());
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  // @ts-ignore
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TFormProducto>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues: {
      cantidadstock: "",
      categoria: "default",
    //   codUnidadMedida: "default",
      costoProducto: "",
      descripcion: "",
      imagenReferencial: null,
      nombreProducto: "",
      precioProducto: "",
      proveedor: "default",
    },
  });

  const handleFileChange = (file: File | null) => {
    setValue("imagenReferencial", file, { shouldValidate: true });
    setValue("imagenReferencial", file, { shouldValidate: true });
    setFile(file)
  };

  const onSubmit: SubmitHandler<TFormProducto> = async (data) => {
    if (data.imagenReferencial) setFile(data.imagenReferencial);

    const formData = new FormData();
    // @ts-ignore
    formData.append("file", file);
    try {
      const response = await axios.post<IResponseFile>(
        (await obtainApiUrl()) + "/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getSession().token,
          },
        }
      );
      showAlert("Success", "Datos guardados correctamente");
      if (response.status === 200) {
        let saveProd: ISaveProduct = {
          idProducto: null,
          cantidadStock: Number(data.cantidadstock),
        //   codUnidadMedida: data.codUnidadMedida,
          costoProducto: Number(data.costoProducto),
          descripcion: data.descripcion,
          idProveeedor: Number(data.proveedor),
          imagenReferencial: response.data.fileName,
          nombreProducto: data.nombreProducto,
          precioProducto: Number(data.precioProducto),
          idCategoria: Number(data.categoria),
        };

        const result = await guardarProducto(saveProd);
        if (result) {
          reset();
        }
      }
    } catch (error) {
      console.log(error);
      showAlert("Error", "Error en el guardado de datos");
    }
  };

  return (
    <form
      id="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full px-16 py-6 overflow-y-auto"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="nombreProducto" value="Nombre del Producto" />
          </div>
          <TextInput
            id="nombreProducto"
            type="text"
            placeholder="Introducir nombre del producto"
            autoComplete="off"
            {...register("nombreProducto")}
          />
          {errors.nombreProducto && (
            <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
              <HiXCircle size={20} />
              <p className="font-bold">Error: </p>
              <p className="font-normal">{errors.nombreProducto.message}</p>
            </div>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="cantidadStock" value="Stock disponible" />
          </div>
          <TextInput
            id="cantidadStock"
            type="text"
            placeholder="Introducir el stock disponible"
            autoComplete="off"
            {...register("cantidadstock")}
          />
          {errors.cantidadstock && (
            <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
              <HiXCircle size={20} />
              <p className="font-bold">Error: </p>
              <p className="font-normal">{errors.cantidadstock.message}</p>
            </div>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="precioProducto"
              value="Precio de venta del producto"
            />
          </div>
          <TextInput
            id="precioProducto"
            type="text"
            placeholder="Introducir el precio de venta del producto Ej. 19.99"
            autoComplete="off"
            {...register("precioProducto")}
          />
          {errors.precioProducto && (
            <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
              <HiXCircle size={20} />
              <p className="font-bold">Error: </p>
              <p className="font-normal">{errors.precioProducto.message}</p>
            </div>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="costoProducto"
              value="Precio de compra del producto"
            />
          </div>
          <TextInput
            id="costoProducto"
            type="text"
            placeholder="Introducir el precio de compra deel producto Ej. 15"
            autoComplete="off"
            {...register("costoProducto")}
          />
          {errors.costoProducto && (
            <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
              <HiXCircle size={20} />
              <p className="font-bold">Error: </p>
              <p className="font-normal">{errors.costoProducto.message}</p>
            </div>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="proveedor" value="Proveedor" />
          </div>
          <Select id="proveedor" {...register("proveedor")}>
            <option value={"default"} selected></option>
            {listProveedores.map((item) => (
              <option value={item.idProveedor}>{item.nombreProveedor}</option>
            ))}
          </Select>
          {errors.proveedor && (
            <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
              <HiXCircle size={20} />
              <p className="font-bold">Error: </p>
              <p className="font-normal">{errors.proveedor.message}</p>
            </div>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="categoria" value="Categoría" />
          </div>
          <Select id="categoria" {...register("categoria")}>
            <option value={"default"} selected></option>
            {listCategorias.map((item) => (
              <option value={item.idCategoria}>{item.nombreCategoria}</option>
            ))}
          </Select>
          {errors.categoria && (
            <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
              <HiXCircle size={20} />
              <p className="font-bold">Error: </p>
              <p className="font-normal">{errors.categoria.message}</p>
            </div>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="imagenReferencial" value="Seleccionar Imagen de Referencia" />
          </div>
          <FileInput
            id="imagenReferencial"
            onChange={(event) =>
              handleFileChange(
                event.target.files ? event.target.files[0] : null
              )
            }
          />
          {errors.imagenReferencial && (
            <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
              <HiXCircle size={20} />
              <p className="font-bold">Error: </p>
              <p className="font-normal">{errors.imagenReferencial.message}</p>
            </div>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="descripcion" value="Descripción del Producto" />
          </div>
          <Textarea
            id="descripcion"
            placeholder="Introducir la descripción del producto"
            rows={4}
            autoComplete="off"
            {...register("descripcion")}
          />
          {errors.descripcion && (
            <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
              <HiXCircle size={20} />
              <p className="font-bold">Error: </p>
              <p className="font-normal">{errors.descripcion.message}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row space-x-4">
      <Button type="submit">
            <div className="my-auto">Guardar</div>
            <div className="my-auto ml-3">
              <BsFloppy2Fill size={20} />
            </div>
          </Button>
          <Button color="gray">
            <div className="my-auto">Limpiar</div>
            <div className="my-auto ml-3">
              <BsTrash3Fill size={20} />
            </div>
          </Button>
          </div>
    </form>
  );
};

export default NewProduct;
