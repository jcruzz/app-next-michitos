import { IDominioFijo } from "@/app/model/DominioModel";
import { idCliente } from "@/app/model/UtilModel";
import { ICliente, IPersona } from "@/app/model/VentaModel";
import { actualizarCliente, obtenerClienteById } from "@/app/service/ClienteService";
import { obtenerEstadoCivil, obtenerTipoIdentificacion } from "@/app/service/DominioService";
import { useAlert } from "@/app/utils/usAlert";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFloppy2Fill, BsTrash3Fill } from "react-icons/bs";
import { HiXCircle } from "react-icons/hi2";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    nombres: Yup.string().required("El nombre es requerido"),
    apellidoPaterno: Yup.string().required("El apellido paterno es requerido"),
    apellidoMaterno: Yup.string(),
    apellidoCasada: Yup.string().optional().nullable(),
    direccion: Yup.string().required("La dirección es requerida"),
    coordenadaX: Yup.string()
      .optional()
      .matches(
        /^[-+]?((1[0-7]\d|[1-9]?\d)(\.\d+)?|180(\.0+)?)$/,
        "La coordenada X debe estar en el rango -180 a 180"
      )
      .nullable(),
    coordenadaY: Yup.string()
      .optional()
      .matches(
        /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
        "La coordenada Y debe estar en el rango -180 a 180"
      )
      .nullable(),
    codEstadoCivil: Yup.string()
      .notOneOf(["", "default", "Debe seleccionar una opción válida"])
      .required("Seleccionar una opción"),
    codTipoIdentificacion: Yup.string()
      .notOneOf(["", "default", "Debe seleccionar una opción válida"])
      .required("Seleccionar una opción"),
    numeroIdentificacion: Yup.string()
      .required("El número de identificación es requerido")
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, "Introducir un número válido"),
    numeroContacto: Yup.string()
      .required("El número de contacto es requerido")
      .matches(/^(0|[1-9]\d*)(\.\d+)?$/, "Introducir un número válido")
  });

  type TFormCliente = {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    apellidoCasada: string;
    direccion: string;
    coordenadaX?: string | null;
    coordenadaY?: string | null;
    codEstadoCivil: string;
    codTipoIdentificacion: string;
    numeroIdentificacion: string;
    numeroContacto: string;
  };

