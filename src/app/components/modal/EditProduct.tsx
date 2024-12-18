import { ICategoria, IProducto, IProveedor } from "@/app/model/ProductModel";
import { idProducto, IResponseFile } from "@/app/model/UtilModel";
import {
  obtenerCategoriaPorId,
  obtenerCategorias,
} from "@/app/service/CategoriaService";
import {
  actualizarProducto,
  obtenerProducto,
} from "@/app/service/ProductService";
import {
  obtenerProveedores,
  obtenerProveedorPorID,
} from "@/app/service/ProveedorService";
import { useAlert } from "@/app/utils/usAlert";
import { obtainApiUrl } from "@/app/utils/Utils";
import { getSession } from "@/auth/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  Button,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
  idProducto: number;
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

const EditProducto: React.FC<idProducto> = ({ idProducto }) => {
  const [defaultValues, setDefaultValues] = useState<TFormProducto | null>(
    null
  );
  const [listCategorias, setListCategorias] = useState<ICategoria[]>([]);
  const [listProveedores, setListProveedores] = useState<IProveedor[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TFormProducto>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues: {}, // Inicialmente vacío
  });

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

      if (response.status === 200) {
        const producto: IProducto = {
          cantidadstock: Number(data.cantidadstock),
          categoria: await obtenerCategoriaPorId(Number(data.categoria)),
          codUnidadMedida: "",
          costoProducto: Number(data.costoProducto),
          descripcion: data.descripcion.toString(),
          estado: "ACT",
          fecRegistro: "",
          idProducto: data.idProducto,
          imagenReferencial: response.data.fileName,
          nombreProducto: data.nombreProducto.toString(),
          precioProducto: Number(data.precioProducto),
          proveedor: await obtenerProveedorPorID(Number(data.proveedor)),
        };

        const result = await actualizarProducto(producto);

        if (result) {
          showAlert("Success", "Datos actualizados correctamente");
        }
      }
    } catch (error) {
      console.log(error);
      showAlert("Error", "Error en el guardado de datos");
    }
  };

  useEffect(() => {
    const get = async () => {
      try {
        setListCategorias(await obtenerCategorias());
        setListProveedores(await obtenerProveedores());
        const response = await obtenerProducto(idProducto);
        const formatForm: TFormProducto = {
          idProducto: response.idProducto,
          cantidadstock: response.cantidadstock.toString(),
          categoria: response.categoria.idCategoria.toString(),
          costoProducto: response.costoProducto.toString(),
          descripcion: response.descripcion.toString(),
          nombreProducto: response.nombreProducto.toString(),
          precioProducto: response.precioProducto.toString(),
          proveedor: response.proveedor.idProveedor.toString(),
          imagenReferencial: null,
        };
        setDefaultValues(formatForm);
        reset(formatForm);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

  if (!defaultValues) {
    return <div>Cargando...</div>;
  }

  const handleFileChange = (file: File | null) => {
    setValue("imagenReferencial", file, { shouldValidate: true });
    setValue("imagenReferencial", file, { shouldValidate: true });
    setFile(file);
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
          <Controller
            name="proveedor"
            control={control}
            render={({ field }) => (
              <Select
                id="proveedor"
                {...field}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  field.onChange(selectedId);
                }}
              >
                <option value=""></option>
                {listProveedores.map((item) => (
                  <option key={item.idProveedor} value={item.idProveedor}>
                    {item.nombreProveedor}
                  </option>
                ))}
              </Select>
            )}
          />

          {errors.proveedor && (
            <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
              <HiXCircle size={20} />
              <p className="font-bold">Error: </p>
              <p className="font-normal">{errors.proveedor.message}</p>
            </div>
          )}
        </div>
        {/* <div>
            <div className="mb-2 block">
              <Label htmlFor="codUnidadMedida" value="Unidad de Medida" />
            </div>
            <Select id="codUnidadMedida" {...register("codUnidadMedida")}>
              <option value={"default"} selected></option>
              {listDominioFijo.map((item) => (
                <option value={item.codDominio}>{item.nombreDominio}</option>
              ))}
            </Select>
            {errors.codUnidadMedida && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">{errors.codUnidadMedida.message}</p>
              </div>
            )}
          </div> */}
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
            <Label htmlFor="imagenReferencial" value="Stock disponible" />
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

export default EditProducto;
