import { IDominioFijo } from "@/app/model/DominioModel";
import {
  obtenerEstadoCivil,
  obtenerRoles,
  obtenerTipoIdentificacion,
} from "@/app/service/DominioService";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFloppy2Fill, BsTrash3Fill } from "react-icons/bs";
import { HiXCircle } from "react-icons/hi2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IRol } from "@/app/model/VentaModel";
import { formatNameRol, formatRol } from "@/app/utils/Utils";
import { IUserSingUp } from "@/app/model/UserModel";
import { IPersona } from "@/app/model/ClienteModel";
import { useAlert } from "@/app/utils/usAlert";
import { guardarUsuario } from "@/app/service/UserService";

const validationSchema = Yup.object().shape({
  nombres: Yup.string().required("El nombre es requerido"),
  apellidoPaterno: Yup.string().required("El apellido paterno es requerido"),
  apellidoMaterno: Yup.string(),
  apellidoCasada: Yup.string(),
  direccion: Yup.string(),
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
    .matches(/^(0|[1-9]\d*)(\.\d+)?$/, "Introducir un número válido"),
  correoElectronico: Yup.string()
    .email("Debe ser un correo electrónico válido")
    .required("El correo electrónico es requerido"),
  codRol: Yup.string()
    .notOneOf(["", "default", "Debe seleccionar una opción válida"])
    .required("Seleccionar una opción"),
});

type TFormUsuario = {
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
  correoElectronico: string;
  codRol: string;
};

const NewUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormUsuario>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues: {
      apellidoCasada: "",
      apellidoMaterno: "",
      apellidoPaterno: "",
      codEstadoCivil: "",
      codTipoIdentificacion: "",
      coordenadaX: null,
      coordenadaY: null,
      direccion: "",
      nombres: "",
      numeroContacto: "",
      numeroIdentificacion: "",
      codRol: "",
      correoElectronico: "",
    },
  });

  const { showAlert } = useAlert();

  const onSubmit: SubmitHandler<TFormUsuario> = async (data) => {
    let persona: IPersona = {
      apellidoCasada: data.apellidoCasada,
      apellidoMaterno: data.apellidoMaterno,
      apellidoPaterno: data.apellidoPaterno,
      codEstado: "",
      codEstadoCivil: data.codEstadoCivil,
      codTipoIdentificacion: data.codTipoIdentificacion,
      coordenadaX: data.coordenadaX,
      coordenadaY: data.coordenadaY,
      direccion: data.direccion,
      fecRegistro: "",
      idPersona: null,
      nombres: data.nombres,
      numeroContacto: data.numeroContacto,
      numeroIdentificacion: data.numeroIdentificacion,
    };

    let saveUser: IUserSingUp = {
      email: data.correoElectronico,
      password:
        data.nombres.charAt(0).toLocaleLowerCase() +
        data.apellidoPaterno.toLocaleLowerCase(),
      persona: persona,
      role: [formatNameRol(data.codRol)],
      username:
        data.nombres.charAt(0).toLocaleLowerCase() +
        data.apellidoPaterno.toLocaleLowerCase(),
    };

    try {
      const response = await guardarUsuario(saveUser);
      if (response.message === "User registered successfully!") {
        reset();
        showAlert("Success", "Registro guardado correctamente");
      }
    } catch (error) {
      console.log(error);
      showAlert("Error", "Error al guardar el registro");
    }
  };

  const [listTipoIdentificacion, setListTipoIdentificacion] = useState<
    IDominioFijo[]
  >([]);
  const [listEstadoCivil, setListEstadoCivil] = useState<IDominioFijo[]>([]);
  const [listRoles, setListRoles] = useState<IRol[]>([]);
  useEffect(() => {
    const get = async () => {
      try {
        setListTipoIdentificacion(await obtenerTipoIdentificacion());
        setListEstadoCivil(await obtenerEstadoCivil());
        setListRoles(await obtenerRoles());
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);

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
            placeholder="Introducir el nombre del usuario"
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

        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="correoElectronico"
              value="Correo Electrónico"
              className="dark:text-gray-600"
            />
          </div>
          <TextInput
            id="correoElectronico"
            type="text"
            placeholder="Introducir el correo electrónico"
            autoComplete="off"
            addon="@"
            {...register("correoElectronico")}
          />
          {errors.correoElectronico && (
            <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
              <HiXCircle size={20} />
              <p className="font-bold">Error: </p>
              <p className="font-normal">{errors.correoElectronico.message}</p>
            </div>
          )}
        </div>

        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="rol"
              value="Rol asignado"
              className="dark:text-gray-600"
            />
          </div>
          <Select id="codRol" {...register("codRol")}>
            <option value={"default"} selected>
              Seleccionar el rol asignado
            </option>
            {listRoles.map((item) => (
              <option value={item.idRol}>{formatRol(item.nombreRol)}</option>
            ))}
          </Select>
          {errors.codRol && (
            <div className="mt-2 bg-red-100 border-t-2 border-red-500 text-red-700 px-4 py-2 flex items-center space-x-1 dark:rounded-lg rounded-md">
              <HiXCircle size={20} />
              <p className="font-bold">Error: </p>
              <p className="font-normal">{errors.codRol.message}</p>
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
  );
};

export default NewUser;