const EditCliente: React.FC<idCliente> = ({ idCliente }) => {

    const [defaultValues, setDefaultValues] = useState<TFormCliente | null>(
        null
      );

    const { showAlert } = useAlert()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<TFormCliente>({
        // @ts-ignore
        resolver: yupResolver(validationSchema),
        defaultValues: {}, // Inicialmente vacío
      });

      const [listTipoIdentificacion, setListTipoIdentificacion] = useState<
      IDominioFijo[]
    >([]);
    const [listEstadoCivil, setListEstadoCivil] = useState<IDominioFijo[]>([]);
    const [cliente, setCliente] = useState<ICliente | null>(null)

    useEffect(() => {
      const get = async () => {
        try {
          setListTipoIdentificacion(await obtenerTipoIdentificacion());
          setListEstadoCivil(await obtenerEstadoCivil());

          const response = await obtenerClienteById(idCliente)

          setCliente(response)

          const formatForm: TFormCliente = {
            apellidoCasada: response.persona.apellidoCasada,
            apellidoMaterno: response.persona.apellidoMaterno,
            apellidoPaterno: response.persona.apellidoPaterno,
            codEstadoCivil: response.persona.codEstadoCivil,
            codTipoIdentificacion: response.persona.codTipoIdentificacion,
            direccion: response.persona.direccion,
            nombres: response.persona.nombres,
            numeroContacto: response.persona.numeroContacto,
            numeroIdentificacion: response.persona.numeroIdentificacion,
            coordenadaX: response.persona.coordenadaX,
            coordenadaY: response.persona.coordenadaY
          }

            setDefaultValues(formatForm)
            reset(formatForm);
        } catch (error) {
          console.log(error);
        }
      };
      get();
    }, []);
    

    const onSubmit: SubmitHandler<TFormCliente> = async (data) => {
        let persona: IPersona = {
          apellidoCasada: data.apellidoCasada,
          apellidoMaterno: data.apellidoMaterno,
          apellidoPaterno: data.apellidoPaterno,
          codEstado: cliente?.persona.codEstado ?? "",
          codEstadoCivil: data.codEstadoCivil,
          codTipoIdentificacion: data.codTipoIdentificacion,
          coordenadaX: data.coordenadaX,
          coordenadaY: data.coordenadaY,
          direccion: data.direccion,
          fecRegistro: cliente?.persona.fecRegistro ?? "",
          idPersona: cliente?.persona.idPersona ?? 0,
          nombres: data.nombres,
          numeroContacto: data.numeroContacto,
          numeroIdentificacion: data.numeroIdentificacion,
        };
    
        let saveCliente: ICliente = {
            codEstado: cliente?.codEstado ?? "",
            fecRegistro: cliente?.fecRegistro ?? "",
            idCliente: cliente?.idCliente,
            persona: persona
        };
    
        try {
          const response = await actualizarCliente(saveCliente);
          if (response.idCliente) {
            showAlert("Success", "Registro guardado correctamente");
          }
        } catch (error) {
          console.log(error);
          showAlert("Error", "Error al guardar el registro");
        }
      }; 

      return (
        <form
        id="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full px-16 py-6 overflow-y-auto bg-[#F4EEF3]"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="nombres"
                value="Nombres"
                className="dark:text-gray-600"
              />
            </div>
            <TextInput
              id="nombres"
              type="text"
              placeholder="Introducir el nombre del cliente"
              autoComplete="off"
              {...register("nombres")}
            />
            {errors.nombres && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">{errors.nombres.message}</p>
              </div>
            )}
          </div>
  
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="apellidoPaterno"
                value="Apellido Paterno"
                className="dark:text-gray-600"
              />
            </div>
            <TextInput
              id="apellidoPaterno"
              type="text"
              placeholder="Introducir el apellido paterno"
              autoComplete="off"
              {...register("apellidoPaterno")}
            />
            {errors.apellidoPaterno && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">{errors.apellidoPaterno.message}</p>
              </div>
            )}
          </div>
  
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="apellidoMaterno"
                value="Apellido Materno"
                className="dark:text-gray-600"
              />
            </div>
            <TextInput
              id="apellidoMaterno"
              type="text"
              placeholder="Introducir el apellido materno"
              autoComplete="off"
              {...register("apellidoMaterno")}
            />
            {errors.apellidoMaterno && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">{errors.apellidoMaterno.message}</p>
              </div>
            )}
          </div>
  
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="apellidoCasada"
                value="Apellido de Casada"
                className="dark:text-gray-600"
              />
            </div>
            <TextInput
              id="apellidoCasada"
              type="text"
              placeholder="Introducir el apellido de casada"
              autoComplete="off"
              {...register("apellidoCasada")}
            />
            {errors.apellidoCasada && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">{errors.apellidoCasada.message}</p>
              </div>
            )}
          </div>
  
          <div>
            <div className="mb-2 block">
              <Label
                className="dark:text-gray-600"
                htmlFor="codTipoIdentificacion"
                value="Tipo de Identificación"
              />
            </div>
            <Select
              id="codTipoIdentificacion"
              {...register("codTipoIdentificacion")}
            >
              <option value={"default"} selected>
                Seleccionar Tipo de Identificación
              </option>
              {listTipoIdentificacion.map((item) => (
                <option value={item.codDominio}>{item.nombreDominio}</option>
              ))}
            </Select>
            {errors.codTipoIdentificacion && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">
                  {errors.codTipoIdentificacion.message}
                </p>
              </div>
            )}
          </div>
  
          <div>
            <div className="mb-2 block">
              <Label
                className="dark:text-gray-600"
                htmlFor="numeroIdentificacion"
                value="Número de Identificación"
              />
            </div>
            <TextInput
              id="numeroIdentificacion"
              type="text"
              placeholder="Introducir el número de identificación"
              autoComplete="off"
              {...register("numeroIdentificacion")}
            />
            {errors.numeroIdentificacion && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">
                  {errors.numeroIdentificacion.message}
                </p>
              </div>
            )}
          </div>
  
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="estado"
                value="Estado Civil"
                className="dark:text-gray-600"
              />
            </div>
            <Select id="codEstadoCivil" {...register("codEstadoCivil")}>
              <option value={"default"} selected>
                Seleccionar Estado Civil
              </option>
              {listEstadoCivil.map((item) => (
                <option value={item.codDominio}>{item.nombreDominio}</option>
              ))}
            </Select>
            {errors.codEstadoCivil && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">{errors.codEstadoCivil.message}</p>
              </div>
            )}
          </div>
  
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="direccion"
                value="Dirección de Vivienda"
                className="dark:text-gray-600"
              />
            </div>
            <TextInput
              id="direccion"
              type="text"
              placeholder="Introducir la dirección de la vivienda"
              autoComplete="off"
              {...register("direccion")}
            />
            {errors.direccion && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">{errors.direccion.message}</p>
              </div>
            )}
          </div>
  
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="coordenadaX"
                value="Coordenada X"
                className="dark:text-gray-600"
              />
            </div>
            <TextInput
              id="coordenadaX"
              type="text"
              placeholder="Introducir la coordenada x"
              autoComplete="off"
              {...register("coordenadaX")}
            />
            {errors.coordenadaX && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">{errors.coordenadaX.message}</p>
              </div>
            )}
          </div>
  
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="coordenadaY"
                value="Coordenada Y"
                className="dark:text-gray-600"
              />
            </div>
            <TextInput
              id="coordenadaY"
              type="text"
              placeholder="Introducir la coordenada y"
              autoComplete="off"
              {...register("coordenadaY")}
            />
            {errors.coordenadaY && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">{errors.coordenadaY.message}</p>
              </div>
            )}
          </div>
  
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="numeroContacto"
                value="Contacto Telefónico"
                className="dark:text-gray-600"
              />
            </div>
            <TextInput
              id="numeroContacto"
              type="text"
              placeholder="Introducir un contacto telefónico"
              autoComplete="off"
              {...register("numeroContacto")}
            />
            {errors.numeroContacto && (
              <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
                <HiXCircle size={20} />
                <p className="font-bold">Error: </p>
                <p className="font-normal">{errors.numeroContacto.message}</p>
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
          <Button color="gray" onClick={() => reset()}>
            <div className="my-auto">Limpiar</div>
            <div className="my-auto ml-3">
              <BsTrash3Fill size={20} />
            </div>
          </Button>
        </div>
      </form>
      )
}

export default EditCliente